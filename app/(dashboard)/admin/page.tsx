"use client";

import { SessionHistory } from "@/components/SessionHistory";
import Greeting from "@/components/landing/Greeting";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <Greeting />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">

                    <Card className="col-span-4 md:col-span-3">
                        <CardHeader>
                            <CardTitle>Session History</CardTitle>
                            <CardDescription>You have 1 session this week.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SessionHistory />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    );
}
