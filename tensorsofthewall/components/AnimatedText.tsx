"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

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
    const [started, setStarted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Hold off the high-frequency typing updates until the browser is idle
    // (i.e. initial hydration is done); fall back to a short timeout.
    useEffect(() => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(() => setStarted(true), { timeout: 2000 });
        return () => window.cancelIdleCallback(id);
      }
      const id = setTimeout(() => setStarted(true), 500);
      return () => clearTimeout(id);
    }, []);

    // Memoize texts to avoid unnecessary re-renders if parent recreates array
    const memoizedTexts = useMemo(() => texts, [texts]);

    useEffect(() => {
      if (!started) return;
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
      started,
      memoizedTexts,
      typingSpeed,
      deletingSpeed,
      delayBeforeDelete,
    ]);

    return <span className="animated-text">{displayText}</span>;
  }
);

AnimatedText.displayName = "AnimatedText";
