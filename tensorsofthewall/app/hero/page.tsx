"use client";
import React, { useState, useEffect} from "react";
import { AnimatedText } from "@/components/animatedComponents";
import NeuralNetwork from "@/components/nn";
import { motion } from "motion/react";

const pageStartText = "A place where I pretend to know everything about AI and hope no one notices the sarcasm." //Welcome to my corner of the internet—where buzzwords meet reality, and every pixel is hand-placed with mild overthinking. Feel free to scroll responsibly."

const captionText = "Who needs all their neurons anyway? This network’s motto: ‘Do less, compute more'.";
const captionSubText = "And yeah, I know this isn't quite dropout regularization, but it looks cool.\n [Don't bother suing, it'd be like asking Zaphod Beeblebrox for directions.]";

const animatedTextOptions = [
    "Software Engineering 🛠️",
    "Autonomous Systems 🧠",
    "Computer Vision 👁️",
    "Generative AI 🤖",
]

const Hero = () => {
    const [layerSizes, setLayerSizes] = useState([4,8,12,10,3]);
    const [showRandomText, setShowRandomText] = useState(false);
    const [showSecondPart, setShowSecondPart] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const generateRandomPosition = () => {
        const maxWidth = window.innerWidth/4;
        const maxHeight = window.innerHeight/4;
        return {
            x: Math.floor(window.innerWidth/3+ Math.random() * maxWidth),
            y: Math.floor(window.innerHeight/3+ Math.random() * maxHeight)
        };
    };

    useEffect(() => {
        const generateRandomLayers = () => {
            const numLayers = Math.floor(Math.random() * 4) + 4;
            const newLayerSizes = Array(numLayers).fill(0).map(() => 
                Math.floor(Math.random() * 10) + 3
            );
            setLayerSizes(newLayerSizes);
        };

        generateRandomLayers();

        const initialDelay = setTimeout(() => {
            const cycleText = () => {
                const newPosition = generateRandomPosition();
                setPosition(newPosition);
                setShowRandomText(true);
                
                // Show second part after 2 seconds
                setTimeout(() => {
                    setShowSecondPart(true);
                }, 8000);

                // Hide both parts
                setTimeout(() => {
                    setShowRandomText(false);
                    setShowSecondPart(false);
                    
                    setTimeout(cycleText, 15000);
                }, 10000);
            };

            cycleText();
        }, 20000);

        return () => clearTimeout(initialDelay);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center w-full text-medium sm:text-large md:text-xl lg:text-2xl text-white-500">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '440px', paddingTop: '10px'}} >
                <strong className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px]">{pageStartText}<br/><br/>I work in: <AnimatedText texts={animatedTextOptions} typingSpeed={25} deletingSpeed={25} delayBeforeDelete={4000} /></strong>
            </div>
            <div style={{ transform: 'translateY(-35px)' }} className="flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
                <NeuralNetwork layerSizes={layerSizes} />
            </div>

            <h1 style={{ fontSize: '18px', transform: 'translateY(-65px)'}} className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px]"> {captionText}</h1>
            
            <div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ transform: 'translateY(-55px)', textAlign: 'center', alignItems: 'center'}}>
                <h1 style={{ fontSize: '16px', width: '350px', whiteSpace: 'pre-line'}}>{captionSubText}</h1>
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
                    Oh... you&apos;re still here?<br/> Maybe you&apos;ll see something cool if you refresh the page?
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