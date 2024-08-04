"use client";

import { getConsultingSessions, getSessionsProps } from "@/lib/controllers/sessionController";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SessionHistory, SessionHistorySkeleton } from "../SessionHistory";
import { useQuery } from "@tanstack/react-query";

export const BaseSession = (props: Pick<getSessionsProps, "delimeter">) => {
    const { data, isLoading } = useQuery({
        queryKey: ["sessions"],
        queryFn: async () => {
            const data = await getConsultingSessions({
                delimeter: props.delimeter,
                date: new Date(),
            });

            return data
        }
    })

    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle className="capitalize">{props.delimeter} Sessions</CardTitle>
                {isLoading
                    ? <CardDescription>
                        We are getting your {props.delimeter} Sessions
                    </CardDescription>
                    : <CardDescription>
                        You have {data?.length} past sessions coming up
                    </CardDescription>
                }
            </CardHeader>
            <CardContent>
                {isLoading
                    ? <SessionHistorySkeleton />
                    : data && <SessionHistory sessions={data.splice(0, 4)} />
                }
            </CardContent>
        </Card>
    )
};

