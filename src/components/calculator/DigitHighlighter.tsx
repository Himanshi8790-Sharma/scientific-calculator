import React from "react";

interface DigitHighlighterProps {
  value: string;
}

export function DigitHighlighter({ value }: DigitHighlighterProps) {
  const plain = value.toLowerCase().split("e")[0];
  let started = false;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1 text-lg font-mono font-medium">
      {[...plain].map((char, index) => {
        if (/[1-9]/.test(char)) started = true;
        const significant = started && /\d/.test(char);
        return (
          <span
            key={index}
            className={`transition duration-150 ${
              significant
                ? "rounded-md bg-[#d9ebff] px-1.5 py-0.5 text-[#0d559c] font-bold shadow-xs"
                : "px-0.5 text-slate-400"
            }`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
