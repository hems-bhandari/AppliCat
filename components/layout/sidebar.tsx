import { DashboardNav } from "@/components/dashboard-nav";
import {
  adminNavItems,
  applicantNavItems,
  consultantNavItems,
} from "@/constants/data";
import { roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Signout from "../signout";

export default function Sidebar({
  userType = "Applicant",
}: {
  userType?: "Applicant" | "Consultant" | "Admin";
}) {
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72 `)}
    >
      <div className="space-y-4 py-4 ">
        <div className="p-3 py-5">
          <div className="space-y-1 ">
            <DashboardNav
              items={
                userType === "Applicant"
                  ? applicantNavItems
                  : userType === "Consultant"
                  ? consultantNavItems
                  : adminNavItems
              }
            />
            <Signout />
          </div>
        </div>
      </div>
    </nav>
  );
}
