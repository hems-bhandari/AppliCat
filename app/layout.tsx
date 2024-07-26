import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";

import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "AppliCat",
    description: "Get purrsonalized guidance with AppliCat",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    // TODO: Research on this piece of code and why and who wrote this.
    // is this the reason all of our code is server rendered on demand.
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <Providers session={session}>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
