"use client";
import { useEffect } from "react";
import { fairyDustCursor, snowflakeCursor } from "cursor-effects";

export default function AnimatedCursor() {
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