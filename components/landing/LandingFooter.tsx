import Link from "next/link"
import Image from "next/image";
import { katibeh } from "@/lib/fonts";

const LandingFooter = () => {
    return (
        <footer className=" w-full px-[5%] pt-12 pb-8 2xl:px-[calc((100%-1400px)/2)] ">
            <div className="flex flex-col md:!flex-row items-start justify-between gap-8">
                <div className="companyInfo flex flex-row items-start justify-start gap-4 ">
                    <Link href="/" className="logo">
                        <Image
                            src="/nav_logo.svg"
                            alt="logo"
                            width={125}
                            height={125}

                            className="cursor-pointer min-w-14 h-24 w-auto object-contain"
                        />
                    </Link>
                    <div className="max-w-[300px] flex flex-col justify-between">
                        <h2 style={katibeh.style} className={`${katibeh.className} text-5xl text-white leading-none`}>Applicat</h2>
                        <p className="text-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                    </div>
                </div>
                <div className="flex flex-row  max-md:gap-8 max-md:w-full max-md:justify-between gap-24 max-md:flex-wrap">
                    <div className="navlinks flex flex-col  gap-2 ">
                        <h4 style={katibeh.style} className={`${katibeh.className} text-3xl text-white -mt-2 `}>Nav Links</h4>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                    </div>
                    <div className="services flex flex-col gap-2 ">
                        <h4 style={katibeh.style} className={`${katibeh.className} text-3xl text-white -mt-2 `}>Sevices</h4>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                        <Link href="" >Link</Link>
                    </div>
                </div>
            </div>
            <hr className="border-[#B2B2B2] my-6" />
            <div className="flex flex-row mx-auto text-white items-center justify-center gap-2">
                <Link href="/terms_of_service" className="underline">Terms of Service</Link>
                <div className="circle h-2 w-2  rounded-full bg-white"></div>
                <Link href="/privacy_policy" className="underline">Privacy Policy</Link>
            </div>

        </footer >
    )
}

export default LandingFooter
