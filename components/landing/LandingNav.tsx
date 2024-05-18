import Link from 'next/link'
import React from 'react'

const LandingNav = () => {
    return (
        <nav className='text-white flex items-center w-full justify-between gap-2 px-10 '>
            <div className="logo">
                logo
            </div>

            <ul className="navLinks flex gap-2">
                <Link className="link" href={"?aboutOpen=true"}>
                    About
                </Link>

                <Link className="link" href={""}>
                    Contact Us
                </Link>

                <button>
                    <span>
                        Login
                    </span>
                    <div className="icon">
                        Icons
                    </div>
                </button>
            </ul>

        </nav>
    )
}

export default LandingNav
