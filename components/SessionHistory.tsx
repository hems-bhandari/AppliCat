"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TsessionWithSubDoc } from "@/lib/controllers/sessionController";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { format } from "date-fns/esm";
import { Skeleton } from "./ui/skeleton";

function SessionHistory({ sessions }: { sessions: TsessionWithSubDoc[] }) {
    console.log(sessions);
    return (
        <div className="space-y-8">
            {sessions?.map((session, index) => {
                return (
                    <SessionCard session={session} key={`session-${index}-${randomUUID()}`} />
                )
            }
            )}
        </div>
    );
}

const SessionCard = ({ session }: { session: TsessionWithSubDoc }) => {
    return (
        <div className="flex items-center">
            <Avatar className="h-9 w-9">
                <AvatarImage src={session.consultant.image} alt="Avatar" />
                <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{session.consultant.name}</p>
                <p className="text-sm text-muted-foreground">
                    {session.sessionTitle}
                </p>
            </div>
            {/* 
            I know this sucks,
                    but had fun writing this it's funny it works perfectly but may open some security risks.
                */}
            <div className="ml-auto font-medium text-center"
                dangerouslySetInnerHTML={{
                    __html: format(add(session.date, {
                        hours: parseInt(session.time.split(":")[0]),
                        minutes: parseInt(session.time.split(":")[1])
                    }),
                        "do MMMM yyyy 'at' h:mm a"
                    ).split("at")
                        .reverse()
                        .join("<br />")
                }}>
            </div>
        </div>
    );
};

function SessionHistorySkeleton() {
    return (
        <div className="space-y-8">
            {Array(2).fill("*")?.map((_, index) => {
                return (
                    <SessionCardSkeleton key={`session-${index}-${new Date().toISOString()}`} />
                )
            })}
        </div>
    );
}

const SessionCardSkeleton = () => {
    return (
        <div className="flex items-center w-full">
            <Avatar className="h-9 w-9">
                <Skeleton className="h-9 w-9 rounded-full" />
            </Avatar>
            <div className="ml-4 space-y-1  ">
                <Skeleton className="h-4 w-52 " />
                <Skeleton className="h-4 w-64 " />
            </div>
            <div className="ml-auto font-medium text-center space-y-1 flex flex-col items-center">
                <Skeleton className="h-4 w-10 " />
                <Skeleton className="h-4 w-20 " />
            </div>
        </div >
    );
};



export {
    SessionHistory,
    SessionHistorySkeleton,
}
