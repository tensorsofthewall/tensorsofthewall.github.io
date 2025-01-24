import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HiLightBulb } from "react-icons/hi";
import { Url } from "next/dist/shared/lib/router/router";

const MotionDiv = dynamic(() => import("motion/react").then((mod) => mod.motion.div), { ssr: false })

export const AnimatedLightBulb = ({href, className, title}: {href: Url, className: string, title: string}) => {
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