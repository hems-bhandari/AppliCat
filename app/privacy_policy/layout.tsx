import Header from '@/components/layout/header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy of Applicat",
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
}

export default layout

