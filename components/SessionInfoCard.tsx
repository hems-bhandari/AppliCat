"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionInfoForSideBar } from "@/lib/controllers/sessionController";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const SessionsInfoCard = () => {
    const { isLoading, data } = useQuery(
        {
            queryKey: ['sessionData'],
            queryFn:
                async () => await getSessionInfoForSideBar()
        }
    );

    return (
        <>
            {
                isLoading
                    ? <CardSkeleton />
                    : data?.totalIncome
                    && (
                        <Card className="col-span-4 md:col-span-3 mt-8">
                            <CardHeader>
                                <CardTitle>Total income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[24px] leading-[28px] font-[600]">
                                        NPR {data?.totalIncome}
                                    </h2>
                                </div>
                            </CardContent>
                        </Card>
                    )
            }

            {
                isLoading
                    ? <CardSkeleton />
                    : (
                        <Card className="col-span-4 md:col-span-3 mt-4">
                            <CardHeader>
                                <CardTitle>At a glance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground">Total sessions so far</p>
                                    <h2 className="text-[16px] leading-[18px] font-[600]">
                                        {data?.totalSessions}
                                    </h2>
                                </div>
                            </CardContent>
                        </Card>
                    )
            }
        </>
    );
};

const CardSkeleton = () => {
    return (
        <>
            <Card className="col-span-4 md:col-span-3 mt-8">
                <CardHeader>
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        </>
    );

}

export default SessionsInfoCard;

