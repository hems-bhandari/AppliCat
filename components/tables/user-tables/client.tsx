import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getConsultingSessions } from "@/lib/controllers/sessionController";

interface ProductsClientProps {
    columns: any;
    user: {
        id: string,
        type: "Consultant" | "Applicant",
    }
}

export const UserClient = async ({ user, columns }: ProductsClientProps) => {
    const consultingSessions = await getConsultingSessions({
        userId: user.id,
        userType: user.type,
        delimeter: "all",
        date: new Date(),
    });

    if (consultingSessions.length < 0)
        return (
            <div className="flex items-start justify-between">
                No sessions available yet.
            </div>
        )

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Session History`}
                    description={`Here's a list of all the sessions you have given. ${consultingSessions.length} sessions so far!`}
                />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={consultingSessions} />
        </>
    );
};
