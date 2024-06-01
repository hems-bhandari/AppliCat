'use client'

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
import { animate, inView, motion, useAnimation, useScroll } from 'framer-motion'
import { Ref, createRef, useEffect, useRef, useState } from "react";

const SERVICES = [
    {
        title: "SAT",
        description:
            "Lorem Ipsum is simply dummy text of the printing a Lorem Ipsum is simply dummy text of the printing aLorem Ipsum is simply dummy text of the printing a",
        Icon: ReaderIcon,
    },
    {
        title: "IELTS",
        description:
            "Lorem Ipsum is simply dummy text of the printing a Lorem Ipsum is simply dummy text of the printing aLorem Ipsum is simply dummy text of the printing a",
        Icon: ReaderIcon,
    },
    {
        title: "GRE",
        description:
            "Lorem Ipsum is simply dummy text of the printing a Lorem Ipsum is simply dummy text of the printing aLorem Ipsum is simply dummy text of the printing a",
        Icon: ReaderIcon,
    },
    {
        title: "GMAT",
        description:
            "Lorem Ipsum is simply dummy text of the printing a Lorem Ipsum is simply dummy text of the printing aLorem Ipsum is simply dummy text of the printing a",
        Icon: ReaderIcon,
    },
];
const COLLEGELIST = [
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
]


const USER_BUBBLES = [
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
    "https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU",
]
import { useInView } from 'framer-motion';

interface CircleProps {
    size: number;
    x: number;
    y: number;
}

const Circle: React.FC<CircleProps> = ({ size, x, y }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#F4442A] to-[#F1314A] "
            style={{ width: size, height: size, left: x, top: y }}
        />
    );
};


interface CircleData {
    size: number;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
}

const generateRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Landing = () => {
    const heroControls = useAnimation();
    const servicesControls = useAnimation();
    const collegesControls = useAnimation();
    const bookingControls = useAnimation();
    const heroRef = useRef(null)

    const bookingRef = useRef(null)
    const collegesRef = useRef(null)

    const servicesRef = useRef(null)

    const heroInView = useInView(heroRef, { amount: 0.2 });
    const servicesInView = useInView(servicesRef, { amount: 0.2 });
    const collegesInView = useInView(collegesRef, { amount: 0.1 });
    const bookingInView = useInView(bookingRef, { amount: 0.2 });
    useEffect(() => {
        if (heroInView) {
            heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
        }
    }, [heroControls, heroInView]);

    useEffect(() => {
        if (servicesInView) {
            servicesControls.start({ opacity: 1, y: -10, transition: { duration: 0.5 } });
        }
    }, [servicesControls, servicesInView]);

    useEffect(() => {
        if (collegesInView) {
            collegesControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
        }
    }, [collegesControls, collegesInView]);

    useEffect(() => {
        if (bookingInView) {
            bookingControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
        }
    }, [bookingControls, bookingInView]);

    const [circles, setCircles] = useState<CircleData[]>([]);

    useEffect(() => {
        const newCircles: CircleData[] = [];
        for (let i = 0; i < 12; i++) {
            const size = generateRandom(60, 100);
            const x = generateRandom(0, window.innerWidth - size);
            const y = generateRandom(0, window.innerHeight - size);
            const velocityX = generateRandom(0.5, 2) * (Math.random() < 0.5 ? 1 : -1);
            const velocityY = generateRandom(0.5, 2) * (Math.random() < 0.5 ? 1 : -1);
            newCircles.push({ size, x, y, velocityX, velocityY });
        }
        setCircles(newCircles);

        const updatePositions = () => {
            setCircles(prevCircles =>
                prevCircles.map(circle => {
                    let newX = circle.x + circle.velocityX;
                    let newY = circle.y + circle.velocityY - 1 / circle.size * 100;

                    if (newX < 0) newX = window.innerWidth;
                    if (newX > window.innerWidth) newX = 0;
                    if (newY < 0) newY = window.innerHeight;
                    if (newY > window.innerHeight) newY = 0;

                    return { ...circle, x: newX, y: newY };
                })
            );
        };

        const interval = setInterval(updatePositions, 16); // roughly 60fps
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="min-h-screen  overflow-x-hidden">

            <div className="opacity-70 absolute h-screen w-full overflow-hidden">
                {circles.map((circle, index) => (
                    <Circle
                        size={circle.size}
                        x={circle.x}
                        y={circle.y}
                    />
                ))}
            </div>
            <LandingNav />

            <section className="2xl:max-w-[1400px] 2xl:mx-auto bg-transparent text-center min-h-[calc(100vh-125px)] flex items-center justify-center relative px-4">
                <motion.div className="max-w-[640px] mx-auto z-10"
                    ref={heroRef}
                    animate={heroControls}
                    initial={{ y: 20, opacity: 0 }}
                >
                    <h1
                        className={`${katibeh.className} text-9xl text-white`}
                        style={katibeh.style}
                    >
                        Applicat
                    </h1>
                    <p
                        className={`text-md font-[400] text-[#e4e4e4] mt-3 ${roboto.className}`}
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    </p>
                    <div
                    >
                        <Link
                            href="/auth"
                            className={`bg-gradient-to-r from-[#F4442A] to-[#F1314A] text-xl font-[500] uppercase rounded-[8px] flex items-center justify-center space-x-2 mx-auto mt-5 w-[260px] h-[55px] py-2 px-6 text-white ${roboto.className}`}
                        >
                            <span>Book Now</span>
                            <ArrowTopRightIcon className="w-6 h-6 font-bold" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            <section className="w-full h-auto relative max-lg:overflow-hidden max-lg:bg-[url('/landing_big_cat.svg')] max-lg:bg-fixed max-lg:bg-no-repeat max-lg:bg-contain max-lg:bg-center max-lg:py-16">
                <motion.div>
                    <Image
                        src="/landing_big_cat.svg"
                        alt="big cat"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-contain object-center z-0 max-lg:hidden max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:object-cover"
                    />
                </motion.div>

                <div className="w-full px-[5%] 2xl:px-0 grid grid-cols-[min(500px,35vw)_min(500px,35vw)] justify-between place-items-center 2xl:max-w-[1400px] lg:max-h-[min(80vh, 1400px)] mx-auto absolute top-0 left-0 right-0 h-full max-lg:grid-cols-2 max-lg:!relative max-lg:gap-8 max-sm:grid-cols-1">
                    {SERVICES.map(({ title, description, Icon }, index) => (
                        <motion.div
                            key={`SERVICES-${index}`}
                            className={`SERVICE_CARD bg-[#2d2d2d] bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-4 flex items-start max-w-[min(500px,35vw)] max-h-[175px] max-lg:max-w-full max-lg:justify-normal ${index === 2 && 'lg:translate-x-8'} ${index === 3 && 'lg:-translate-x-8'}`}
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

                    style={{ fontFamily: katibeh.style.fontFamily }}
                    animate={collegesControls}
                    ref={collegesRef}
                >
                    Talk to Freshmen from
                </motion.h2>
                <div className="college-lists relative mx-auto mt-8 flex flex-wrap justify-center gap-2 max-md:w-[calc(10*(180px+32px))] max-md:-translate-x-1/2 max-md:left-1/2">
                    {COLLEGELIST.map((logo, index) => (
                        <>
                            <div
                                key={"COLLEGECOPY-" + index}
                                className={` ${index > 3 && index < 9 ? 'w-[calc(20%-(5*0.5rem)/4)]' : 'w-[21%]'} justify-center items-center p-4 bg-white rounded-md shadow-md max-md:grow ${index > 3 && index < 9 ? 'max-md:w-[calc(10%-(9*0.5rem)/10)] animate-scroll-reverse' : 'max-md:w-[11%] animate-scroll'} max-md:h-20`}
                            >
                                <img src={logo} alt={logo} className="w-full h-full max-h-16 max-w-52 object-contain" />
                            </div>

                            <div
                                key={`COLLEGE-${index}`}
                                className={`hidden max-md:flex justify-center items-center p-4 bg-white rounded-md shadow-md w-auto grow ${index > 3 && index < 9 ? 'max-md:w-[calc(10%-(9*0.5rem)/10)] animate-scroll-reverse' : 'max-md:w-[11%] animate-scroll'} max-md:h-20`}
                            >
                                <img src={logo} alt={logo} className="w-full h-full max-h-16 max-w-52 object-contain" />
                            </div>
                        </>
                    ))}
                </div>
            </section>

            <section className="bg-red-600 min-h-48 py-4 flex flex-row px-[5%] justify-center items-center">
                <div className="flex flex-row gap-4 w-full justify-between items-end max-md:flex-col max-md:items-center max-md:justify-center 2xl:max-w-[1400px]">
                    <motion.h2
                        className={`${roboto.className} text-4xl align-top max-md:text-center text-white font-bold`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={bookingControls}
                        ref={bookingRef}
                    >
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

