"use client";
import React from "react";
import { AnimatedText } from "@/components/animatedComponents";

const nameText = "Hello, I'm Sandesh Bharadwaj";
const roleTextOptions = [
  "Deep Learning Researcher and Engineer",
  "I love building intelligent systems",
]


const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full text-3xl font-['sans-serif'] text-white-500">
            <h1>{nameText}</h1>
            <h2><AnimatedText texts={roleTextOptions} typingSpeed={25} deletingSpeed={25} /></h2>
        </div>
    )
}
  

export default Hero;