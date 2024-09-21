// app/components/Home.tsx
"use client";
import { useState, useEffect } from "react";
import NavLayout from '../app/components/navlayout';

const nameText = "Hello, I'm Sandesh Bharadwaj";
const roleTextOptions = [
  "Machine Learning Researcher and Engineer.",
  "I love building cool stuff.",
]

const Home = () => {
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(true);
    const [currentRoleText, setCurrentRoleText] = useState(roleTextOptions[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (typing) {
                if (text.length < currentRoleText.length) {
                    setText(prevText => prevText + currentRoleText.charAt(text.length));
                } else {
                    setTyping(false);
                }
            } else {
                if (text.length > 0) {
                    setText(prevText => prevText.slice(0, -1));
                } else {
                    setTimeout(() => {
                        const nextRoleTextIndex = (roleTextOptions.indexOf(currentRoleText) + 1) % roleTextOptions.length;
                        setCurrentRoleText(roleTextOptions[nextRoleTextIndex]);
                        setText('')
                        setTyping(true);
                    }, 149);
                }
            }
        }, 50);

        return () => clearInterval(interval);
    }, [text, typing, currentRoleText]);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 sm:items-start justify-center z-10">
                <h1 className="text-3xl sm:text-5xl">{nameText}</h1>
                <h2 className="text-3xl sm:text-3xl whitespace-pre-wrap min-h-[35px]">{text}</h2>
            </main>
        </div>
    );
}

export default () => {
    return (
    <Home />
    )
};