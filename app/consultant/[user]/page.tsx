"use client";

import React from 'react'

const ConsultantPage = (
    { params: { user } }:
        { params: { user: string } }
) => {
    return (
        <div>
            You can book me here {user}
        </div>
    )
}

export default ConsultantPage;
