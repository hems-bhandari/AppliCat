"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SideInfoBar from "@/components/SideInfoBar";
import DashboardCurrentTime from "@/components/DashboardCurrentTime";
import { PastSessions, UpcomingSessions } from "@/components/sessions/PreviousSession";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ApplicantPage() {
    const userSession = useSession()

    if (userSession.status === "unauthenticated") redirect("/auth")
    return (
        <ScrollArea className="h-full">
            <div className="flex w-full py-8 flex-wrap flex-col-reverse md:flex-row">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <DashboardCurrentTime />

                    {/* <UpcomingSessions {...userData} /> */}
                    {/* <PastSessions {...userData} /> */}
                </div>

                <SideInfoBar />
            </div>
        </ScrollArea>
    );
}
