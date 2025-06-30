"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { fairyDustCursor, snowflakeCursor } from "cursor-effects";

import { IconType } from "react-icons/lib";

const MotionDiv = dynamic(() => import("motion/react").then((mod) => mod.motion.div), { ssr: false })

export const AnimatedComponent = ({component: Component, href, className, title, showNew=false}: {component: IconType, href: Url, className: string, title: string, showNew?: boolean}) => {
    return (
      <div className="relative inline-flex flex-col items-center">
        <Link href = {href} >
        <MotionDiv
            animate={{opacity: [1, 0]}}
            transition={{duration: 1., repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
        >
            <Component className={className} title={title}/>
            {showNew && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full shadow z-10">
                New!
              </span>
            )}
        </MotionDiv>
        </Link>
        </div>
    )
}

export const AnimatedText = ({ texts = [""], typingSpeed = 100, deletingSpeed = 50, delayBeforeDelete = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
  
    useEffect(() => {
      let timer;
      const currentText = texts[currentTextIndex];
  
      if (isWaiting) {
        timer = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBeforeDelete);
      } else if (isDeleting) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText.length === 1) {
            setIsDeleting(false);
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText.length === currentText.length) {
            setIsWaiting(true);
          }
        }, typingSpeed);
      }
  
      return () => clearTimeout(timer);
    }, [currentTextIndex, displayText, isDeleting, isWaiting, texts, typingSpeed, deletingSpeed, delayBeforeDelete]);
  
    return <span className="animated-text">{displayText}</span>;
  };

  export function AnimatedCursor() {
    useEffect(() => {
      const date = new Date();
      if (date.getMonth() === 11 || date.getMonth() === 0) {
        snowflakeCursor();
      } else {
        fairyDustCursor({
          colors: ["#1E90FF", "#00CED1", "#7FFF00","#FFD700","#FF5E00"],
        });
      }
    }, []);
  
    return null;
  }