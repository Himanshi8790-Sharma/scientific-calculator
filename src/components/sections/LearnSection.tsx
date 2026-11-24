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
    description: "The five rules, with examples.",
    page: "rules",
    icon: "hash",
  },
  {
    title: "Significant figures in addition and subtraction",
    description: "Why decimal places decide the answer.",
    page: "examples",
    icon: "calculator",
  },
  {
    title: "How to round to significant figures",
    description: "A step-by-step method with practice.",
    page: "how-it-works",
    icon: "round",
  },
];

interface LearnSectionProps {
  go: (p: Page) => void;
}

export function LearnSection({ go }: LearnSectionProps) {
  return (
    <section className="site-container py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="eyebrow mx-auto mb-2.5">
          <Icon name="book" size={12} />
          <span>LEARN & MASTER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
          Learn more
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Short guides, written plainly.
        </p>
      </div>

      {/* 3 Guide Cards Responsive */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {guides.map((g) => (
          <button
            key={g.title}
            onClick={() => go(g.page)}
            className="group flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 text-left shadow-xs border border-slate-200/80 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5fc] text-[#174f84] transition duration-300 group-hover:scale-105 group-hover:bg-[#174f84] group-hover:text-white">
                <Icon name={g.icon} size={18} />
              </div>

              <h3 className="text-base font-bold text-[#0a2b4b] group-hover:text-[#174f84] transition-colors leading-snug">
                {g.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {g.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#185891] group-hover:underline">
              <span>Read guide</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
