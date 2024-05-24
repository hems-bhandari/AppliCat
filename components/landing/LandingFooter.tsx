import Link from "next/link"
import Image from "next/image";
import { katibeh } from "@/lib/fonts";

const LandingFooter = () => {
  return (
    <footer className=" w-full px-[5%] pt-24 pb-8 2xl:px-[calc((100%-1400px)/2)] ">
      <div className="flex flex-row items-center justify-between ">
        <div className="companyInfo flex flex-row items-center justify-center gap-8 ">
          <Link href="/" className="logo">
            <Image
              src="/nav_logo.svg"
              alt="logo"
              width={125}
              height={125}
              className="cursor-pointer"
            />
          </Link>
          <div className="max-w-[300px] flex flex-col justify-between">
            <h2 className={`${katibeh.className} text-[64px] text-white `}>Applicat</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
          </div>
        </div>
        <div className="flex flex-row gap-32">
          <div className="navlinks flex flex-col gap-2 ">
            <h4 className={`${katibeh.className} text-3xl text-white -mt-2 `}>Nav Links</h4>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
          </div>
          <div className="services flex flex-col gap-2 ">
            <h4 className={`${katibeh.className} text-3xl text-white -mt-2 `}>Sevices</h4>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
            <Link href="" >Link</Link>
          </div>
        </div>
      </div>
      <hr className="border-[#B2B2B2] my-6" />
      <div className="flex flex-row mx-auto text-white items-center justify-center gap-2">
        <Link href="" className="underline">Terms and Conditions</Link>
        <div className="circle h-2 w-2  rounded-full bg-white"></div>
        <Link href="" className="underline">Privacy Policy</Link>
      </div>

    </footer >
  )
}

export default LandingFooter
