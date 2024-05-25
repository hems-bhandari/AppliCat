"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Greeting = () => {
  const { data } = useSession();
  if (data) {
    const name =
      data?.user?.name?.split(" ")[0] ||
      (data?.user?.type === "Consultant"
        ? "Freshman"
        : data?.user?.type === "Applicant"
        ? "Applicant"
        : "Admin");

    return (
      <div className="text-center flex flex-col items-center w-full ">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src={data?.user?.image} alt="" />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="mt-3">
          <p className="text-[18px] font-bold tracking-[1px] mb-1">
            Welcome back,
          </p>
          <h2 className="text-[28px] leading-[28px] font-[600]">{name}</h2>
        </div>
      </div>
    );
  }
};

export default Greeting;
