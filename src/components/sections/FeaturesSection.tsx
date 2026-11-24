import React from "react";
import { Icon } from "../common/Icons";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

const featuresList: FeatureItem[] = [
  {
    title: "Count",
    description: "See which digits count, one tile at a time.",
    icon: "hash",
  },
  {
    title: "Round",
    description: "Round to any number of significant figures.",
    icon: "round",
  },
  {
    title: "Calculate",
    description: "Add, subtract, multiply and divide with the right precision.",
    icon: "calculator",
  },
  {
    title: "Scientific notation",
    description: "Convert numbers like 0.004560 in one tap.",
    icon: "atom",
  },
  {
    title: "Step-by-step reasoning",
    description: "Every answer explains the rule behind it.",
    icon: "book",
  },
  {
    title: "Copy result",
    description: "Copy the answer and paste it into your work.",
    icon: "copy",
  },
];

export function FeaturesSection() {
  return (
    <section className="site-container py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="eyebrow mx-auto mb-2.5">
          <Icon name="spark" size={12} />
          <span>ALL-IN-ONE TOOLKIT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
          Everything in one calculator
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Four tools, one clear explanation.
        </p>
      </div>

      {/* 6 Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuresList.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5fc] text-[#174f84] transition duration-300 group-hover:bg-[#174f84] group-hover:text-white">
                <Icon name={f.icon} size={17} />
              </span>
              <h3 className="text-base font-bold text-[#0a2b4b] group-hover:text-[#174f84] transition-colors">
                {f.title}
              </h3>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
