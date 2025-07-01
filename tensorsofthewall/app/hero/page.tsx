"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatedText } from "@/components/animatedComponents";
import NeuralNetwork from "@/components/nn";
import { motion } from "motion/react";

const pageStartText = "A place where I pretend to know everything about AI and hope no one notices the sarcasm.";
const captionText = "Who needs all their neurons anyway? This network’s motto: ‘Do less, compute more'.";
const captionSubText = "And yeah, I know this isn't quite dropout regularization, but it looks cool.\n [Don't bother suing, it'd be like asking Zaphod Beeblebrox for directions.]";

const animatedTextOptions = [
    "Software Engineering 🛠️",
    "Autonomous Systems 🧠",
    "Computer Vision 👁️",
    "Generative AI 🤖",
];

const getRandomLayerSizes = () => {
    const numLayers = Math.floor(Math.random() * 4) + 4;
    return Array.from({ length: numLayers }, () => Math.floor(Math.random() * 10) + 3);
};

const getRandomPosition = () => {
    const maxWidth = window.innerWidth / 4;
    const maxHeight = window.innerHeight / 4;
    return {
        x: Math.floor(window.innerWidth / 3 + Math.random() * maxWidth),
        y: Math.floor(window.innerHeight / 3 + Math.random() * maxHeight),
    };
};

const Hero = () => {
    const [layerSizes, setLayerSizes] = useState(() => getRandomLayerSizes());
    const [showRandomText, setShowRandomText] = useState(false);
    const [showSecondPart, setShowSecondPart] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const cycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const secondPartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize the random position generator
    const generateRandomPosition = useCallback(() => getRandomPosition(), []);

    // Memoize the random layer generator
    const generateRandomLayers = useCallback(() => setLayerSizes(getRandomLayerSizes()), []);

    useEffect(() => {
        generateRandomLayers();

        const cycleText = () => {
            setPosition(generateRandomPosition());
            setShowRandomText(true);

            secondPartTimeoutRef.current = setTimeout(() => {
                setShowSecondPart(true);
            }, 8000);

            hideTimeoutRef.current = setTimeout(() => {
                setShowRandomText(false);
                setShowSecondPart(false);

                cycleTimeoutRef.current = setTimeout(cycleText, 15000);
            }, 10000);
        };

        const initialDelay = setTimeout(cycleText, 20000);

        return () => {
            clearTimeout(initialDelay);
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            if (secondPartTimeoutRef.current) clearTimeout(secondPartTimeoutRef.current);
        };
    }, [generateRandomLayers, generateRandomPosition]);

    return (
        <div className="flex flex-col items-center justify-center text-center w-full text-medium sm:text-large md:text-xl lg:text-2xl text-white-500">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '440px', paddingTop: '10px'}} >
                <strong className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px]">
                    {pageStartText}
                    <br /><br />
                    I work in: <AnimatedText texts={animatedTextOptions} typingSpeed={25} deletingSpeed={25} delayBeforeDelete={4000} />
                </strong>
            </div>
            <div style={{ transform: 'translateY(-35px)' }} className="flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
                <NeuralNetwork layerSizes={layerSizes} />
            </div>
            <h1 style={{ fontSize: '18px', transform: 'translateY(-65px)' }} className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px]">
                {captionText}
            </h1>
            <div className="blur-sm hover:blur-none transition-all duration-300"
                style={{ transform: 'translateY(-55px)', textAlign: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '16px', width: '350px', whiteSpace: 'pre-line' }}>{captionSubText}</h2>
            </div>
            <div className="absolute" style={{ left: position.x, top: position.y, width: '250px', height: '100px' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: showRandomText ? 1 : 0
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                    className="text-white text-small sm:text-small md:text-medium lg:text-lg pointer-events-none"
                >
                    Oh... you&apos;re still here?<br /> Maybe you&apos;ll see something cool if you refresh the page?
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: showSecondPart ? 1 : 0
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                    className="text-white text-lg pointer-events-none mt-2"
                >
                    Buddy, you need a hobby.
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;