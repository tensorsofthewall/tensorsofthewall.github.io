"use client"
import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { fairyDustCursor, snowflakeCursor } from "cursor-effects";

import { IconType } from "react-icons/lib";

const MotionDiv = dynamic(() => import("motion/react").then((mod) => mod.motion.div), { ssr: false })

export const AnimatedComponent = React.memo(({component: Component, href, className, title, showNew=false, speed=1.0}: {component: IconType, href: Url, className: string, title: string, showNew?: boolean, speed?: number}) => {
    return (
      <div className="relative inline-flex flex-col items-center">
        <Link href = {href} >
        <MotionDiv
            animate={{opacity: [1, 0]}}
            transition={{duration: speed, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
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
});

AnimatedComponent.displayName = "AnimatedComponent";

type AnimatedTextProps = {
  texts?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
};

export const AnimatedText = React.memo(
  ({
    texts = [""],
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBeforeDelete = 2000,
  }: AnimatedTextProps) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize texts to avoid unnecessary re-renders if parent recreates array
    const memoizedTexts = useMemo(() => texts, [texts]);

    useEffect(() => {
      const currentText = memoizedTexts[currentTextIndex];

      if (timerRef.current) clearTimeout(timerRef.current);

      if (isWaiting) {
        timerRef.current = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBeforeDelete);
      } else if (isDeleting) {
        if (displayText.length > 0) {
          timerRef.current = setTimeout(() => {
            setDisplayText(currentText.substring(0, displayText.length - 1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % memoizedTexts.length);
        }
      } else {
        if (displayText.length < currentText.length) {
          timerRef.current = setTimeout(() => {
            setDisplayText(currentText.substring(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          setIsWaiting(true);
        }
      }

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [
      currentTextIndex,
      displayText,
      isDeleting,
      isWaiting,
      memoizedTexts,
      typingSpeed,
      deletingSpeed,
      delayBeforeDelete,
    ]);

    return <span className="animated-text">{displayText}</span>;
  }
);

AnimatedText.displayName = "AnimatedText";

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