"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import Cat from "../public/cat_thumbs_up.png";

const BookingConfirmation = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <Image
        src={Cat}
        alt="Booking Confirmation"
        className="w-full h-auto object-contain mx-auto max-w-[500px]"
      />
      <Confetti
        className="w-full h-full"
        confettiSource={{
          x: width ? width * 0.69 : window.innerWidth * 0.75,
          y: height ? height * 0.15 : window.innerHeight / 2,
          w: 30,
          h: 20,
        }}
        recycle={true}
        numberOfPieces={300}
        width={width}
        height={height}
        gravity={0.2}
      />
    </div>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default BookingConfirmation;
