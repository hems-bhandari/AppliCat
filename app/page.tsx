"use client";

/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";

// components
import LandingNav from "@/components/landing/LandingNav";

// fonts
import { katibeh, roboto } from "@/lib/fonts";

// icons
import { ArrowTopRightIcon, ReaderIcon } from "@radix-ui/react-icons";
import LandingFooter from "@/components/landing/LandingFooter";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Particles from "@/components/ui/Particles";

const SERVICES = [
    {
        title: "SAT",
        description:
            "Find your tutor for SAT English annd Math. Ace your tests with Applicat",
        Icon: ReaderIcon,
    },
    {
        title: "Interview Prep",
        description:
            "Feeling nervous about your college interview? We got you covered. Book a session with us and ace your interview",
        Icon: ReaderIcon,
    },
    {
        title: "Essay Help",
        description:
            "Craft your essays that work. Power up your college application with our essay help",
        Icon: ReaderIcon,
    },
    {
        title: "CommonApp Walkthrough",
        description:
            "Get step-by-step review for all of your common app sections. Make your application stand out",
        Icon: ReaderIcon,
    },
];
const COLLEGELIST = [
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://www.pitzer.edu/wp-content/themes/foundation-6-Pitzer-College/img/pitzer-college-logo.svg",
    "https://brand.mit.edu/sites/default/files/styles/tile_narrow/public/2023-08/lockup-color-mit-red_0.png",
    "https://yaleidentity.yale.edu/sites/default/files/styles/max_width_320/public/2023-11/yale%20in%20gray%20box_0.png",
    "https://www.nyu.edu/employees/resources-and-services/media-and-communications/nyu-brand-guidelines/designing-in-our-style/nyu-logos-and-university-seal/logos-lockups-and-university-seal/jcr:content/1/par-left/nyuimage_769383815.img.320.medium.png/1645561821668.png",
    "https://brand.tufts.edu/sites/g/files/lrezom786/files/styles/large/public/2022-09/Tufts-logo-4c_5.jpg",
    "https://www.vassar.edu/sites/default/files/2021-07/Vassar_Wordmark_VassarBurgundy_RGB.png",
    "https://www.ashoka.org/sites/default/files/rollins-logo.jpg",
    "https://www.reed.edu/public-affairs/assets/downloads/logos/reed-college-lockup-red.png",
    "https://www.kenyon.edu/files/resources/logotype_kenyon-purple_rgb.png",
];

const Landing = () => {
    const heroControls = useAnimation();
    const servicesControls = useAnimation();
    const collegesControls = useAnimation();
    const bookingControls = useAnimation();
    const heroRef = useRef(null);

    const bookingRef = useRef(null);
    const collegesRef = useRef(null);

    const servicesRef = useRef(null);

    const heroInView = useInView(heroRef, { amount: 0.2 });
    const servicesInView = useInView(servicesRef, { amount: 0.2 });
    const collegesInView = useInView(collegesRef, { amount: 0.2 });
    const bookingInView = useInView(bookingRef, { amount: 0.2 });
    useEffect(() => {
        if (heroInView) {
            heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
        }
    }, [heroControls, heroInView]);

    useEffect(() => {
        if (servicesInView) {
            servicesControls.start({
                opacity: 1,
                y: -10,
                transition: { duration: 0.5 },
            });
        }
    }, [servicesControls, servicesInView]);

    useEffect(() => {
        if (collegesInView) {
            collegesControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            });
        }
    }, [collegesControls, collegesInView]);

    useEffect(() => {
        if (bookingInView) {
            bookingControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            });
        }
    }, [bookingControls, bookingInView]);


    return (
        <div className="relative min-h-screen  overflow-x-hidden">
            <div className="  absolute h-screen w-full overflow-hidden">
                <Particles
                    className="absolute inset-0 blur-[40px]"
                    quantity={30}
                    ease={40}
                    size={80}
                    color={"#F4442A"}
                    refresh
                />

            </div>

            <section className=" bg-gradient-to-b from-black/50 from-90%   to-black backdrop-blur-3xl  text-center relative">
                <LandingNav />
                <div
                    className="2xl:mx-auto 2xl:max-w-[1400px] max-w-[640px] mx-auto z-10  flex flex-col items-center  min-h-[calc(100vh-125px)] justify-center  px-4 p-1"
                    ref={heroRef}
                >
                    <motion.h1
                        style={{ opacity: 0 }}
                        animate={{ opacity: 1, y: -10 }}
                        className={`${katibeh.className} text-9xl text-white`}
                    >
                        Applicat
                    </motion.h1>
                    <motion.p
                        style={{ opacity: 0 }}
                        animate={{ opacity: 1, y: -14 }}
                        className={`text-md font-[400] max-w-[640px] text-[#e4e4e4] -mt-3 ${roboto.className}`}
                    >
                        For your purrfect college application
                    </motion.p>
                    <motion.div style={{ opacity: 0 }} animate={{ opacity: 1, y: -14 }}>
                        <Link
                            href="/auth"
                            className={`bg-gradient-to-r from-[#F4442A] to-[#F1314A] text-xl font-[500] uppercase rounded-[8px] flex items-center justify-center space-x-2 mx-auto mt-5 w-[260px] h-[55px] py-2 px-6 text-white ${roboto.className}`}
                        >
                            <span>Book Now</span>
                            <ArrowTopRightIcon className="w-6 h-6 font-bold" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="w-full h-auto relative max-lg:overflow-hidden max-lg:bg-[url('/landing_big_cat.svg')] max-lg:bg-fixed max-lg:bg-no-repeat max-lg:bg-contain max-lg:bg-center max-lg:py-16">
                <div>
                    <Image
                        src="/landing_big_cat.svg"
                        alt="big cat"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-contain object-center z-0 max-lg:hidden max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:object-cover"
                    />
                </div>

                <div className="w-full px-[5%] 2xl:px-0 grid grid-cols-[min(500px,35vw)_min(500px,35vw)] justify-between place-items-center 2xl:max-w-[1400px] lg:max-h-[min(80vh, 1400px)] mx-auto absolute top-0 left-0 right-0 h-full max-lg:grid-cols-2 max-lg:!relative max-lg:gap-8 max-sm:grid-cols-1">
                    {SERVICES.map(({ title, description, Icon }, index) => (
                        <motion.div
                            key={`SERVICES-${index}`}
                            className={`SERVICE_CARD bg-[#2d2d2d] bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-4 flex items-start max-w-[min(500px,35vw)] max-h-[175px] max-lg:max-w-full max-lg:justify-normal ${index === 2 && "lg:translate-x-8"
                                } ${index === 3 && "lg:-translate-x-8"}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={servicesControls}
                            ref={servicesRef}
                        >
                            <div>
                                <Icon className="h-10 w-auto mr-2 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white text-xl font-bold">{title}</h2>
                                <p className="text-white text-sm leading-[18px]">
                                    {description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="w-full px-[5%] h-auto relative my-16 2xl:max-w-[1400px] 2xl:mx-auto">
                <motion.h2
                    className={`${katibeh.className} text-5xl text-white text-center`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={collegesControls}
                    ref={collegesRef}
                >
                    {" "}
                    Talk to Freshmen from
                </motion.h2>
                <div className="college-lists relative mx-auto mt-8 flex flex-wrap justify-center gap-2 max-md:w-[calc(10*(180px+32px))] max-md:-translate-x-1/2 max-md:left-1/2">
                    {COLLEGELIST.map((logo, index) => (
                        <>
                            <div
                                key={"COLLEGE-" + index}
                                className={` ${index > 3 && index < 9
                                    ? "w-[calc(20%-(5*0.5rem)/4)]"
                                    : "w-[21%]"
                                    } justify-center items-center p-4 bg-white rounded-md shadow-md max-md:grow animate-none ${index > 3 && index < 9
                                        ? "max-md:w-[calc(10%-(9*0.5rem)/10)] animate-scroll-reverse"
                                        : "max-md:w-[11%] animate-scroll"
                                    } max-md:h-20`}
                            >
                                <img
                                    src={logo}
                                    alt={logo}
                                    className="w-full h-full max-h-16 max-w-52 object-contain"
                                />
                            </div>

                            <div
                                key={`COLLEGECOPY-${index}`}
                                className={`hidden max-md:flex justify-center items-center p-4 bg-white rounded-md shadow-md w-auto grow ${index > 3 && index < 9
                                    ? "max-md:w-[calc(10%-(9*0.5rem)/10)] animate-scroll-reverse"
                                    : "max-md:w-[11%] animate-scroll"
                                    } max-md:h-20`}
                            >
                                <img
                                    src={logo}
                                    alt={logo}
                                    className="w-full h-full max-h-16 max-w-52 object-contain"
                                />
                            </div>
                        </>
                    ))}
                </div>
            </section>

            <section className=" bg-gradient-to-r from-gradientStart to-gradientStop  min-h-48 py-4 flex flex-row px-[5%] justify-center items-center">
                <div className="flex flex-row gap-4 w-full justify-between items-end max-md:flex-col max-md:items-center max-md:justify-center 2xl:max-w-[1400px]">
                    <motion.h2
                        className={`${roboto.className} text-4xl align-top max-md:text-center text-white font-bold`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={bookingControls}
                        ref={bookingRef}
                    >
                        {" "}
                        Book Your <br /> Session Today
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={bookingControls}
                        ref={bookingRef}
                    >
                        <Link
                            href="/auth"
                            className={`bg-white text-lg font-bold uppercase rounded-[8px] flex items-center justify-center space-x-2 w-[200px] h-[48px] py-2 px-6 text-red-600 ${roboto.className}`}
                        >
                            <span>Book Now</span>
                        </Link>
                    </motion.div>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
};

export default Landing;
