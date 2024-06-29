"use client";

import { useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { sessions, studentInformation } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { User, StudentInformation } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import { useSession } from "next-auth/react";

const breadcrumbItems = [{ title: "Sessions", link: "/consultant/sessions" }];

export default function page() {
    const [open, setOpen] = useState(false);

    const userSession = useSession();
    const user = userSession?.data?.user;

    if (!user || !["Consultant", "Applicant"].includes(user.userType))
        return;


    const handleMoreInfoClick = (id: string) => {
        setOpen(true);
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "NAME",
        },
        {
            accessorKey: "SessionType",
            header: "SESSION TYPE",
        },
        {
            accessorKey: "school",
            header: "SCHOOL",
        },
        {
            accessorKey: "status",
            header: "STATUS",
        },
        {
            accessorKey: "time",
            header: "TIME",
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    onClick={() => handleMoreInfoClick(row.original.id.toString())}
                >
                    <Info className="h-4 w-4" />
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserClient user={{ id: user._id, type: user.userType as "Consultant" | "Applicant", }} columns={columns} />
                <DialogBox data={studentInformation} open={open} setOpen={setOpen} />
            </div>
        </>
    );
}

const DialogBox = ({
    data,
    open,
    setOpen,
}: {
    data: StudentInformation;
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Student Information</DialogTitle>
                    <DialogDescription>
                        Here's the information about the student you are consulting.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="mx-auto">
                        <Image
                            src={data.image}
                            alt="Student Image"
                            width={100}
                            height={100}
                            className="object-cover rounded-full w-[150px] h-[150px]"
                        />
                    </div>
                    {Object.entries(data).map(
                        ([key, value]) =>
                            key !== "image" && (
                                <div key={key} className="flex text-[16px]">
                                    <span className="font-bold capitalize">{key}:</span> &nbsp;
                                    <p>{value}</p>
                                </div>
                            )
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
