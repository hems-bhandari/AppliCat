"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
