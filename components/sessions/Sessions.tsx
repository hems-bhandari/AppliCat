"use client";

import { BaseSession } from "./BaseSession"

export const PastSessions = () => {
    return <BaseSession delimeter="previous" />
}

export const UpcommingSession = () => {
    return <BaseSession delimeter="upcoming" />
}

export const AllSessions = () => {
    return <BaseSession delimeter="all" />
}
