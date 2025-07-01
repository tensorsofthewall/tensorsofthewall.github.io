"use client";
/* General Package Imports */
import Link from "next/link";
import Image from "next/image";
import React from "react";

/* Asset Imports */
import ProfileImg from "@/public/images/tensorsofthewall.webp" 
import { TbError404 } from "react-icons/tb";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaHome, FaGraduationCap, FaBriefcase, FaFileDownload } from "react-icons/fa";
// import {FaEnvelope} from "react-icons/fa6";
import { GiBookshelf, GiNotebook, GiOnTarget } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";

import dynamic from "next/dynamic";

// To prevent hydration issues
const MotionDiv = dynamic(() => import("motion/react-client").then((mod) => mod.div), { ssr: false })

const SHOW_NEW_UNTIL = new Date("2025-08-15T23:59:59Z");
const showNew = new Date() < SHOW_NEW_UNTIL;

import { AnimatedComponent } from "./animatedComponents";

const Header = () => {
    return (
        // <header id="header" className="sticky top-0 z-50 mx-auto flex max-w-8xl flex-col items-center justify-center bg-zinc-925 p-2 pt-4 relative" style={{position: 'sticky', top:0, left: 0, right:0, zIndex:1000, width: '100%', height: '2.5vh', paddingTop: '8vh'}}>
        <header
        id="header"
        className="sticky top-0 z-50 mx-auto flex max-w-8xl flex-col items-center justify-center bg-zinc-925 pt-4 relative w-full"
        >
            <div id="wrapper" className="flex flex-col items-center w-full">
                <div className="absolute inset-0 backdrop-blur-md "></div> 
                <Link href="/" className="no-underline z-20 max-sm:translate-x-[13.5vh]">
                    <div className="text-small sm:text-medium md:text-xl lg:text-3xl font-bold text-white-400 tracking-tighter mb-2 font-['Orbitron'] drop-shadow-md pb-10 sm:pb-9 md:pb-8 lg:pb-5 flex items-center gap-2 sm:gap-1 "> 
                        <Image
                            src={ProfileImg}
                            alt="Logo"
                            width={28}
                            height={28}
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
                            priority
                        />
                        TensorsOfTheWall
                    </div>
                </Link>
                <div className="flex flex-col sm:flex-row justify-between w-full relative z-10 gap-1 sm:gap-0">
                    {/* Left Icon Links */}
                    <MotionDiv 
                        initial={{ opacity: 0, x: -500, y: -75}} 
                        animate={{ opacity: 1, x: 0, y: -75 }} 
                        transition={{ type:"spring", bounce: 0.45, duration: 1.0 }} 
                        layout
                        className="flex items-center gap-1 sm:gap-2"
                    >
                        <Link href="/">
                            <FaHome className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Go home" />
                        </Link>
                        <Link href="/skills">
                            <GiOnTarget className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Skills" />
                        </Link>
                        <AnimatedComponent component={HiLightBulb} href="/research-exp" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Research Experience" />
                        <Link href="/industry-exp">
                            <FaBriefcase className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Industry Experience" />
                        </Link>
                        <Link href="/education">
                            <FaGraduationCap className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Education" />
                        </Link>
                        <Link href="/projects_publications">
                            <GiBookshelf className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Publications and Projects" />
                        </Link>
                    </MotionDiv>

                    {/* Right Icon Links */}
                    <MotionDiv 
                        initial={{ opacity: 0, x: 500, y: -75 }} 
                        animate={{ opacity: 1, x: 0, y: -75 }} 
                        transition={{ type:"spring", bounce: 0.45, duration: 1.0 }}
                        layout 
                        className="flex items-center gap-1 sm:gap-2"
                    >
                        <Link href="/not-found">
                            <TbError404 className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Random comic"/>
                        </Link>
                        {/* <Link href="/blog">
                            <GiNotebook className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Blog"/>
                        </Link> */}
                        <AnimatedComponent component={GiNotebook} href="/blog" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Blog" showNew={showNew} />
                        <Link href="/data/CV - Sandesh Bharadwaj.pdf" target="_blank">
                            <FaFileDownload className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Download CV" />
                        </Link>
                        <Link href="https://linkedin.com/in/sandeshbharadwaj97" target="_blank">
                            <SiLinkedin className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="LinkedIn" />
                        </Link>
                        <Link href="https://github.com/tensorsofthewall" target="_blank">
                            <SiGithub className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Github" />
                        </Link>
                        <Link href="https://x.com/tensorofthewall" target="_blank">
                            <FaXTwitter className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="X/Twitter" />
                        </Link>
                        {/* <Link href="/#contact" className="group flex cursor-pointer items-center">
                            <FaEnvelope className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Contact Me"/>
                        </Link> */}
                    </MotionDiv>
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);