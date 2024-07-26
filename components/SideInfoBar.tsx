import React from "react";
import Greeting from "@/components/landing/Greeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import SessionsInfoCard from "./SessionInfoCard";

const SideInfoBar = () => {
    const userSession = useSession();

    const userType = userSession.data?.user?.userType;
    const userId = userSession.data?.user?._id;

    return (
        <div className="flex-col items-center justify-between gap-10 min-w-[400px] px-4 md:pr-8 md:pl-0 pt-5">
            <Greeting />
            {
                userSession.status !== "loading" && userId
                    ? <SessionsInfoCard userType={userType as "Consultant" | "Applicant"} userId={userId} />
                    : <> loading session data </>
            }
            <Card className="col-span-4 md:col-span-3 mt-4">
                <CardHeader>
                    <CardTitle>Admin Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">Email</p>
                        <h2 className="text-[16px] leading-[18px] font-[600]">
                            {
                                (userSession.status !== "loading" && userType === "Consultant")
                                    ? "operations@applicat.tech"
                                    : "info@applicat.tech"
                            }
                        </h2>
                    </div>
                    {(userSession.status !== "loading" && userSession.data?.user?.userType === "consultant") &&
                        < div className="flex items-center justify-between mt-1">
                            <p className="text-muted-foreground">Phone number</p>
                            <h2 className="text-[16px] leading-[18px] font-[600]">
                                +977 9847059717
                            </h2>
                        </div>
                    }
                </CardContent>
            </Card>
        </div >
    );
};

export default SideInfoBar;
