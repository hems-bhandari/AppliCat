import { DashboardNav } from '@/components/dashboard-nav'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'
{/* import { UserNav } from '@/components/layout/user-nav' */ }
import { navItems } from '@/constants/data'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Terms and Condition | Applicat",
    description: "Terms and Condition of Applicat",
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
}

export default layout
