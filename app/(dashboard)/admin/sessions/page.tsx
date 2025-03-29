"use client"

import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";

const AdminSessionPage = () => {
    type TableHeader = {
        checkbox: boolean,
        consultantName: string,
        sessionTitle: string,
        applicantName: string,
        sessionRate: string,
        sessionTime: string,
        sessionDate: string,
        status: "pending" | "confirmed" | "progress",
    }

    const column: ColumnDef<TableHeader>[] = [{
        accessorKey: "checkbox",
        cell: () => {
            return <Checkbox />
        }
    },
    {
        accessorKey: "sessionTitle",
        header: "Session"
    },
    {
        accessorKey: "consultantName",
        header: "Session By",
    },
    {
        accessorKey: "applicantName",
        header: "Applicant",
    },
    {
        accessorKey: "sessionRate",
        header: "Session Charge",
    },
    {
        accessorKey: "sessionTime",
        header: "Time"
    },
    {
        accessorKey: "sessionDate",
        header: "Date"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    ]


    return <div>
        <DataTable
            searchKey="sessionTitle"
            className={
                {
                    scrollArea: "mt-5",
                    search: "w-full md:max-w-none"
                }
            }
            columns={column}
            data={[
                {
                    checkbox: true,
                    consultantName: "test",
                    applicantName: "Testing ",
                    sessionDate: "bholi",
                    sessionTime: "10pm",
                    sessionRate: "10 khoka",
                    sessionTitle: "why should I say?",
                    status: "pending"
                }
            ]} />

    </div>;
}

export default AdminSessionPage;
