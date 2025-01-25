"use client";
import React from "react";
import { AnimatedText } from "@/components/animatedComponents";
import NeuralNetwork from "@/components/nn";

const nameText = "";
const roleTextOptions = [
  "Deep Learning Researcher and Engineer",
  "I work on Intelligent Systems 🧠",
  "Autonomous Systems 🤖",
  "Computer Vision "
]


const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full text-3xl font-['sans-serif'] text-white-500">
            <div style={{ height: '60vh' }} className="flex justify-center items-center pt-1">
                <NeuralNetwork layerSizes={[4,8,12,10,3]} />
            </div>
            <h1>Who dis? {nameText}</h1>
            <h2><AnimatedText texts={roleTextOptions} typingSpeed={25} deletingSpeed={25} /></h2>
        </div>
    )
}
  

export default Hero;