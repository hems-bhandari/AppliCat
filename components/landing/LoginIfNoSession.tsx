"use client";

import { roboto } from '@/lib/fonts';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { UserNav } from '../layout/user-nav';

const LoginIfNoSession = () => {
    const session = useSession();
    const isAuthenticated = session?.data?.user?._id;
    return (
        <>
            {
                isAuthenticated ?
                    <UserNav />
                    : (
                        <Link
                            href="/auth"
                            className={`bg-transparent text-md font-[500] uppercase border border-1 border-white py-2 px-6 text-white ${roboto.className} flex  items-center`}
                        >
                            Login <ArrowTopRightIcon className="w-[26px] h-[26px] font-bold" />
                        </Link>

                    )

            }
        </>
    )
}

export default LoginIfNoSession
