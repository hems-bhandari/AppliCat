import React from "react";
import Greeting from "@/components/landing/Greeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SideInfoBar = ({
  type = "applicant",
  totalSessions,
  totalIncome,
  perSessionCharge,
}: {
  type?: "applicant" | "consultant" | "admin";
  totalSessions?: number;
  totalIncome?: string;
  perSessionCharge?: string;
}) => {
  return (
    <div className="flex-col items-center justify-between gap-10 min-w-[400px] px-4 md:pr-8 md:pl-0 pt-5">
      <Greeting />

      <div className="mt-4">
        {type !== "applicant" && (
          <Card className="col-span-4 md:col-span-3 mt-4">
            <CardHeader>
              <CardTitle>Total income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] leading-[28px] font-[600]">
                  {totalIncome}
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
                {totalSessions || 0}
              </h2>
            </div>
            {type === "consultant" && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-muted-foreground">Per session charge</p>
                <h2 className="text-[16px] leading-[18px] font-[600]">
                  {perSessionCharge}
                </h2>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-4 md:col-span-3 mt-4">
          <CardHeader>
            <CardTitle>Admin Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Email</p>
              <h2 className="text-[16px] leading-[18px] font-[600]">
                {type === "applicant"
                  ? "info@applicat.tech"
                  : "operations@applicat.tech"}
              </h2>
            </div>
            {type === "consultant" && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-muted-foreground">Phone number</p>
                <h2 className="text-[16px] leading-[18px] font-[600]">
                  +977 9812345678
                </h2>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SideInfoBar;
