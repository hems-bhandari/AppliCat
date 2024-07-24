import { getConsultingSessions } from "@/lib/controllers/sessionController";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SessionHistory } from "../SessionHistory";

export const PastSessions = async ({ userId, userType }: { userId: string, userType: "Applicant" | "Consultant" }) => {
    const pastSessions = await getConsultingSessions({
        userId,
        userType,
        delimeter: "previous",
        date: new Date()
    });


    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
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

export const UpcomingSessions = async ({ userId, userType }: { userId: string, userType: "Applicant" | "Consultant" }) => {
    const upcomingSessions = await getConsultingSessions({
        userId,
        userType,
        delimeter: "upcoming",
        date: new Date()
    });

    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>Upcomming Sessions</CardTitle>
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
