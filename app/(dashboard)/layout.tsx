"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

const DashboardLayouts = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header />
                <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <main className="w-full pt-16">{children}</main>
                </div>
            </QueryClientProvider>
        </>
    )
}

export default DashboardLayouts;
