'use client';

import { katibeh } from "@/lib/fonts";
import Image from "next/image";
import { useEffect } from "react";

const TeamCard = ({ url, name, designation }: { url: string; name: string; designation: string }) => {
    return <div className="flex flex-col justify-center items-center min-w-[calc(33.33%-(1rem))]">
        <div className="w-full h-auto">
            <Image
                src="/nav_logo.svg"
                alt="logo"
                width={200}
                height={200}
                className="cursor-pointer w-full h-full aspect-square object-cover"
            />
        </div>
        <h2 className="text-white text-xl font-bold mt-4  text-center">{name}</h2>
        <p className="text-white text-md text-center">
            {designation}
        </p>
    </div >
}

const Drawer = ({ open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    useEffect(() => {
        if (open)
            document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");

        () => document.body.classList.remove("overflow-hidden");
    }, [open])
    return (
        <div className={`h-screen w-screen overflow-x-hidden fixed top-0 left-0  z-50 ${open ? " bg-[#2d2d2d] bg-opacity-20 backdrop-filter backdrop-blur-lg" : " bg-transparent pointer-events-none"}`} onClick={() => setOpen(false)} >
            <aside className={`transition-transform ease-in-out ${open ? "translate-x-0" : "translate-x-full"} w-[min(100%,900px)] bg-black  min-h-screen ml-auto p-12 flex flex-col gap-8`} >
                <div className="flex flex-col">
                    <h2 style={katibeh.style} className={`${katibeh.className} text-6xl text-red-600  `}>
                        Who are we?
                    </h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard</p>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard</p>
                </div>

                <div className="flex flex-col">
                    <h2 style={katibeh.style} className={`${katibeh.className} text-6xl text-red-600 `}>
                        Our Team
                    </h2>
                    <div className="flex flex-row flex-wrap w-full flex-grow-1 items-center gap-4 flex-0 *: *:flex *:flex-col *:justify-center *:items-center  [&>img]:aspect-square  [&>div>div]:bg-red-600 [&>div>div]:rounded-md">
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                        <TeamCard name="Sanskar Lamsal" designation="NOONE" url="" />
                    </div>
                </div>
            </aside>

        </div >
    )
}

export default Drawer
