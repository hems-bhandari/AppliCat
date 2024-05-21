"use client";
import { FormEventHandler, useEffect, useState } from 'react';
import Image from "next/image";

// fonts
import { roboto } from "@/lib/fonts";
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const MyComponent = () => {
    const [error, setError] = useState<string>();
    const [autofill, setAutoFill] = useState<{ userName: string } | false>(false);

    // database function
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e);

        if (!formData) {
            setError('Please fill in all required fields.');
            return;
        }
        // main submission function
    };

    const searchParam = useSearchParams();
    useEffect(() => {
        const userName = searchParam.get("userName");
        if (!userName)
            return setAutoFill(false);

        setAutoFill({
            userName: userName || ""
        })
    }, [])
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
            </div>
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex items-center justify-center">
                <div className="max-w-lg mx-auto md:w-4/5 px-4 py-8 bg-white rounded-lg shadow-lg" style={{ backgroundColor: '#101418' }}>
                    <form onSubmit={handleSubmit} className='space-y-3'>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            defaultValue={autofill && autofill.userName || ""}
                            placeholder="First Name"
                            className={`w-full px-3 py-2 rounded-md focus:outline-none `} />
                        <input type="email" id="email" name="email" placeholder="Email" className={`w-full px-3 py-2 rounded-md focus:outline-none `} />
                        <input type="tel" id="phonenumber" name="phonenumber" placeholder="Phone Number" maxLength={10} className={`w-full px-3 py-2 rounded-md focus:outline-none `} />
                        <input type="text" id="highschool" name="highschool" placeholder="Highschool/College" className={`w-full px-3 py-2 rounded-md focus:outline-none `} />
                        <select id="education"
                            name="education"
                            className={`w-full px-3 py-2 rounded-md focus:outline-none  invalid:border-red-500'}`} >
                            <option value="" selected defaultChecked>Select Curriculum</option>
                            <option value="NEB">NEB</option>
                            <option value="A-Levels">A-Levels</option>
                            <option value="International Baccalaureate (IB)">International Baccalaureate (IB)</option>
                            <option value="CBSE (Indian Board)">CBSE (Indian Board)</option>
                        </select>
                        <input type="gpa" maxLength={4} id="gpa" name="gpa" placeholder="Highschool GPA" className={`w-full px-3 py-2 rounded-md focus:outline-none`} />
                        <input type="sat" maxLength={4} id="sat" name="sat" placeholder="SAT Score (if taken) " className={`w-full px-3 py-2 rounded-md focus:outline-none `} />
                        {error && <p className="text-red mb-3" style={{ color: 'red' }}>{error}</p>}
                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-[#F4442A] to-[#F1314A]  rounded-md flex items-center justify-center space-x-2 mx-auto mt-4 py-2 px-4 text-white ${roboto.className}`}
                        >
                            <span>SUBMIT</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
