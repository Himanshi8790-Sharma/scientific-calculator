import React from "react";
import { Icon } from "../common/Icons";

const steps = [
  {
    step: 1,
    title: "Type your number",
    description:
      "Any number works: decimals, whole numbers or scientific notation like 6.022e23.",
    icon: "hash",
  },
  {
    step: 2,
    title: "See the answer",
    description:
      "Counted digits turn green and ignored zeros turn grey, so you see the answer at a glance.",
    icon: "spark",
  },
  {
    step: 3,
    title: "Learn why",
    description:
      "Every result comes with short, plain steps, so you understand the rule and not just the number.",
    icon: "book",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-gradient-to-b from-[#f8fbfe] via-white to-[#f5f9fd] py-12 sm:py-16 border-y border-blue-100/50">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow mx-auto mb-2.5">
            <Icon name="atom" size={12} />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
            Three steps. No learning curve.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Intuitive workflow designed for accuracy and speed.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  {/* Step Number Badge */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#edf5fc] text-xs font-bold text-[#174f84] shadow-xs group-hover:bg-[#174f84] group-hover:text-white transition-colors duration-300">
                    0{s.step}
                  </span>
                  <span className="text-slate-400 group-hover:text-[#2f75bd] transition-colors">
                    <Icon name={s.icon} size={16} />
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0a2b4b] group-hover:text-[#174f84] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* Progress indicator bar */}
              <div className="mt-6 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2f75bd] to-[#60a5e8]"
                  style={{ width: `${(s.step / 3) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
