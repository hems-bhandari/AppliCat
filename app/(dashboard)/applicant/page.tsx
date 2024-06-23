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
import { getConsultingSessions, getSessionInfoForSideBar } from "@/lib/controllers/sessionController";

// next auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function page() {
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

const PastSessions = async ({ userId, userType }: { userId: string, userType: "Applicant" | "Consultant" }) => {
    const pastSessions = await getConsultingSessions({
        userId,
        userType,
        delimeter: "previous",
        date: new Date()
    });


    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>Upcomming Sessions</CardTitle>
                <CardDescription>
                    You have {pastSessions.length} sessions coming up
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SessionHistory sessions={pastSessions.splice(0, 4)} />
            </CardContent>
        </Card>
    )
};

const UpcomingSessions = async ({ userId, userType }: { userId: string, userType: "Applicant" | "Consultant" }) => {
    const upcomingSessions = await getConsultingSessions({
        userId,
        userType,
        delimeter: "upcoming",
        date: new Date()
    });

    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
                <CardDescription>
                    You had {upcomingSessions.length} sessions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SessionHistory sessions={upcomingSessions.splice(0, 4)} />
            </CardContent>
        </Card>

    )
}
