import React, { useEffect, useRef } from "react";
import type { Page } from "../types";
import { Icon } from "../components/common/Icons";
import { Calculator } from "../components/calculator/Calculator";
import { CtaSection } from "../components/sections/CtaSection";

interface HomePageProps {
  go: (p: Page) => void;
}

export function HomePage({ go }: HomePageProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLDivElement);

            (entry.target as HTMLDivElement).style.opacity = "1";
            (entry.target as HTMLDivElement).style.transform = "translateY(0)";

            observer.unobserve(entry.target);

            // Card entrance stagger is controlled through inline transition delay.
            void index;
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f5f9fd] via-white to-[#eaf3fc]">
        {/* Background decoration */}
        <div className="hero-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />

        <div className="site-container relative grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[.88fr_1.12fr] ">
          {/* Hero Content */}
          <div className="animate-[fadeInUp_.7s_ease-out_both]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#2f75bd] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Icon name="spark" size={15} />
              <span>Precise answers, clearly explained</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <h1 className="mt-6 max-w-2xl text-[40px] font-bold leading-[1.08] tracking-[-.045em] text-[#0a2b4b] sm:text-[56px] lg:text-[62px]">
              Significant figures,
              <span className="block mt-1 bg-gradient-to-r from-[#2f75bd] to-[#60a5e8] bg-clip-text text-transparent">
                made simple.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Count, round, and calculate with confidence. Get instant results
              plus the reasoning behind every answer.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go("calculator")}
                className="button-primary group px-6 py-3.5 shadow-lg shadow-blue-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Icon name="calculator" size={18} />
                <span>Start calculating</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={17} />
                </span>
              </button>

              <button
                onClick={() => go("rules")}
                className="button-secondary px-6 py-3.5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
              >
                <Icon name="book" size={18} />
                <span>Learn the rules</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600 sm:gap-x-6">
              {[
                "No sign-up needed",
                "Step-by-step reasoning",
                "100% Free & private",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 transition hover:text-blue-700"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" size={13} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="relative animate-[fadeInUp_.8s_ease-out_.15s_both]">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-200/20 blur-2xl" />
            <div className="relative transition duration-500 hover:-translate-y-1">
              <Calculator compact />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Features Grid */}
      <section className="site-container py-20 relative overflow-hidden">
        {/* Background scientific decoration */}
        <div className="absolute top-10 right-0 text-[180px] font-light text-blue-50/70 pointer-events-none select-none">
          ∑
        </div>

        <div className="section-heading relative z-10">
          <div className="eyebrow mx-auto">ONE TOOL, EVERY WORKFLOW</div>
          <h2>Everything you need for accurate answers</h2>
          <p>
            Choose the mode that matches your problem. Each one shows the logic,
            not just the result.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {[
            {
              n: "01",
              title: "Count sig figs",
              text: "Identify exactly which digits communicate measured precision.",
              example: "0.00450 → 3 sig figs",
              icon: "hash",
              symbol: "±",
            },
            {
              n: "02",
              title: "Round values",
              text: "Round any number cleanly without losing intended precision.",
              example: "12.378 → 12.4 (3 s.f.)",
              icon: "round",
              symbol: "≈",
            },
            {
              n: "03",
              title: "Calculate",
              text: "Apply precision propagation rules to all standard mathematical operations.",
              example: "4.5 × 2.31 → 10",
              icon: "calculator",
              symbol: "×",
            },
            {
              n: "04",
              title: "Convert notation",
              text: "Convert seamlessly between decimal and scientific exponential form.",
              example: "45,200 → 4.52 × 10⁴",
              icon: "atom",
              symbol: "10ⁿ",
            },
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => go("calculator")}
              className="feature-card scientific-card text-left group relative overflow-hidden"
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] text-[#4482bd]">
                  EXPERIMENT {item.n}
                </span>

                <span className="text-slate-400 group-hover:text-[#174f84] transition duration-300 group-hover:scale-110">
                  <Icon name={item.icon} size={18} />
                </span>
              </div>

              {/* Scientific Symbol */}
              <div className="scientific-symbol my-6 flex items-center justify-center relative">
                <span className="text-4xl font-light text-[#174f84] transition duration-300 group-hover:scale-110">
                  {item.symbol}
                </span>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-blue-200 group-hover:w-20 transition-all duration-300" />
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              {/* Calculation Display */}
              <div className="mt-5 rounded-xl bg-[#f5f8fc] border border-[#e7edf5] px-3 py-3 transition duration-300 group-hover:bg-[#edf5fd] group-hover:border-[#c9ddf3]">
                <div className="font-mono text-sm font-medium text-[#315b83]">
                  {item.example}
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="mt-5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((tick, index) => (
                  <div
                    key={tick}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index < Number(item.n) ? "bg-[#4b86bc]" : "bg-[#e5edf5]"
                    }`}
                    style={{ width: index === 0 ? "18px" : "8px" }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Deep-dive Anatomy Section */}
     <section className="bg-[#0b2d4d] py-12 sm:py-16 lg:py-20 text-white overflow-hidden">
  <div className="site-container grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
    <div className="min-w-0">
      <div className="eyebrow dark">
        <Icon name="atom" size={14} />
        <span>Designed for understanding</span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-[-.035em] sm:text-3xl lg:text-4xl">
        Learn the rule behind every result.
      </h2>

      <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
        Other calculators stop at the answer. SigFigLab highlights the
        significant digits and walks through the exact rule used—so the
        next problem on your exam or lab report feels intuitive.
      </p>

      <button
        onClick={() => go("how-it-works")}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8fc3f3] hover:underline"
      >
        <span>See how it works</span>
        <Icon name="arrow" size={17} />
      </button>
    </div>

    <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[.06] p-4 shadow-2xl backdrop-blur-xs sm:p-6 lg:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-slate-400">
        <span>Anatomy of 0.004560</span>
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 font-mono text-[11px] text-blue-300">
          4 Sig Figs
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1 text-3xl font-semibold font-mono sm:text-4xl md:text-5xl">
        <span className="text-slate-500">0.00</span>
        <span className="rounded-lg bg-[#2c75b8] px-1.5 py-0.5 sm:px-2">4</span>
        <span className="rounded-lg bg-[#2c75b8] px-1.5 py-0.5 sm:px-2">5</span>
        <span className="rounded-lg bg-[#2c75b8] px-1.5 py-0.5 sm:px-2">6</span>
        <span className="rounded-lg bg-[#2c75b8] px-1.5 py-0.5 sm:px-2">0</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/[.07] p-4">
          <div className="text-2xl font-semibold text-white">4</div>
          <div className="mt-1 text-xs leading-5 text-slate-400">
            Significant figures identified
          </div>
        </div>

        <div className="rounded-2xl bg-white/[.07] p-4">
          <div className="text-sm font-semibold text-white">
            Trailing zero counts
          </div>
          <div className="mt-1 text-xs leading-5 text-slate-400">
            It follows an explicit decimal point and non-zero significant
            digits.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Target Audiences */}
      <section className="site-container py-20 relative overflow-hidden">
        <div className="relative z-10">
          {/* Section Heading */}
          <div className="section-heading">
            <div className="eyebrow mx-auto">
              <Icon name="atom" size={14} />
              <span>Built for scientific minds</span>
            </div>

            <h2>Trusted clarity for every learner</h2>
            <p>
              Built to support careful scientific work in the classroom, lab,
              and field.
            </p>
          </div>

          {/* Cards */}
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
                text: "Use consistent examples and clear, structured rule summaries in classroom lessons, problem sets, and grading rubrics.",
              },
              {
                icon: "shield",
                title: "STEM Professionals",
                text: "Quickly verify reported experimental precision and instrument uncertainty before publishing papers or reports.",
              },
            ].map((item, index) => (
              <div
                className="info-card group relative overflow-hidden"
                key={item.title}
                style={{
                  opacity: 0,
                  transform: "translateY(32px)",
                  transition: `opacity 700ms ease ${index * 150}ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 150}ms`,
                }}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
              >
                {/* Card top */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#83a7c8]">
                    APPLICATION / 0{index + 1}
                  </span>

                  {/* <Icon name="arrow" size={15} /> */}
                </div>

                {/* Scientific icon area */}
                <div className="relative my-7 flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-1 rounded-full border border-[#e6edf5] transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110" />

                  <div className="absolute inset-3 rounded-full border border-dashed border-[#dce8f3] transition-transform duration-1000 group-hover:-rotate-45" />

                  <div className="absolute h-px w-full bg-[#edf2f8]" />
                  <div className="absolute h-full w-px bg-[#edf2f8]" />

                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e3edf7] bg-[#f4f9fe] text-[#3978ae] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e8f3fd] group-hover:shadow-[0_0_22px_rgba(59,130,246,0.12)]">
                    <Icon name={item.icon} size={21} />
                  </div>

                  <span className="absolute right-1 top-3 h-1.5 w-1.5 rounded-full bg-[#82acd2] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_8px_#82acd2]" />
                </div>

                {/* Card content */}
                <h3 className="transition-colors duration-300 group-hover:text-[#28679e]">
                  {item.title}
                </h3>

                <p>{item.text}</p>

                {/* Bottom measuring scale */}
                <div className="mt-6 flex items-end justify-between border-t border-[#edf1f6] pt-4">
                  <div className="flex items-end gap-[3px]">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-px transition-colors duration-300 ${
                          i % 3 === 0
                            ? "h-2.5 bg-[#a9c4de]"
                            : "h-1.5 bg-[#e0eaf3]"
                        } group-hover:bg-[#6f9fc9]`}
                      />
                    ))}
                  </div>

                  <span className="text-[9px] font-medium tracking-widest text-[#a0b2c4]">
                    SIGFIGLAB
                  </span>
                </div>

                {/* Hover bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#4a88bd] to-[#b7d8f3] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Component-local animation logic */}
        {(() => {
          return null;
        })()}
      </section>

      <CtaSection go={go} />
    </>
  );
}
