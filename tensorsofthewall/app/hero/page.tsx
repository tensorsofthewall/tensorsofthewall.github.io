import React from "react";
import { AnimatedText } from "@/components/AnimatedText";
import HeroNetwork from "@/components/HeroNetwork";
import EasterEgg from "@/components/EasterEgg";

const pageStartText = "A place where I convince neural networks that pixels mean something.";
const captionText = "Who needs all their neurons anyway? This network’s motto: ‘Do less, compute more'.";
const captionSubText = "This isn't quite dropout regularization, but it looks cool.\n";

const animatedTextOptions = [
    "Computer Vision 👁️",
    "Multimodal Learning 🧠",
    "Autonomous Systems 🚗",
    "Distributed AI ⚡",
];

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full text-medium sm:text-large md:text-xl lg:text-2xl text-white-500">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '440px', maxWidth: 'calc(100vw - 2rem)', paddingTop: '10px'}} >
                <strong className="w-[400px] max-w-[calc(100vw-2rem)] sm:w-[400px] md:w-[450px] lg:w-[500px]">
                    {pageStartText}
                    <br /><br />
                    I work on: <AnimatedText texts={animatedTextOptions} typingSpeed={25} deletingSpeed={25} delayBeforeDelete={4000} />
                </strong>
            </div>
            <div style={{ transform: 'translateY(-35px)' }} className="flex justify-center items-center h-[min(400px,calc(100vw-2rem))] sm:h-[450px] md:h-[500px] lg:h-[550px]">
                <HeroNetwork />
            </div>
            <h1 style={{ fontSize: '18px', transform: 'translateY(-65px)' }} className="w-[400px] max-w-[calc(100vw-2rem)] sm:w-[400px] md:w-[450px] lg:w-[500px]">
                {captionText}
            </h1>
            <div className="blur-sm hover:blur-none transition-all duration-300"
                style={{ transform: 'translateY(-55px)', textAlign: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '16px', width: '350px', maxWidth: 'calc(100vw - 2rem)', whiteSpace: 'pre-line' }}>{captionSubText}</h2>
            </div>
            <EasterEgg />
        </div>
    );
};

export default Hero;