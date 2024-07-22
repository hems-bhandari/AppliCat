"use client";

import { katibeh } from "@/lib/fonts";
import Image from "next/image";
import { useEffect } from "react";
import { Icons } from "../icons";

const TeamCard = ({
    url,
    name,
    designation,
}: {
    url: string;
    name: string;
    designation: string;
}) => {
    return (
        <div className="flex flex-col justify-center items-center w-[calc(33.33%-(1rem))] max-md:w-[calc(50%-1rem)]">
            <div className="w-full h-auto rounded-md overflow-clip">
                <Image
                    src={url ?? "/nav_logo.svg"}
                    alt="logo"
                    width={200}
                    height={200}
                    className="cursor-pointer w-full h-full aspect-square object-cover"
                />
            </div>
            <h2 className="text-white text-xl max-md:text-lg font-black mt-4  text-center">{name}</h2>
            <p className="text-white text-md max-md:text-sm text-center">{designation}</p>
        </div>
    );
};

const Drawer = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    useEffect(() => {
        if (open) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");

        () => document.body.classList.remove("overflow-hidden");
    }, [open]);
    return (
        <div
            className={`h-screen w-screen overflow-x-hidden fixed top-0 left-0  z-50 ${open
                ? " bg-[#2d2d2d] bg-opacity-20 backdrop-filter backdrop-blur-lg"
                : " bg-transparent pointer-events-none"
                }`}
            onClick={() => setOpen(false)}
        >

            <aside
                onClick={(e) => e.stopPropagation()}
                className={`transition-transform ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                    } w-[min(100%,900px)] bg-black  min-h-screen ml-auto p-12 flex flex-col gap-8`}
            >
                <div className="absolute top-8 right-8 p-4 bg-white/40 rounded-lg md:hidden"> <Icons.close onClick={() => setOpen(false)} className="w-8 h-8 text-white cursor-pointer" /></div>
                <div className="flex flex-col">
                    <h2
                        style={katibeh.style}
                        className={`${katibeh.className} text-left text-5xl text-red-600  `}
                    >
                        Who are we?
                    </h2>
                    <p className="text-left">
                        AppliCat is a team of passionate international college students who
                        know the ins and outs of the US college application process. We
                        understand the challanges, the excitement and the pressure that
                        comes with this journey, and we&apos;re here to help. Armed with
                        expert guidance and experiences, we&apos;ll make your application
                        process hassle-free and get you prepared for your college
                        experience.
                    </p>
                </div>

                <div className="flex flex-col">
                    <h2
                        style={katibeh.style}
                        className={`${katibeh.className} text-left text-5xl text-red-600 `}
                    >
                        Our Team
                    </h2>
                    <div className="flex flex-row flex-wrap w-full flex-grow-1 items-start gap-4 flex-0 *: *:flex *:flex-col *:justify-center *:items-center  [&>img]:aspect-square  [&>div>div]:bg-red-600 [&>div>div]:rounded-md">
                        <TeamCard
                            name="Hemanta Bhandari"
                            designation="Co-Founder & CEO"
                            url="/team/hemz.png"
                        />
                        <TeamCard
                            name="Saroj Regmi"
                            designation="Co-Founder & CTO"
                            url="/team/saroj.png"
                        />
                        <TeamCard
                            name="Sanskar Lamsal"
                            designation="Branding & Design Head"
                            url="/team/Sanskar.png"
                        />
                        <TeamCard
                            name="Ashish Panthi"
                            designation="Backend Developer"
                            url="/team/aasish.png"
                        />
                        <TeamCard name="Shreejay Subedi" designation="Developer" url="/team/shreejay.png" />
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Drawer;
