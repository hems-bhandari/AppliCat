import LandingNav from "@/components/landing/LandingNav";
import { katibeh, roboto } from "@/lib/fonts";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
{
  /* import { katibeh } from "@/lib/fonts"; */
}
import React from "react";

const Landing = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      <LandingNav />

      <section className="text-center min-h-[calc(100vh-125px)] flex items-center justify-center px-4">
        <div className="max-w-[820px] mx-auto">
          <h1 className={`${katibeh.className} text-[160px] text-white my-5`}>
            Applicat
          </h1>
          <p
            className={`text-[24px] font-[400] text-[#e4e4e4] mt-3 ${roboto.className}`}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard
          </p>

          <Link
            href="/auth"
            className={`bg-gradient-to-r from-[#F4442A] to-[#F1314A] text-[28px] font-[500] uppercase rounded-[8px] flex items-center justify-center space-x-2 mx-auto mt-5 w-[260px] h-[55px] py-2 px-6 text-white ${roboto.className}`}
          >
            <span>Some CTA</span>
            <ArrowTopRightIcon className="w-[36px] h-[36px] font-bold" />
          </Link>
        </div>
      </section>

      <section className="w-full h-auto relative">
        <Image
          src="/landing_big_cat.svg"
          alt="big cat"
          width={1920}
          height={1080}
          className=" w-full h-full object-contain object-center z-0"
        />

      </section>
    </div>
  );
};

export default Landing;
