"use client";

import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react'

const Signout = () => {
    return (
        <nav className="grid items-start gap-2 absolute bottom-4 right-4 left-4 cursor-pointer"
            onClick={() => signOut()}
        >
            <span
                className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-red-500 hover:text-accent-foreground",
                )}
            >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
            </span>
        </nav>
    )
}

export default Signout
