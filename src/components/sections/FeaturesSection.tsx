import React from "react";
import { Icon } from "../common/Icons";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

const featuresList: FeatureItem[] = [
  {
    title: "Calculate",
    description: "Add, subtract, multiply and divide with the right precision.",
    icon: "calculator",
  },
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
    <section className="relative overflow-hidden bg-[#f8fbfe] py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-100/50 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-100/60 blur-[100px]" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Calculator Visual */}
          <div className="relative mx-auto flex min-h-[390px] w-full max-w-[480px] items-center justify-center sm:min-h-[500px]">
            {/* Decorative Circle */}
            <div className="absolute h-[280px] w-[280px] rounded-full bg-[#edf5fc] sm:h-[380px] sm:w-[380px]" />

            <div className="absolute h-[320px] w-[320px] rounded-full border border-blue-200 sm:h-[430px] sm:w-[430px]" />

            {/* Orbit */}
            <div className="absolute h-[260px] w-[340px] rotate-[-25deg] rounded-[50%] border-2 border-dashed border-blue-300 sm:h-[320px] sm:w-[460px]" />

            {/* Floating Icon - Top */}
            <div className="absolute left-[12%] top-[9%] z-20 flex h-14 w-14 rotate-[-12deg] items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-blue-900/5 sm:left-[8%] sm:top-[8%] sm:h-[72px] sm:w-[72px]">
              <span className="text-[#174f84]">
                <Icon name="atom" size={25} />
              </span>
            </div>

            {/* Floating Icon - Right */}
            <div className="absolute right-[8%] top-[22%] z-20 flex h-14 w-14 rotate-[10deg] items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-blue-900/5 sm:right-[5%] sm:h-[72px] sm:w-[72px]">
              <span className="text-[#2f75bd]">
                <Icon name="round" size={24} />
              </span>
            </div>

            {/* Floating Icon - Left Bottom */}
            <div className="absolute bottom-[16%] left-[5%] z-20 flex h-14 w-14 rotate-[12deg] items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-blue-900/5 sm:bottom-[14%] sm:h-[72px] sm:w-[72px]">
              <span className="text-[#174f84]">
                <Icon name="hash" size={25} />
              </span>
            </div>

            {/* Floating Icon - Bottom Right */}
            <div className="absolute bottom-[8%] right-[12%] z-20 flex h-14 w-14 rotate-[-10deg] items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-blue-900/5 sm:right-[10%] sm:h-[72px] sm:w-[72px]">
              <span className="text-[#2f75bd]">
                <Icon name="copy" size={24} />
              </span>
            </div>

            {/* Calculator */}
            <div className="relative z-10 w-[230px] rotate-[-7deg] rounded-[30px] border-[6px] border-[#0a2b4b] bg-[#edf5fc] p-3 shadow-[0_30px_60px_rgba(10,43,75,0.2)] transition-transform duration-500 hover:rotate-0 sm:w-[270px] sm:rounded-[36px] sm:p-4">
              {/* Display */}
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-5 text-right shadow-inner sm:px-5 sm:py-6">
                <span className="block text-xs font-medium text-slate-400">
                  RESULT
                </span>
                <span className="mt-1 block break-all text-3xl font-bold tracking-tight text-[#0a2b4b] sm:text-4xl">
                  3.1416
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-2.5">
                {[
                  "C",
                  "±",
                  "%",
                  "÷",
                  "7",
                  "8",
                  "9",
                  "×",
                  "4",
                  "5",
                  "6",
                  "−",
                  "1",
                  "2",
                  "3",
                  "+",
                  "0",
                  ".",
                  "=",
                ].map((key, index) => (
                  <div
                    key={index}
                    className={`flex h-11 items-center justify-center rounded-xl border text-base font-bold sm:h-12 sm:text-lg ${
                      key === "="
                        ? "col-span-2 border-[#174f84] bg-[#174f84] text-white shadow-md shadow-blue-900/20"
                        : ["÷", "×", "−", "+"].includes(key)
                          ? "border-[#2f75bd] bg-[#2f75bd] text-white shadow-sm"
                          : "border-slate-200/80 bg-white text-[#0a2b4b] shadow-[0_3px_0_#dbe5f0]"
                    }`}
                  >
                    {key}
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Sparkles */}
            <span className="absolute left-[16%] top-[43%] text-3xl text-blue-400">
              ✦
            </span>
            <span className="absolute right-[15%] bottom-[29%] text-2xl text-sky-400">
              ✦
            </span>
            <span className="absolute left-[27%] bottom-[8%] text-xl text-blue-300">
              ✧
            </span>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full">
            {/* Heading */}
            <div className="mb-8 sm:mb-10">
              <div className="eyebrow mb-3">
                <Icon name="spark" size={12} />
                <span>ALL-IN-ONE TOOLKIT</span>
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0a2b4b] sm:text-4xl lg:text-[46px]">
                Everything in one{" "}
                <span className="text-[#174f84]">calculator</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                Four tools, one clear explanation. Simple tools designed
                to make every calculation easier.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 sm:gap-y-9">
              {featuresList.map((feature) => (
                <div key={feature.title} className="group flex gap-4">
                  {/* Icon Circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-[#edf5fc] text-[#174f84] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#174f84] group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-900/10">
                    <Icon name={feature.icon} size={20} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-bold text-[#0a2b4b] transition-colors group-hover:text-[#174f84] sm:text-lg">
                      {feature.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        {/* <div className="mt-14 border-t border-blue-100 pt-6 sm:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-semibold text-[#174f84] sm:justify-start sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                ✓
              </span>
              Smart
            </span>

            <span className="h-1 w-1 rounded-full bg-blue-300" />

            <span>Accurate</span>

            <span className="h-1 w-1 rounded-full bg-blue-300" />

            <span>Easy to Use</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}