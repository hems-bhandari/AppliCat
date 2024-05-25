"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DashboardCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-xl border overflow-hidden relative">
      <Image
        src="/mit_dome.jpeg"
        alt="mit dome"
        width={1200}
        height={300}
        className="object-cover w-full h-full absolute z-[-1] top-0 left-0"
      />
      <div className="absolute z-[-1] bg-[#0008] w-full h-full top-0 left-0"></div>

      <div className="p-5">
        <h1 className="text-[36px] text-center text-white font-[600]">
          {currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </h1>
        <h1 className="text-[18px] text-center text-white">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
      </div>
    </div>
  );
};

export default DashboardCurrentTime;
