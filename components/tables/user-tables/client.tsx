import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
    TsessionWithSubDoc,
    getConsultingSessions
} from "@/lib/controllers/sessionController";
import { useEffect, useState } from "react";

interface ProductsClientProps {
    columns: any;
}

export const UserClient = ({ columns }: ProductsClientProps) => {
    const [consultingSessionData, setConsultingSessionData] = useState<TsessionWithSubDoc[]>([]);

    useEffect(() => {
        const loadSession = async () => {
            const user = await fetch(`/api/auth/session`).then(res => res.json()).then(userSession => userSession.user);
            if (!user) return;

            getConsultingSessions({
                userId: user._id,
                userType: user.userType as "Consultant" | "Applicant",
                delimeter: "all",
                date: new Date(),
            }).then((sessions) => {
                console.log(sessions);
                if (sessions.length > 0)
                    setConsultingSessionData(sessions);
            })
        }

        loadSession();
    }, [])

    console.log(columns)

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
