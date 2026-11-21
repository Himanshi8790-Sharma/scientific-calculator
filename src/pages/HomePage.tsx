import React from "react";
import type { Page } from "../types";
import { Icon } from "../components/common/Icons";
import { Calculator } from "../components/calculator/Calculator";
import { CtaSection } from "../components/sections/CtaSection";

interface HomePageProps {
  go: (p: Page) => void;
}

export function HomePage({ go }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f5f9fd]">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="site-container relative grid items-center gap-12 py-16 lg:grid-cols-[.88fr_1.12fr] lg:py-24">
          <div>
            <div className="eyebrow">
              <Icon name="spark" size={15} />
              <span>Precise answers, clearly explained</span>
            </div>
            <h1 className="mt-6 max-w-2xl text-[42px] font-semibold leading-[1.08] tracking-[-.045em] text-[#0a2b4b] sm:text-[56px]">
              Significant figures, made <span className="text-[#2f75bd]">simple.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Count, round, and calculate with confidence. Get instant results plus the reasoning behind every answer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go("calculator")}
                className="button-primary px-6 py-3 shadow-md"
              >
                <Icon name="calculator" size={18} />
                <span>Start calculating</span>
                <Icon name="arrow" size={17} />
              </button>
              <button
                onClick={() => go("rules")}
                className="button-secondary px-6 py-3"
              >
                <Icon name="book" size={18} />
                <span>Learn the rules</span>
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="text-emerald-600">
                  <Icon name="check" size={15} />
                </span>
                No sign-up needed
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="text-emerald-600">
                  <Icon name="check" size={15} />
                </span>
                Step-by-step reasoning
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="text-emerald-600">
                  <Icon name="check" size={15} />
                </span>
                100% Free & private
              </span>
            </div>
          </div>

          <Calculator compact />
        </div>
      </section>

      {/* Workflow Features Grid */}
      <section className="site-container py-20">
        <div className="section-heading">
          <div className="eyebrow mx-auto">One tool, every workflow</div>
          <h2>Everything you need for accurate answers</h2>
          <p>
            Choose the mode that matches your problem. Each one shows the logic, not just the result.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              title: "Count sig figs",
              text: "Identify exactly which digits communicate measured precision.",
              example: "0.00450 → 3 sig figs",
              icon: "hash",
            },
            {
              n: "02",
              title: "Round values",
              text: "Round any number cleanly without losing intended precision.",
              example: "12.378 → 12.4 (3 s.f.)",
              icon: "round",
            },
            {
              n: "03",
              title: "Calculate",
              text: "Apply precision propagation rules to all standard mathematical operations.",
              example: "4.5 × 2.31 → 10",
              icon: "calculator",
            },
            {
              n: "04",
              title: "Convert notation",
              text: "Convert seamlessly between decimal and scientific exponential form.",
              example: "45,200 → 4.52 × 10⁴",
              icon: "atom",
            },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => go("calculator")}
              className="feature-card text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#4482bd]">{item.n}</span>
                <span className="text-slate-400 group-hover:text-[#174f84] transition">
                  <Icon name={item.icon} size={16} />
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="mt-5 rounded-xl bg-[#f5f8fc] px-3 py-2.5 font-mono text-xs font-medium text-[#315b83]">
                {item.example}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Deep-dive Anatomy Section */}
      <section className="bg-[#0b2d4d] py-20 text-white">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow dark">
              <Icon name="atom" size={14} />
              <span>Designed for understanding</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">
              Learn the rule behind every result.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
              Other calculators stop at the answer. SigFigLab highlights the significant digits and walks through the exact rule used—so the next problem on your exam or lab report feels intuitive.
            </p>
            <button
              onClick={() => go("how-it-works")}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8fc3f3] hover:underline"
            >
              <span>See how it works</span>
              <Icon name="arrow" size={17} />
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6 sm:p-8 shadow-2xl backdrop-blur-xs">
            <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
              <span>Anatomy of 0.004560</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono text-[11px]">
                4 Sig Figs
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-4xl font-semibold font-mono sm:text-5xl">
              <span className="text-slate-500">0.00</span>
              <span className="rounded-lg bg-[#2c75b8] px-2 py-0.5">4</span>
              <span className="rounded-lg bg-[#2c75b8] px-2 py-0.5">5</span>
              <span className="rounded-lg bg-[#2c75b8] px-2 py-0.5">6</span>
              <span className="rounded-lg bg-[#2c75b8] px-2 py-0.5">0</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[.07] p-4">
                <div className="text-2xl font-semibold text-white">4</div>
                <div className="mt-1 text-xs text-slate-400">Significant figures identified</div>
              </div>
              <div className="rounded-2xl bg-white/[.07] p-4">
                <div className="text-sm font-semibold text-white">Trailing zero counts</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">
                  It follows an explicit decimal point and non-zero significant digits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="site-container py-20">
        <div className="section-heading">
          <h2>Trusted clarity for every learner</h2>
          <p>Built to support careful scientific work in the classroom, lab, and field.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: "book",
              title: "Students",
              text: "Build confidence with transparent step breakdowns that reinforce what you learn in physics and chemistry lectures.",
            },
            {
              icon: "target",
              title: "Educators",
              text: "Use consistent examples and clear rule summaries in classroom lessons, problem sets, and grading rubrics.",
            },
            {
              icon: "shield",
              title: "STEM Professionals",
              text: "Quickly verify reported experimental precision and instrument uncertainty before publishing papers or reports.",
            },
          ].map((item) => (
            <div className="info-card" key={item.title}>
              <div className="icon-box">
                <Icon name={item.icon} size={20} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection go={go} />
    </>
  );
}
