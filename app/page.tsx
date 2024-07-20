"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

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
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

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
];

interface CircleProps {
    size: number;
    x: number;
    y: number;
}

const Circle: React.FC<CircleProps> = ({ size, x, y }) => {
    return (
        <div
            className="absolute rounded-full bg-gradient-to-r from-[#F4442A] to-[#F1314A]  blur-[80px]"
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

const generateRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

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

    const [circles, setCircles] = useState<CircleData[]>([]);

    useEffect(() => {
        const newCircles: CircleData[] = [];
        const minDistance = window.innerWidth * 0.15; // Minimum distance between circles

        {
            /* let mouseX = window.innerWidth / 2;
              let mouseY = window.innerHeight / 2; */
        }

        const isFarEnough = (x: number, y: number) => {
            return newCircles.every((circle) => {
                const dx = circle.x - x;
                const dy = circle.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance > minDistance;
            });
        };

        for (let i = 0; i < 14; i++) {
            let size, x, y;
            let attempts = 0;
            do {
                size = generateRandom(150, 210);
                x = generateRandom(0, window.innerWidth - size);
                y = generateRandom(0, window.innerHeight - size);
                attempts++;
            } while (!isFarEnough(x, y) && attempts < 100); // Limit atempts to avoid infinite loop

            const velocityX =
                (Math.random() * (0.5 - 2) + 0.1) * (Math.random() < 0.5 ? 0.1 : -0.1);
            const velocityY =
                (Math.random() * (0.5 - 2) + 0.1) * (Math.random() < 0.5 ? 0.1 : -0.1);
            newCircles.push({ size, x, y, velocityX, velocityY });
        }
        setCircles(newCircles);

        const checkCollision = (circleA: CircleData, circleB: CircleData) => {
            const dx = circleB.x - circleA.x;
            const dy = circleB.y - circleA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (circleA.size + circleB.size) / 2;
        };

        const handleCollision = (circleA: CircleData, circleB: CircleData) => {
            const dx = circleB.x - circleA.x;
            const dy = circleB.y - circleA.y;
            const angle = Math.atan2(dy, dx);
            const sinValue = Math.sin(angle);
            const cosValue = Math.cos(angle);

            // Rotate circleAs position
            const posA = { x: 0, y: 0 };
            const posB = {
                x: dx * cosValue + dy * sinValue,
                y: dy * cosValue - dx * sinValue,
            };

            // Rotate circleAs velocity
            const velA = {
                x: circleA.velocityX * cosValue + circleA.velocityY * sinValue,
                y: circleA.velocityY * cosValue - circleA.velocityX * sinValue,
            };
            const velB = {
                x: circleB.velocityX * cosValue + circleB.velocityY * sinValue,
                y: circleB.velocityY * cosValue - circleB.velocityX * sinValue,
            };

            // Update velocities after collision
            const vxTotal = velA.x - velB.x;
            velA.x =
                ((circleA.size - circleB.size) * velA.x + 2 * circleB.size * velB.x) /
                (circleA.size + circleB.size);
            velB.x = vxTotal + velA.x;

            // Update positions to avoid sticking
            const absV = Math.abs(velA.x) + Math.abs(velB.x);
            const overlap =
                (circleA.size + circleB.size) / 2 - Math.abs(posA.x - posB.x);
            posA.x += (velA.x / absV) * overlap;
            posB.x += (velB.x / absV) * overlap;

            // Rotate positions back
            const posAF = {
                x: posA.x * cosValue - posA.y * sinValue,
                y: posA.y * cosValue + posA.x * sinValue,
            };
            const posBF = {
                x: posB.x * cosValue - posB.y * sinValue,
                y: posB.y * cosValue + posB.x * sinValue,
            };

            // Rotate velocities back
            const velAF = {
                x: velA.x * cosValue - velA.y * sinValue,
                y: velA.y * cosValue + velA.x * sinValue,
            };
            const velBF = {
                x: velB.x * cosValue - velB.y * sinValue,
                y: velB.y * cosValue + velB.x * sinValue,
            };

            // Adjust positions to their new locations
            circleB.x = circleA.x + posBF.x;
            circleB.y = circleA.y + posBF.y;
            circleA.x += posAF.x;
            circleA.y += posAF.y;

            // Adjust velocities
            circleA.velocityX = velAF.x;
            circleA.velocityY = velAF.y;
            circleB.velocityX = velBF.x;
            circleB.velocityY = velBF.y;
        };

        const updatePositions = () => {
            setCircles((prevCircles) => {
                const circlesCopy = [...prevCircles];
                for (let i = 0; i < circlesCopy.length; i++) {
                    let newX = circlesCopy[i].x + circlesCopy[i].velocityX;
                    let newY = circlesCopy[i].y + circlesCopy[i].velocityY;

                    // Only wrap around when the circle is completely off the screen
                    if (newX + circlesCopy[i].size < 0) newX = window.innerWidth;
                    if (newX > window.innerWidth) newX = -circlesCopy[i].size;
                    if (newY + circlesCopy[i].size < 0) newY = window.innerHeight;
                    if (newY > window.innerHeight) newY = -circlesCopy[i].size;

                    circlesCopy[i].x = newX;
                    circlesCopy[i].y = newY;
                }

                // Check for collisions
                for (let i = 0; i < circlesCopy.length; i++) {
                    for (let j = i + 1; j < circlesCopy.length; j++) {
                        if (checkCollision(circlesCopy[i], circlesCopy[j])) {
                            handleCollision(circlesCopy[i], circlesCopy[j]);
                        }
                    }
                }

                return circlesCopy;
            });
        };

        const interval = setInterval(updatePositions, 16); // roughly 60fps
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen  overflow-x-hidden">
            <div className="  absolute h-screen w-full overflow-hidden">
                {circles.map((circle, index) => (
                    <Circle
                        key={`CIRCLE-${index}`}
                        size={circle.size}
                        x={circle.x}
                        y={circle.y}
                    />
                ))}
            </div>

            <section className=" bg-gradient-to-b from-black/50 from-90%   to-black backdrop-blur-sm  text-center relative">
                <LandingNav />
                <div
                    className="2xl:mx-auto 2xl:max-w-[1400px] max-w-[640px] mx-auto z-10  flex flex-col items-center  min-h-[calc(100vh-125px)] justify-center  px-4"
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
                        Lorem no testing of workflow. will be updated now
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
            <SpeedInsights />
        </div>
    );
};

export default Landing;
