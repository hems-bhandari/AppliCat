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
import { TsessionWithSubDoc } from "@/lib/controllers/sessionController";

const breadcrumbItems = [{ title: "Sessions", link: "/consultant/sessions" }];

export default function page() {
    const [open, setOpen] = useState(false);
    const [activeConsultantInfo, setActiveConsultantInfo] = useState();

    const columns: ColumnDef<TsessionWithSubDoc>[] = [
        {
            accessorKey: "applicant.name",
            header: "Applicant Name",
        },
        {
            accessorKey: "sessionTitle",
            header: "SESSION TYPE",
        },
        {
            accessorKey: "applicant.highSchool",
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
                    onClick={() => {
                        setOpen(true);
                        setActiveConsultantInfo(row.original.applicant);
                    }}
                >
                    <Info className="h-4 w-4" />
                </Button >
            ),
        },
    ];

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserClient columns={columns} />

                {activeConsultantInfo &&
                    <DialogBox
                        data={activeConsultantInfo}
                        open={open}
                        setOpen={setOpen}
                    />
                }
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
                            !["image", "_id", "__v"].includes(key) && value && (
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
