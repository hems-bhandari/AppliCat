"use client";

import { useSession } from 'next-auth/react'
import React from 'react'

const Greeting = () => {
    const { data } = useSession();
    if (data)
        return (
            <h2 className="text-3xl font-bold tracking-tight">
                Hello, {(data?.user?.name)?.split(" ")[0] ||
                    (
                        data?.user?.type === "Consultant"
                            ? "Freshman"
                            : data?.user?.type === "Applicant"
                                ? "Applicant"
                                : "Admin"
                    )}! Welcome back
            </h2>
        )
}

export default Greeting
