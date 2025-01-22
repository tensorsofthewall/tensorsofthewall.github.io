"use client";
/* General Package Imports */
import Link from "next/link";

/* Asset Imports */
import ProfileImg from "../public/images/tensorsofthewall.webp" 
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { GiOnTarget } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";

// import NeuralNetwork from "./nn";
import { Url } from "next/dist/shared/lib/router/router";

import dynamic from "next/dynamic";

// To prevent hydration issues
const NeuralNetwork = dynamic(() => import("./nn"), { ssr: false });
const MotionDiv = dynamic(() => import("motion/react").then((mod) => mod.motion.div), { ssr: false });


const AnimatedLightBulb = ({href, className, title}: {href: Url, className: string, title: string}) => {
    return (
        <Link href = {href} >
        <MotionDiv
            animate={{opacity: [1, 0]}}
            transition={{duration: 1., repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
        >
            <HiLightBulb className={className} title={title}/>
        </MotionDiv>
        </Link>
    )
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 mx-auto flex max-w-7xl flex-col items-center justify-center bg-zinc-925 p-2 pt-4">
            <div id="wrapper" className="flex flex-col items-center w-full">
                <h1 className="text-4xl font-bold text-white-500 tracking-tight mb-2 font-['Orbitron'] drop-shadow-sm">
                    tensors of the wall
                </h1>
                <div style={{ height: '36vh' }} className="flex justify-center items-center pt-1">
                    <NeuralNetwork layerSizes={[4,8,12,10,3]} />
                </div>
                <div className="flex justify-between w-full">
                    {/* Left Icon Links */}
                    <MotionDiv 
                        initial={{ opacity: 0, x: -500, y: -75}} 
                        animate={{ opacity: 1, x: 0, y: -75 }} 
                        transition={{ type:"spring", bounce: 0.45, duration: 1.0 }} 
                        className="flex items-center"
                    >
                        <Link href="/#hero">
                            <FaHome className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Go home" />
                        </Link>
                        <Link href="/#skills">
                            <GiOnTarget className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Projects" />
                        </Link>
                        <AnimatedLightBulb href="/#research-exp" className="h-12 w-12 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Research Experience" />
                        <Link href="/#industry-exp">
                            <FaBriefcase className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Industry Experience" />
                        </Link>
                        <Link href="/#education">
                            <FaGraduationCap className="h-12 w-12 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Education" />
                        </Link>
                        
                    </MotionDiv>

                    {/* Right Icon Links */}
                    <MotionDiv 
                        initial={{ opacity: 0, x: 500, y: -75 }} 
                        animate={{ opacity: 1, x: 0, y: -75 }} 
                        transition={{ type:"spring", bounce: 0.45, duration: 1.0 }} 
                        className="flex items-center"
                    >
                        <Link href="/#blog">
                            <GiNotebook className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Blog" />
                        </Link>
                        <a href="https://linkedin.com/in/sandeshbharadwaj97" target="_blank">
                            <SiLinkedin className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="LinkedIn" />
                        </a>
                        <a href="https://github.com/tensorsofthewall" target="_blank">
                            <SiGithub className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Github" />
                        </a>
                        <a href="https://x.com/tensorofthewall" target="_blank">
                            <FaXTwitter className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="X/Twitter" />
                        </a>
                        <Link href="/#contact" className="group flex cursor-pointer items-center">
                            <FaEnvelope className="h-11 w-11 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300" title="Contact Me"/>
                        </Link>
                    </MotionDiv>
                </div>
            </div>
        </header>
    );
}

export default Header;