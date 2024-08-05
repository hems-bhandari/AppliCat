"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SideInfoBar from "@/components/SideInfoBar";
import DashboardCurrentTime from "@/components/DashboardCurrentTime";
import { PastSessions, UpcommingSession } from "@/components/sessions/";

export default function ApplicantPage() {
    return (
        <ScrollArea className="h-full">
            <div className="flex w-full py-8 flex-wrap flex-col-reverse md:flex-row">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <DashboardCurrentTime />

                    <UpcommingSession />
                    <PastSessions />
                </div>
                <SideInfoBar />
            </div>
        </ScrollArea>
    );
}
