import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
    TsessionWithSubDoc,
    getConsultingSessions
} from "@/lib/controllers/sessionController";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProductsClientProps {
    columns: any;
}

export const UserClient = ({ columns }: ProductsClientProps) => {
    const [consultingSessionData, setConsultingSessionData] = useState<TsessionWithSubDoc[]>([]);
    const userSession = useSession();

    useEffect(() => {
        const user = userSession.data?.user;
        if (!user?._id || !user.userType) return;

        getConsultingSessions({
            delimeter: "all",
            date: new Date(),
        }).then((sessions) => {
            if (sessions.length > 0)
                setConsultingSessionData(sessions);
        })
    }, [userSession]);

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Session History`}
                    description={`Here's a list of all the sessions you have given. ${consultingSessionData.length} sessions so far!`}
                />
            </div>
            <Separator />

            <DataTable searchKey="applicant_name" columns={columns} data={consultingSessionData} />
        </>
    );
};
