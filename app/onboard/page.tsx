"use client";
import { useState } from 'react';
import Image from "next/image";

// fonts
import { katibeh, roboto } from "@/lib/fonts";



const MyComponent = () => {
   // variables to store data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [highschool, setHighschool] = useState('');
    const [curriculum, setCurriculum] = useState('');
    const [hsgpa, setHsgpa] = useState('');
    const [satscore, setsatscore] = useState('');
    const [error, setError] = useState('');

    // database function
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        
        if (!firstName || !lastName || !email || !phoneNumber || !highschool || !curriculum) {
            setError('Please fill in all required fields.');
            return;
        }

        // main submission function
    };

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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" id="f-name" name="name" placeholder="First Name" className={`w-full px-3 py-2 rounded-md focus:outline-none ${!firstName && 'border-red-500'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="text" id="l-name" name="l-name" placeholder="Last Name" className={`w-full px-3 py-2 rounded-md focus:outline-none ${!lastName && 'border-red-500'}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="email" id="u-email" name="u-email" placeholder="Email" className={`w-full px-3 py-2 rounded-md focus:outline-none ${!email && 'border-red-500'}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="tel" id="u-phone" name="u-phone" placeholder="Phone Number" maxLength={10} className={`w-full px-3 py-2 rounded-md focus:outline-none ${!phoneNumber && 'border-red-500'}`} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="text" id="hschool" name="hschool" placeholder="Highschool/College" className={`w-full px-3 py-2 rounded-md focus:outline-none ${!highschool && 'border-red-500'}`} value={highschool} onChange={(e) => setHighschool(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <select id="education" name="education" className={`w-full px-3 py-2 rounded-md focus:outline-none ${!curriculum && 'border-red-500'}`} value={curriculum} onChange={(e) => setCurriculum(e.target.value)} >
                                <option value="" disabled selected>Select Curriculum</option>
                                <option value="NEB">NEB</option>
                                <option value="A-Levels">A-Levels</option>
                                <option value="International Baccalaureate (IB)">International Baccalaureate (IB)</option>
                                <option value="CBSE (Indian Board)">CBSE (Indian Board)</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="gpa" maxLength={4} id="gpa" name="gpa" placeholder="Highschool GPA"className={`w-full px-3 py-2 rounded-md focus:outline-none ${!hsgpa && 'border-red-500'}`} value={hsgpa} onChange={(e) => setHsgpa(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="sat" maxLength={4} id="sat" name="sat" placeholder="SAT Score (if taken) " className={`w-full px-3 py-2 rounded-md focus:outline-none ${!satscore && 'border-red-500'}`} value={satscore} onChange={(e) => setsatscore(e.target.value)} />
                        </div>
                        {error && <p className="text-red mb-3" style={{color:'red'}}>{error}</p>}
                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-[#F4442A] to-[#F1314A] text-white rounded-md flex items-center justify-center space-x-2 mx-auto mt-4 py-2 px-4 text-white ${roboto.className}`}
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
