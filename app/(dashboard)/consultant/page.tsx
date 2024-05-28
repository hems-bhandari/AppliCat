import { SessionHistory } from "@/components/SessionHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideInfoBar from "@/components/SideInfoBar";
import DashboardCurrentTime from "@/components/DashboardCurrentTime";

import { sessions } from "@/constants/data";
// Saroj please get data from backend, I won't filter the data by date
// you do that in the backend, we have to use less bandwidth
// and please sort it in ascending order -> recent session first

export default function page() {
  const PAST_SESSIONS = [...sessions];
  const UPCOMMING_SESSIONS = [...sessions];

  const sideBarInfo = {
    totalIncome: "NPR 10,200",
    totalSessions: 10,
    perSessionCharge: "NPR 999",
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex w-full py-8 flex-wrap flex-col-reverse md:flex-row">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <DashboardCurrentTime />

          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Upcomming Sessions</CardTitle>
              <CardDescription>
                You have {PAST_SESSIONS.length} sessions coming up
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionHistory sessions={PAST_SESSIONS.splice(0, 4)} />
            </CardContent>
          </Card>

          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>
                You had {UPCOMMING_SESSIONS.length} sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionHistory sessions={UPCOMMING_SESSIONS.splice(0, 4)} />
            </CardContent>
          </Card>
        </div>

        <SideInfoBar type="applicant" {...sideBarInfo} />
      </div>
    </ScrollArea>
  );
}
