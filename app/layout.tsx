import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
    title: "AppliCat",
    description: "Write applications the way they are ment to be written.",
    icons: [], // icons are yet to come
    keywords: [
        "Us application",
        "consulting",
        "application",
        "guidance",
        "Higher acceptance",
        "scholarship"
    ],
    openGraph: {
        title: "AppliCat",
        description: "Write applications the way they are ment to be written.",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
