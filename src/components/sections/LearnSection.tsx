import React from "react";
import type { Page } from "../../types";
import { Icon } from "../common/Icons";

interface GuideItem {
  title: string;
  description: string;
  page: Page;
  icon: string;
}

const guides: GuideItem[] = [
  {
    title: "How to count significant figures",
    description: "Learn the five rules with simple examples and clear explanations.",
    page: "rules",
    icon: "hash",
  },
  {
    title: "Significant figures in addition and subtraction",
    description: "Understand how decimal places determine the final answer.",
    page: "examples",
    icon: "calculator",
  },
  {
    title: "How to round to significant figures",
    description: "Follow a simple method and practice rounding correctly.",
    page: "how-it-works",
    icon: "round",
  },
];

interface LearnSectionProps {
  go: (p: Page) => void;
}

export function LearnSection({ go }: LearnSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-14">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#edf5fc]/70 blur-[100px]" />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mx-auto mb-3">
            <Icon name="book" size={12} />
            <span>LEARN & MASTER</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0a2b4b] sm:text-4xl lg:text-5xl">
            Your learning journey
            <span className="text-[#174f84]"> starts here.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Understand the basics, learn calculation rules and build
            confidence one step at a time.
          </p>
        </div>

        {/* Learning Path */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-[16.66%] right-[16.66%] top-[35px] hidden h-px bg-slate-200 md:block">
            <div className="h-full w-full origin-left animate-[pathFlow_4s_ease-in-out_infinite] bg-gradient-to-r from-[#174f84] via-[#2f75bd] to-[#d9ebff]" />
          </div>

          {/* Guide Steps */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {guides.map((g, index) => (
              <button
                key={g.title}
                onClick={() => go(g.page)}
                className="group relative text-left"
              >
                {/* Mobile Connecting Line */}
                {index !== guides.length - 1 && (
                  <div className="absolute left-[27px] top-[60px] h-[calc(100%+20px)] w-px bg-slate-200 md:hidden" />
                )}

                {/* Step Header */}
                <div className="relative flex items-center gap-4 md:flex-col md:items-start">
                  {/* Number / Icon Circle */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-[#174f84] shadow-sm transition-all duration-500 group-hover:border-[#174f84] group-hover:bg-[#174f84] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-900/10">
                    <Icon name={g.icon} size={21} />

                    {/* Step Number */}
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0a2b4b] text-[9px] font-bold text-white ring-2 ring-white">
                      {index + 1}
                    </span>
                  </div>

                  {/* Mobile Title */}
                  <h3 className="text-lg font-bold leading-snug text-[#0a2b4b] transition-colors group-hover:text-[#174f84] md:mt-6 md:text-xl">
                    {g.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="ml-[72px] mt-2 md:ml-0 md:mt-4">
                  <p className="text-sm leading-7 text-slate-500">
                    {g.description}
                  </p>

                  {/* Link */}
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#174f84]">
                    <span className="relative">
                      Explore guide
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#174f84] transition-all duration-300 group-hover:w-full" />
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <Icon name="arrow" size={14} />
                    </span>
                  </div>
                </div>

                {/* Decorative Step Text */}
                <span className="pointer-events-none absolute right-2 top-0 hidden text-6xl font-black text-slate-100 transition-colors duration-300 group-hover:text-blue-50 md:block">
                  0{index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 flex justify-center border-t border-slate-100 pt-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-[#edf5fc] px-5 py-3 text-center text-xs font-medium text-[#174f84] sm:text-sm">
              <Icon name="spark" size={14} />
              <span>Learn at your own pace</span>
              <span className="mx-1 text-blue-300">•</span>
              <span>Practice as you go</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes pathFlow {
          0% {
            transform: scaleX(0);
            opacity: 0.3;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}