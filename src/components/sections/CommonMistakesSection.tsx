import React from "react";
import { Icon } from "../common/Icons";

const mistakes = [
  {
    title: "Counting leading zeros",
    example: "0.0052 has 2 significant figures, not 4.",
  },
  {
    title: "Dropping trailing zeros",
    example: "2.50 has 3 significant figures, not 2.",
  },
  {
    title: "Rounding too early",
    example: "Round only at the very end of a calculation.",
  },
  {
    title: "Copying every calculator digit",
    example: "2.5 × 3.42 shows 8.55, but the answer is 8.6.",
  },
];

export function CommonMistakesSection() {
  return (
    <section className="site-container py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="eyebrow mx-auto mb-2.5">
          <Icon name="info" size={12} />
          <span>PITFALLS TO AVOID</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
          Common mistakes
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Four slips that cost marks.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="mt-12 mx-auto max-w-4xl grid grid-cols-1 gap-5 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div
            key={m.title}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#edf5fc] text-[#174f84] transition-colors group-hover:bg-[#174f84] group-hover:text-white">
                  <Icon name="info" size={16} />
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0a2b4b]">
                  {m.title}
                </h3>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {m.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
