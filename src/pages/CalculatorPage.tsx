import React from "react";
import { PageHero } from "../components/common/PageHero";
import { Calculator } from "../components/calculator/Calculator";
import { Icon } from "../components/common/Icons";

export function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="Calculate with confidence"
        text="Count, round, convert, or perform operations—all with transparent, step-by-step reasoning."
        icon={<Icon name="calculator" size={14} />}
      />    

      <main className="site-container -mt-10 relative z-10">
        <Calculator />

     <div className="mt-14 grid gap-6 md:grid-cols-3">
  {[
    {
      title: "Accurate by design",
      desc: "Standard scientific conventions and uncertainty guidelines applied consistently.",
      icon: "target",
      number: "01",
    },
    {
      title: "Built for learning",
      desc: "Every calculation displays a step-by-step deduction of the exact rule used.",
      icon: "book",
      number: "02",
    },
    {
      title: "100% Private & local",
      desc: "All calculations happen locally in your browser. No cookies, tracking, or remote storage.",
      icon: "shield",
      number: "03",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
    >
      {/* Decorative number */}
      <span className="pointer-events-none absolute right-5 top-4 text-5xl font-semibold tracking-tighter text-slate-100 transition-colors duration-300 group-hover:text-blue-50">
        {item.number}
      </span>

      {/* Icon */}
      <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 text-[#17446b] ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-105 group-hover:from-[#0b2d4d] group-hover:to-[#164b73] group-hover:text-white group-hover:ring-transparent">
        <Icon name={item.icon} size={20} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold tracking-tight text-[#102e50]">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {item.desc}
      </p>

      {/* Bottom accent */}
      <div className="mt-6 h-1 w-10 rounded-full bg-blue-100 transition-all duration-300 group-hover:w-16 group-hover:bg-[#17446b]" />
    </div>
  ))}
</div>
      </main>
    </>
  );
}
