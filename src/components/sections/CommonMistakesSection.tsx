import React from "react";
import { Icon } from "../common/Icons";

const mistakes = [
  {
    title: "Counting leading zeros",
    example: "0.0052 has 2 significant figures, not 4.",
    number: "01",
  },
  {
    title: "Dropping trailing zeros",
    example: "2.50 has 3 significant figures, not 2.",
    number: "02",
  },
  {
    title: "Rounding too early",
    example: "Round only at the very end of a calculation.",
    number: "03",
  },
  {
    title: "Copying every calculator digit",
    example: "2.5 × 3.42 shows 8.55, but the answer is 8.6.",
    number: "04",
  },
];

export function CommonMistakesSection() {
  return (
    <section className="relative overflow-hidden  py-16 sm:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-sky-100/70 blur-[100px]" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left Heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="eyebrow mb-3">
              <Icon name="info" size={12} />
              <span>PITFALLS TO AVOID</span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0a2b4b] sm:text-4xl lg:text-5xl">
              Small mistakes.
              <span className="block text-[#174f84]">Big difference.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              Avoid these common mistakes to get accurate results every
              time. Knowing what not to do is just as important as knowing
              the rules.
            </p>

            {/* Animated Warning */}
            <div className="mt-8 flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#174f84]/20" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#edf5fc] text-[#174f84] ring-1 ring-blue-200">
                  <Icon name="info" size={20} />
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-[#0a2b4b]">
                  Pay attention to precision
                </p>
                <p className="text-xs text-slate-500">
                  Check before you submit.
                </p>
              </div>
            </div>
          </div>

          {/* Right Timeline */}
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-[23px] top-6 h-[calc(100%-48px)] w-px bg-slate-200 sm:left-[27px]">
              <div className="h-full w-full origin-top animate-[growLine_3s_ease-in-out_infinite_alternate] bg-gradient-to-b from-[#174f84] via-[#2f75bd] to-transparent" />
            </div>

            <div className="space-y-5">
              {mistakes.map((m, index) => (
                <div
                  key={m.title}
                  className="group relative flex gap-5 sm:gap-7"
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-white text-xs font-bold text-[#174f84] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-[#174f84] group-hover:bg-[#174f84] group-hover:text-white sm:h-14 sm:w-14">
                      {m.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 border-b border-slate-200 pb-6 pt-1 transition-all duration-300 group-hover:border-blue-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#0a2b4b] transition-colors group-hover:text-[#174f84] sm:text-lg">
                        {m.title}
                      </h3>

                      <span className="rounded-full bg-[#edf5fc] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#174f84] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Avoid this
                      </span>
                    </div>

                    {/* Example Highlight */}
                    <div className="mt-3 rounded-xl bg-white/80 px-4 py-3 transition-all duration-300 group-hover:bg-[#edf5fc]/80">
                      <p className="text-sm leading-6 text-slate-600 transition-colors group-hover:text-[#0a2b4b]">
                        {m.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes growLine {
          from {
            transform: scaleY(0.3);
            opacity: 0.4;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}