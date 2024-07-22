import React from "react";
import Greeting from "@/components/landing/Greeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";
import { getSessionInfoForSideBar } from "@/lib/controllers/sessionController";

const SideInfoBar = ({ userSession }: { userSession: Session }) => {
  const userType = userSession?.user.userType as
    | "Applicant"
    | "Consultant"
    | "Admin";
  const userId = userSession?.user._id;

  return (
    <div className="flex-col items-center justify-between gap-10 min-w-[400px] px-4 md:pr-8 md:pl-0 pt-5">
      <Greeting />
      {(userType === "Applicant" || userType === "Consultant") && (
        <SessionsInfo userType={userType} userId={userId} />
      )}
      <Card className="col-span-4 md:col-span-3 mt-4">
        <CardHeader>
          <CardTitle>Admin Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Email</p>
            <h2 className="text-[16px] leading-[18px] font-[600]">
              {userType === "Applicant"
                ? "info@applicat.tech"
                : "operations@applicat.tech"}
            </h2>
          </div>
          {userType === "Consultant" && (
            <div className="flex items-center justify-between mt-1">
              <p className="text-muted-foreground">Phone number</p>
              <h2 className="text-[16px] leading-[18px] font-[600]">
                +977 9847059717
              </h2>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SessionsInfo = async ({
  userType,
  userId,
}: {
  userType: "Consultant" | "Applicant";
  userId: string;
}) => {
  const sessionData = await getSessionInfoForSideBar({ userId, userType });

  return (
    <>
      {userType === "Consultant" && (
        <Card className="col-span-4 md:col-span-3 mt-8">
          <CardHeader>
            <CardTitle>Total income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] leading-[28px] font-[600]">
                NPR {sessionData.totalIncome}
              </h2>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="col-span-4 md:col-span-3 mt-4">
        <CardHeader>
          <CardTitle>At a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Total sessions so far</p>
            <h2 className="text-[16px] leading-[18px] font-[600]">
              {sessionData.totalSessions}
            </h2>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SideInfoBar;
