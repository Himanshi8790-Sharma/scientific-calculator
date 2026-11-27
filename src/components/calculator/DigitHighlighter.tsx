import React from "react";

interface DigitHighlighterProps {
  value: string;
}

export function DigitHighlighter({ value }: DigitHighlighterProps) {
  const plain = value.toLowerCase().split("e")[0];
  const hasDecimal = plain.includes(".");
  const firstNonZero = plain.search(/[1-9]/);
  const lastNonZero = plain.search(/[1-9](?!.*[1-9])/);
  const dotIndex = plain.indexOf(".");

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1 font-mono text-base sm:text-lg font-medium max-w-full overflow-hidden break-all min-w-0">
      {[...plain].map((char, index) => {
        let significant = false;
        if (/\d/.test(char)) {
          if (firstNonZero === -1) {
            // Pure zeros e.g. "0.00" or "0"
            significant = hasDecimal ? index > dotIndex : true;
          } else if (index >= firstNonZero) {
            if (hasDecimal) {
              significant = true;
            } else {
              significant = index <= lastNonZero;
            }
          }
        }

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
