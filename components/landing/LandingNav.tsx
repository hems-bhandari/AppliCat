import Image from "next/image";
import Link from "next/link";
import React from "react";

// font
import { roboto } from "@/lib/fonts";

// icon
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const LandingNav = () => {
  return (
    <nav className="text-white flex items-center w-full h-[125px] justify-between gap-2 px-10 ">
      <Link href="/" className="logo">
        <Image
          src="/nav_logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex space-x-6 items-center">
        <ul className="navLinks flex space-x-6">
          {NAV_LINKS.map(({ name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className={`text-[18px] text-white ${roboto.className}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <button className={`bg-transparent text-[18px] font-[500] uppercase border border-1 border-white py-2 px-6 text-white ${roboto.className} flex space-x-2 items-center`}>
          Login <ArrowTopRightIcon className="w-[26px] h-[26px] font-bold" />
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;
