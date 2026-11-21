import React from "react";
import { Icon } from "./Icons";

interface LogoProps {
  onClick: () => void;
  dark?: boolean;
}

export function Logo({ onClick, dark = false }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 group focus:outline-none"
      aria-label="SigFig Calculator Home"
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl transition duration-200 shadow-sm group-hover:-rotate-3 ${
          dark ? "bg-white text-[#123f73]" : "bg-[#123f73] text-white"
        }`}
      >
        <span className="font-bold text-[15px] tracking-tight">Sf</span>
      </span>
      <div className="flex flex-col text-left">
        <span
          className={`text-[19px] font-semibold tracking-[-.03em] ${
            dark ? "text-white" : "text-[#102e50]"
          }`}
        >
          SigFig<span className="text-[#2f75bd]">Lab</span>
        </span>
      </div>
    </button>
  );
}
