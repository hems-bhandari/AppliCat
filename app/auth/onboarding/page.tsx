"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";

// fonts
import { katibeh, roboto } from "@/lib/fonts";
import { signIn, useSession } from "next-auth/react";

const MyComponent = () => {
  const [error, setError] = useState<string>();
  const [autofill, setAutoFill] = useState<
    { userName: string; email: string } | false
  >(false);

  const session = useSession();

  // database function
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData) {
      setError("Please fill in all  fields.");
      return;
    }
    const email = session.data?.user?.email || "";
    const image = session.data?.user?.image || "";

    const userName = formData.get("userName") as string;
    const phonenumber = formData.get("phonenumber") as string;
    const highschool = formData.get("highschool") as string;
    const education = formData.get("education") as string;
    const gpa = formData.get("gpa") as string;
    const sat = formData.get("sat") as string;

    if (!email) {
      setError("Invalid form submission");
      return;
    }

    signIn("credentials", {
      email: email,
      name: userName,
      phonenumber: phonenumber,
      highschool: highschool,
      education: education,
      gpa: gpa,
      sat: sat,
      image: image,
      callbackUrl: "/applicant",
    });
  };

  useEffect(() => {
    const userName = session.data?.user?.name || "";
    const email = session.data?.user?.email || "";

    if (!userName || !email) return setAutoFill(false);

    setAutoFill({
      userName: userName,
      email: email,
    });
  }, []);
  return (
    <div className="relative w-full h-screen">
      <div className="absolute left-0 top-0 w-full md:w-1/2 h-full">
        <Image
          src="/onboard-half-screen-gradient.svg"
          alt="big cat"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
        <div className="absolute top-0 left-0 z- m-8">
          <Image
            src="/onboard_logo.svg"
            alt="top left image"
            width={90}
            height={90}
          />
        </div>
        <div className="absolute inset-0 flex items-center m-8 -mt-12">
          <Image
            src="/text.svg"
            alt="top left image"
            width={450}
            height={450}
          />
        </div>
        <div
          className="absolute inset-0 flex items-center m-10"
          style={{ marginRight: "50px", height: "120px", marginTop: "480px" }}
        >
          <div
            className="typewriter-container"
            style={{ height: "100%", overflow: "hidden" }}
          >
            <Typewriter
              options={{
                strings: [
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex items-center justify-center">
        <div
          className="max-w-lg mx-auto md:w-2/3 px-4 py-6 bg-white rounded-lg shadow-lg"
          style={{ backgroundColor: "#101418" }}
        >
          <form onSubmit={handleSubmit} className="*:mt-4 *:space-y-2/3">
            <div className="input">
              <label htmlFor="userName" className="text-sm md:text-xs">
                Full Name*
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                defaultValue={(autofill && autofill.userName) || ""}
                placeholder="User Name"
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm`}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="email" className="text-sm md:text-xs">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                defaultValue={(autofill && autofill?.email) || ""}
                disabled
                maxLength={10}
                className={`w-full px-3 py-1 rounded-md disabled:placeholder:text-sm text-gray-400 disabled:cursor-not-allowed `}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="phonenumber" className="text-sm md:text-xs">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                placeholder="Phone Number"
                maxLength={10}
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm `}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="highschool" className="text-sm md:text-xs">
                High School*
              </label>
              <input
                type="text"
                id="highschool"
                name="highschool"
                placeholder="Highschool/College"
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm `}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="education" className="text-sm md:text-xs">
                Education*
              </label>
              <select
                id="education"
                name="education"
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm invalid:border-red-500'}`}
                required
              >
                <option value="">Select Curriculum</option>
                <option value="NEB">NEB</option>
                <option value="A-Levels">A-Levels</option>
                <option value="International Baccalaureate (IB)">
                  International Baccalaureate (IB)
                </option>
                <option value="CBSE (Indian Board)">CBSE (Indian Board)</option>
              </select>
            </div>

            <div className="input">
              <label htmlFor="gpa" className="text-sm md:text-xs">
                GPA/Grades*
              </label>
              <input
                type="text"
                maxLength={4}
                id="gpa"
                name="gpa"
                placeholder="Highschool GPA/Grades"
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm`}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="sat" className="text-sm md:text-xs">
                {" "}
                SAT Score
              </label>
              <input
                type="number"
                maxLength={4}
                id="sat"
                name="sat"
                placeholder="SAT Score (if taken) "
                className={`w-full px-3 py-1 rounded-md focus:outline-none placeholder:text-sm`}
                required
              />
            </div>

            {error && (
              <p className="text-red" style={{ color: "red" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-[#F4442A] to-[#F1314A]  rounded-md flex items-center justify-center py-2 px-4 text-white  ${roboto.className} `}
              style={{ marginTop: "25px" }}
            >
              <span className="font-bold">REGISTER</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
