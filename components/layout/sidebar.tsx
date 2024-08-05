"use client";

import { DashboardNav } from "@/components/dashboard-nav";
import {
    adminNavItems,
    applicantNavItems,
    consultantNavItems,
    defaultNavItems,
} from "@/constants/data";
import { cn } from "@/lib/utils";
import Signout from "../signout";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const userSession = useSession();
    const userType = userSession.data?.user?.userType;

    return (
        <nav
            className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72 `)}
        >
            <div className="space-y-4 py-4 ">
                <div className="p-3 py-5">
                    <div className="space-y-1 ">
                        {userSession.status === "authenticated"
                            && <DashboardNav
                                items={
                                    userType === "Applicant"
                                        ? applicantNavItems
                                        : userType === "Consultant"
                                            ? consultantNavItems
                                            : userType === "Admin"
                                                ? adminNavItems
                                                : applicantNavItems
                                }
                            />

                        }
                        <Signout />
                    </div>
                </div>
            </div>
        </nav>
    );
}
