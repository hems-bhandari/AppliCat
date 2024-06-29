import { SessionHistory } from "@/components/SessionHistory";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideInfoBar from "@/components/SideInfoBar";
import DashboardCurrentTime from "@/components/DashboardCurrentTime";

import { sessions } from "@/constants/data";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { getConsultingSessions } from "@/lib/controllers/sessionController";
import { PastSessions, UpcomingSessions } from "@/components/sessions/PreviousSession";


export default async function page() {
    const PAST_SESSIONS = [...sessions];
    const UPCOMMING_SESSIONS = [...sessions];

    const userSession = await getServerSession(authOptions);

    if (!userSession?.user)
        return;

    const userData = {
        userType: userSession.user.userType as "Applicant" | "Consultant",
        userId: userSession.user._id,
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex w-full py-8 flex-wrap flex-col-reverse md:flex-row">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <DashboardCurrentTime />

                    <PastSessions {...userData} />
                    <UpcomingSessions {...userData} />
                </div>

                <SideInfoBar userSession={userSession} />
            </div>
        </ScrollArea>
    );
}
