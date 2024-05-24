"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { adminNavItems, applicantNavItems, consultantNavItems } from "@/constants/data";
import { roboto } from "@/lib/fonts";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Signout from "../signout";

export function MobileSidebar({
    userType = "Applicant"
}: {
    userType?: "Applicant" | "Consultant" | "Admin";
}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                <h2 className={` mb-2 text-sm font-bold  ${roboto.className}`}>
                                    Nav Links
                                </h2>
                                <DashboardNav
                                    items={
                                        userType === "Applicant"
                                            ? applicantNavItems
                                            : userType === "Consultant"
                                                ? consultantNavItems
                                                : adminNavItems
                                    }
                                    setOpen={setOpen} />
                                <Signout />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
