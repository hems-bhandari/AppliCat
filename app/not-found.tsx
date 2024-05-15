"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute items-center justify-center mb-16 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 text-2xl font-bold font-heading">
        *Sad meow noises*
      </h2>
      <p>
        Sorry, the cat couldn&apos;t find page you are looking for :&#40;
      </p>
      <div className="flex justify-center gap-2 mt-8">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
