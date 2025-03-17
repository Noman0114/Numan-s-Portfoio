"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

const BentoGrid = ({ className, children }: BentoGridProps) => {
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

interface BentoGridItemProps {
  className?: string;
  id: number;
  title?: ReactNode;
  description?: ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  colSpan?: number;
  rowSpan?: number;
}

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
}: BentoGridItemProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine grid span classes based on id
  const getGridSpanClasses = () => {
    switch (id) {
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
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        height: id === 4 ? "auto" : "100%",
        minHeight: "180px",
        width: "100%",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full w-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={title?.toString() || ""}
              className={cn(
                imgClassName,
                "object-cover object-center w-full h-full"
              )}
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

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full flex flex-col p-5 lg:p-6",
            "justify-between"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-2xl xl:text-3xl max-w-96 font-bold z-10 mt-2">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
