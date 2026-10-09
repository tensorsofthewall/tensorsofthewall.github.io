"use client";
import React, { useEffect, useState } from "react";

const getRandomPosition = () => {
    const maxWidth = window.innerWidth / 4;
    const maxHeight = window.innerHeight / 4;
    return {
        x: Math.floor(window.innerWidth / 3 + Math.random() * maxWidth),
        y: Math.floor(window.innerHeight / 3 + Math.random() * maxHeight),
    };
};

const EasterEgg = () => {
    const [showRandomText, setShowRandomText] = useState(false);
    const [showSecondPart, setShowSecondPart] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let cycleTimeout: ReturnType<typeof setTimeout> | undefined;
        let hideTimeout: ReturnType<typeof setTimeout> | undefined;
        let secondPartTimeout: ReturnType<typeof setTimeout> | undefined;

        const cycleText = () => {
            setPosition(getRandomPosition());
            setShowRandomText(true);

            secondPartTimeout = setTimeout(() => setShowSecondPart(true), 8000);

            hideTimeout = setTimeout(() => {
                setShowRandomText(false);
                setShowSecondPart(false);
                cycleTimeout = setTimeout(cycleText, 15000);
            }, 10000);
        };

        const initialDelay = setTimeout(cycleText, 20000);

        return () => {
            clearTimeout(initialDelay);
            clearTimeout(cycleTimeout);
            clearTimeout(hideTimeout);
            clearTimeout(secondPartTimeout);
        };
    }, []);

    return (
        <div className="absolute" style={{ left: position.x, top: position.y, width: '250px', height: '100px' }}>
            <div
                className={`text-white text-small sm:text-small md:text-medium lg:text-lg pointer-events-none transition-opacity duration-[1500ms] ease-in-out ${showRandomText ? "opacity-100" : "opacity-0"}`}
            >
                Oh... you&apos;re still here?<br /> Maybe you&apos;ll see something cool if you refresh the page?
            </div>
            <div
                className={`text-white text-lg pointer-events-none mt-2 transition-opacity duration-[1500ms] ease-in-out ${showSecondPart ? "opacity-100" : "opacity-0"}`}
            >
                Curiosity scales better than models.
            </div>
        </div>
    );
};

export default EasterEgg;
