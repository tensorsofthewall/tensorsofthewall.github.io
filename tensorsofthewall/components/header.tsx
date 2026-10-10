/* General Package Imports */
import Link from "next/link";
import Image from "next/image";
import React from "react";

/* Asset Imports */
import ProfileImg from "@/public/images/tensorsofthewall-logo.webp" 
import { TbError404 } from "react-icons/tb";
import { SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaHome, FaGraduationCap, FaBriefcase, FaFileDownload, FaLinkedin } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
// import {FaEnvelope} from "react-icons/fa6";
import { GiBookshelf, GiNotebook, GiOnTarget } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";

import type { IconType } from "react-icons";

/** Shared focus ring for icon links (the icons carry their own padding and size). */
const NAV_LINK = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Pulsing nav icon (pure CSS, no client JS)
const PulseLink = ({ component: Icon, href, className, title, speed = 1 }: { component: IconType; href: string; className: string; title: string; speed?: number }) => (
    <div className="relative inline-flex flex-col items-center">
        <Link href={href} prefetch={false} aria-label={title} className={NAV_LINK}>
            <div className="nav-pulse" style={{ "--pulse-speed": `${speed}s` } as React.CSSProperties}>
                <Icon className={className} title={title} />
            </div>
        </Link>
    </div>
);

const Header = () => {
    return (
        // <header id="header" className="sticky top-0 z-50 mx-auto flex max-w-8xl flex-col items-center justify-center bg-zinc-925 p-2 pt-4 relative" style={{position: 'sticky', top:0, left: 0, right:0, zIndex:1000, width: '100%', height: '2.5vh', paddingTop: '8vh'}}>
        <header
        id="header"
        className="sticky top-0 z-50 mx-auto flex flex-col items-center justify-center pt-4 relative w-full overflow-x-clip"
        >
            <div id="wrapper" className="flex flex-col items-center w-full">
                <div className="absolute inset-0 backdrop-blur-md "></div> 
                <Link href="/" className={`no-underline z-20 ${NAV_LINK}`}>
                    <div className="md:text-xl lg:text-3xl font-bold tracking-tighter mb-2 font-orbitron drop-shadow-md pb-1 sm:pb-9 md:pb-8 lg:pb-5 flex items-center gap-2 sm:gap-1"> 
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
                    <nav aria-label="Main" className="header-slide-left flex items-center justify-center gap-1 sm:gap-2">
                        <Link href="/" aria-label="Home" className={NAV_LINK}>
                            <FaHome className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Go home" />
                        </Link>
                        <Link href="/skills" prefetch={false} aria-label="Skills" className={NAV_LINK}>
                            <GiOnTarget className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Skills" />
                        </Link>
                        {/* <PulseLink component={HiLightBulb} href="/research-exp" className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Research Experience" /> */}
                        {/* <Link href="/industry-exp">
                            <FaBriefcase className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Industry Experience" />
                        </Link> */}
                        <PulseLink component={MdTimeline} href="/experience" className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Experience" speed={0.5} />
                        <Link href="/education" aria-label="Education" className={NAV_LINK}>
                            <FaGraduationCap className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Education" />
                        </Link>
                        <Link href="/projects_publications" prefetch={false} aria-label="Projects and publications" className={NAV_LINK}>
                            <GiBookshelf className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Publications and Projects" />
                        </Link>
                    </nav>

                    {/* Right Icon Links */}
                    <nav aria-label="Contact and links" className="header-slide-right flex items-center justify-center gap-1 sm:gap-2">
                        <Link href="/not-found" prefetch={false} aria-label="Random comic" className={NAV_LINK}>
                            <TbError404 className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Random comic"/>
                        </Link>
                        {/* <Link href="/blog" prefetch={false}>
                            <GiNotebook className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Blog"/>
                        </Link> */}
                        <PulseLink component={GiNotebook} href="/blog" className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Blog" />
                        <a href="/data/CV - Sandesh Bharadwaj.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV (PDF, opens in a new tab)" className={NAV_LINK}>
                            <FaFileDownload className="h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Download CV" />
                        </a>
                        <Link href="https://linkedin.com/in/sandeshbharadwaj97" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={NAV_LINK}>
                            <FaLinkedin className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="LinkedIn" />
                        </Link>
                        <Link href="https://github.com/tensorsofthewall" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={NAV_LINK}>
                            <SiGithub className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Github" />
                        </Link>
                        <Link href="https://x.com/tensorofthewall" target="_blank" rel="noopener noreferrer" aria-label="X (opens in a new tab)" className={NAV_LINK}>
                            <FaXTwitter className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="X/Twitter" />
                        </Link>
                        {/* <Link href="/#contact" className="group flex cursor-pointer items-center">
                            <FaEnvelope className="h-9 w-9 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer fill-gray-400 p-1 sm:p-2 text-xl sm:text-2xl transition-colors hover:fill-gray-300" title="Contact Me"/>
                        </Link> */}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;