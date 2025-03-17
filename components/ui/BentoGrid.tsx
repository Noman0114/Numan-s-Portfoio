"use client";
import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 mx-auto w-full max-w-full overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  colSpan = 1,
  rowSpan = 1,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  colSpan?: number;
  rowSpan?: number;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["NodeJS", "NextJS", "RestAPI"];

  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      const text = "numanahmad0114@gmail.com";
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  // Determine grid span classes based on id
  const getGridSpanClasses = () => {
    switch (id) {
      // case 1: // Main laptop image
      //   return "col-span-full md:col-span-4 lg:col-span-4 w-full ";
      case 2: // Globe
        return "md:col-span-2 lg:col-span-2";
      case 3: // Tech stack
        return "md:col-span-2 lg:col-span-2";
      case 4: // Tech enthusiast
        return "md:col-span-4 lg:col-span-4";
      case 5: // Code snippet
        return "md:col-span-2 lg:col-span-2";
      case 6: // Email contact
        return "md:col-span-2 lg:col-span-2";
      default:
        return `md:col-span-${colSpan} lg:col-span-${colSpan}`;
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        getGridSpanClasses(),
        id === 1 ? "mx-auto" : "",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        height: id === 1 ? "500px" : id === 4 ? "auto" : "100%",
        minHeight: id === 1 ? "500px" : "180px",
        width: "100%",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full w-full`}>
        <div className={`w-full h-full absolute ${id === 1 ? "inset-0" : ""}`}>
          {img && (
            <img
              src={img}
              alt={title?.toString() || ""}
              className={cn(
                imgClassName,
                "object-cover object-center w-full h-full",
                id === 1 ? "object-contain md:object-cover" : ""
              )}
              style={id === 1 ? { objectPosition: "center" } : {}}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 ? "w-full opacity-80" : ""
          }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && isMounted && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full flex flex-col p-5 lg:p-6",
            id === 1 ? "justify-end" : "justify-between"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-2xl xl:text-3xl max-w-96 font-bold z-10 mt-2 ${
              id === 1 ? "lg:text-4xl" : ""
            }`}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && isMounted && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 top-1/2 transform -translate-y-1/2">
              {/* tech stack lists */}
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-5">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-3 lg:px-3 py-2 px-3 text-xs lg:text-sm opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-3 lg:px-3 py-3 px-3 rounded-lg text-center bg-[#10132E] opacity-0"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-5">
                <span className="lg:py-3 lg:px-3 py-3 px-3 rounded-lg text-center bg-[#10132E] opacity-0"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-3 lg:px-3 py-2 px-3 text-xs lg:text-sm opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && isMounted && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                {isMounted && (
                  <Lottie options={defaultOptions} height={150} width={300} />
                )}
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
