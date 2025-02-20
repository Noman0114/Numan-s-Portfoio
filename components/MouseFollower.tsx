"use client";

import { useEffect, useState } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed z-50 h-8 w-8 rounded-full border border-white/40 transition-transform duration-300 ease-out transform-gpu ${
          isHovering ? "scale-150 filter blur-sm" : ""
        }`}
        style={{
          transform: `translate(${position.x - 16}px, ${
            position.y - 16
          }px) scale(1.2)`,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div
        className={`pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-white transition-transform duration-300 ease-out transform-gpu ${
          isHovering ? "scale-200 filter blur-sm" : ""
        }`}
        style={{
          transform: `translate(${position.x - 4}px, ${
            position.y - 4
          }px) scale(1.5)`,
          boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
        }}
      />
    </>
  );
};

export default MouseFollower;
