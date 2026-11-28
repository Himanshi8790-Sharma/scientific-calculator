import React from "react";
import { Icon } from "../common/Icons";

interface RuleCard {
  id: number;
  title: string;
  description: string;
  digits: { char: string; isSig: boolean }[];
  result: string;
}

const rulesData: RuleCard[] = [
  {
    id: 1,
    title: "Non-zero digits",
    description: "Always count.",
    digits: [
      { char: "1", isSig: true },
      { char: "2", isSig: true },
      { char: "3", isSig: true },
      { char: "4", isSig: true },
    ],
    result: "4 sig figs",
  },
  {
    id: 2,
    title: "Zeros in the middle",
    description: "Zeros between non-zero digits count.",
    digits: [
      { char: "1", isSig: true },
      { char: "0", isSig: true },
      { char: "0", isSig: true },
      { char: "5", isSig: true },
    ],
    result: "4 sig figs",
  },
  {
    id: 3,
    title: "Leading zeros",
    description: "They only place the decimal point.",
    digits: [
      { char: "0", isSig: false },
      { char: ".", isSig: false },
      { char: "0", isSig: false },
      { char: "0", isSig: false },
      { char: "5", isSig: true },
      { char: "2", isSig: true },
    ],
    result: "2 sig figs",
  },
  {
    id: 4,
    title: "Trailing zeros with a point",
    description: "After a decimal point, they count.",
    digits: [
      { char: "2", isSig: true },
      { char: ".", isSig: false },
      { char: "5", isSig: true },
      { char: "0", isSig: true },
    ],
    result: "3 sig figs",
  },
  {
    id: 5,
    title: "Trailing zeros, no point",
    description: "Without a decimal point, they don't count.",
    digits: [
      { char: "1", isSig: true },
      { char: "2", isSig: true },
      { char: "0", isSig: false },
      { char: "0", isSig: false },
    ],
    result: "2 sig figs",
  },
];

export function SigFigRulesSection() {
  return (
    <section className="site-container py-12 ">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="eyebrow mx-auto mb-2.5">
          <Icon name="book" size={12} />
          <span>CORE PRINCIPLES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
          Rules of Significant Figures
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Which digits count? Remember these five.
        </p>
      </div>

      {/* 5 Rules Responsive Grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {rulesData.map((rule) => (
          <div
            key={rule.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div>
              {/* Number Badge with Brand Styling */}
              <div className="mx-auto mb-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5fc] text-xs font-bold text-[#174f84]">
                {rule.id}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-[#0a2b4b] leading-tight min-h-[2.5rem] flex items-center justify-center">
                {rule.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[2rem]">
                {rule.description}
              </p>
            </div>

            <div className="mt-6">
              {/* Visual Digits Badge Row with Brand Blue Tile */}
              <div className="flex items-center justify-center gap-1.5 py-3">
                {rule.digits.map((d, idx) =>
                  d.char === "." ? (
                    <span
                      key={idx}
                      className="px-0.5 text-base font-bold font-mono text-slate-400"
                    >
                      .
                    </span>
                  ) : d.isSig ? (
                    <span
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-[#174f84] font-mono text-xs font-bold text-white shadow-xs"
                    >
                      {d.char}
                    </span>
                  ) : (
                    <span
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center font-mono text-xs font-semibold text-slate-400"
                    >
                      {d.char}
                    </span>
                  ),
                )}
              </div>

              {/* Result Footer */}
              <div className="mt-2 border-t border-slate-100 pt-3 text-xs font-bold text-[#174f84]">
                {rule.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
