'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// font
import { roboto } from "@/lib/fonts";

// icon
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import LoginIfNoSession from "./LoginIfNoSession";
import Drawer from "./Drawer";

const NAV_LINKS = [
    // { name: "About", href: "#about" },
    { name: "Contact", href: "/contact" },
];

const LandingNav = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Drawer open={open} setOpen={setOpen} />
            <nav className="text-white flex items-center w-full h-[125px] justify-between gap-2 px-[5%] mx-auto 2xl:w-[1400px]  ">
                <Link href="/" className="logo">
                    <Image
                        src="/nav_logo.svg"
                        alt="logo"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                    />
                </Link>

                <div className="flex space-x-8 items-center">
                    <ul className="navLinks flex gap-4">

                        <li>
                            <Link
                                href=""
                                onClick={() => setOpen(true)}
                                className={`text-md text-white ${roboto.className}`}
                            >
                                About
                            </Link>
                        </li>
                        {NAV_LINKS.map(({ name, href }) => (
                            <li key={name}>
                                <Link
                                    href={href}
                                    className={`text-md text-white ${roboto.className}`}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <LoginIfNoSession />
                </div>
            </nav>
        </>
    );
};

export default LandingNav;
