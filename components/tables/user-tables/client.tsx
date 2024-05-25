"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/constants/data";
import { useRouter } from "next/navigation";
// import { columns } from "./columns";

interface ProductsClientProps {
  data: Session[];
  columns: any;
}

export const UserClient: React.FC<ProductsClientProps> = ({
  data,
  columns,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Session History`}
          description={`Here's a list of all the sessions you have given. ${data.length} sessions so far!`}
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
