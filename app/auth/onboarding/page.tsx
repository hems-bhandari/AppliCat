"use client";
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import Image from "next/image";

// fonts
import { roboto } from "@/lib/fonts";
import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const MyComponent = () => {
    const [error, setError] = useState<string>();
    const [autofill, setAutoFill] = useState<{ userName: string, email: string } | false>(false);

    const session = useSession();

    // database function
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!formData) {
            setError('Please fill in all required fields.');
            return;
        }

        const userName = formData.get('userName') as string;
        const email = session.data?.user?.email || "";
        const phonenumber = formData.get('phonenumber') as string;
        const highschool = formData.get('highschool') as string;
        const education = formData.get('education') as string;
        const gpa = formData.get('gpa') as string;
        const sat = formData.get('sat') as string;

        if (!email) {
            setError('Invalid form submission');
            return;
        }

        signIn('credentials', {
            email: email,
            userName: userName,
            phonenumber: phonenumber,
            highschool: highschool,
            education: education,
            gpa: gpa,
            sat: sat,
            callbackUrl: '/applicant'
        });
    };

    useEffect(() => {
        const userName = session.data?.user?.name || "";
        const email = session.data?.user?.email || "";

        if (!userName || !email)
            return setAutoFill(false);

        setAutoFill({
            userName: userName,
            email: email
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
                    <form onSubmit={handleSubmit} className='*:mt-4 *:space-y-1'>
                        <div className="input">
                            <label htmlFor="userName">Full Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                defaultValue={autofill && autofill.userName || ""}
                                placeholder="First Name"
                                className={`w-full px-3 py-2 rounded-md focus:outline-none `}
                                required
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                defaultValue={autofill && autofill?.email || ""}
                                disabled
                                maxLength={10}
                                className={`w-full px-3 py-2 rounded-md disabled:placeholder:text-gray-400 text-gray-400 disabled:cursor-not-allowed `}
                                required
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="phonenumber"> Phone Number</label>
                            <input
                                type="tel"
                                id="phonenumber"
                                name="phonenumber"
                                placeholder="Phone Number"
                                maxLength={10}
                                className={`w-full px-3 py-2 rounded-md focus:outline-none `}
                                required
                            />
                        </div>


                        <div className="input">
                            <label htmlFor="highschool">High School Name</label>
                            <input
                                type="text"
                                id="highschool"
                                name="highschool"
                                placeholder="Highschool/College"
                                className={`w-full px-3 py-2 rounded-md focus:outline-none `}
                                required
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="education">Education</label>
                            <select id="education"
                                name="education"
                                className={`w-full px-3 py-2 rounded-md focus:outline-none  invalid:border-red-500'}`}
                                required >
                                <option value="" selected defaultChecked>Select Curriculum</option>
                                <option value="NEB">NEB</option>
                                <option value="A-Levels">A-Levels</option>
                                <option value="International Baccalaureate (IB)">International Baccalaureate (IB)</option>
                                <option value="CBSE (Indian Board)">CBSE (Indian Board)</option>
                            </select>
                        </div>

                        <div className="input">
                            <label htmlFor="gpa">GPA/Grades</label>
                            <input
                                type="gpa"
                                maxLength={4}
                                id="gpa"
                                name="gpa"
                                placeholder="Highschool GPA/Grades"
                                className={`w-full px-3 py-2 rounded-md focus:outline-none`}
                                required />
                        </div>

                        <div className="input">
                            <label htmlFor="sat"> SAT Score</label>
                            <input
                                type="sat"
                                maxLength={4}
                                id="sat"
                                name="sat"
                                placeholder="SAT Score (if taken) "
                                className={`w-full px-3 py-2 rounded-md focus:outline-none `}
                                required />
                        </div>


                        {error && <p className="text-red" style={{ color: 'red' }}>{error}</p>}

                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-[#F4442A] to-[#F1314A]  rounded-md flex items-center justify-center py-2 px-4 text-white  ${roboto.className} `}
                            style={{ marginTop: '40px' }}
                        >
                            <span className='font-bold'>SUBMIT</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
