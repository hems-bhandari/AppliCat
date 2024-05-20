import { SessionHistory } from "@/components/SessionHistory";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function page() {
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, Applicant! Welcome back 👋
                    </h2>
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
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4 mt-10">
                        <h4 className="font-bold ">Suggested Sessions for You : </h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        ECs Building Session by
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Dinesh Bhandari</div>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg"
                                        alt="avatar"
                                        width={250}
                                        height={250}
                                        className="p-6"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        <b>Class of 2028</b>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Essay Writing Session by
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Sarwesh Parajuli</div>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/482px-MIT_logo.svg.png"
                                        alt="avatar"
                                        width={500}
                                        height={500}
                                        className="p-6"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        <b>Class of 2028</b>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="aashish">

            </div>
        </ScrollArea>
    );
}
