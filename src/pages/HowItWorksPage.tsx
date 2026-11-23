import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";

interface HowItWorksPageProps {
  go: (p: Page) => void;
}

export function HowItWorksPage({ go }: HowItWorksPageProps) {
  const steps = [
    {
      n: "01",
      tag: "Mode Selection",
      icon: "calculator",
      title: "Choose a calculation mode",
      desc: "Select Count, Round, Calculate, or Scientific notation based on your current scientific or homework problem.",
      renderVisual: () => (
        <div className="rounded-xl border border-blue-100/90 bg-[#f8fbff] p-4 text-left transition-colors group-hover:border-blue-200">
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Calculation Modes
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            <span className="rounded-lg bg-[#102e50] px-2.5 py-1 text-[11px] font-medium text-white shadow-2xs">
              Count
            </span>
            <span className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
              Round
            </span>
            <span className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
              Calculate
            </span>
            <span className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
              Scientific
            </span>
          </div>
        </div>
      ),
    },
    {
      n: "02",
      tag: "Exact Input",
      icon: "hash",
      title: "Enter values with exact precision",
      desc: "Include all measured trailing zeros. In scientific measurements, writing 12.00 communicates much greater instrument precision than 12.",
      renderVisual: () => (
        <div className="rounded-xl border border-blue-100/90 bg-[#f8fbff] p-4 text-left transition-colors group-hover:border-blue-200">
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <span>Input Value</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100">
              Live
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-2 font-mono text-sm text-[#102e50] shadow-2xs">
            <span className="text-slate-400 font-sans">0.00</span>
            <span className="font-bold text-[#102e50]">4560</span>
            <span className="h-4 w-[2px] animate-pulse bg-blue-600" />
          </div>
          <div className="mt-2 text-[10px] text-slate-500 font-medium">
            Trailing zeros indicate measured precision
          </div>
        </div>
      ),
    },
    {
      n: "03",
      tag: "Live Output",
      icon: "target",
      title: "Review the formatted result",
      desc: "Instantly see the properly rounded output, highlighted significant digits, and the exact uncertainty count.",
      renderVisual: () => (
        <div className="rounded-xl border border-blue-100/90 bg-[#f8fbff] p-4 text-left transition-colors group-hover:border-blue-200">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Calculated Result
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#102e50]">4</span>
            <span className="text-xs font-semibold text-slate-600">significant figures</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 font-mono text-xs">
            <span className="px-0.5 text-slate-400">0.00</span>
            <span className="rounded bg-blue-100 px-1 py-0.5 font-bold text-blue-700">4</span>
            <span className="rounded bg-blue-100 px-1 py-0.5 font-bold text-blue-700">5</span>
            <span className="rounded bg-blue-100 px-1 py-0.5 font-bold text-blue-700">6</span>
            <span className="rounded bg-blue-100 px-1 py-0.5 font-bold text-blue-700">0</span>
          </div>
        </div>
      ),
    },
    {
      n: "04",
      tag: "Rule Deduction",
      icon: "spark",
      title: "Follow the transparent step-by-step logic",
      desc: "Read the clear breakdown explaining whether leading zeros were skipped, captive zeros were counted, or decimal places dictated the final rounding.",
      renderVisual: () => (
        <div className="rounded-xl border border-blue-100/90 bg-[#f8fbff] p-4 text-left transition-colors group-hover:border-blue-200">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Rule Breakdown
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-600 shrink-0">
                <Icon name="check" size={13} />
              </span>
              <span className="text-[11px] leading-tight">Leading zeros only position the decimal</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-600 shrink-0">
                <Icon name="check" size={13} />
              </span>
              <span className="text-[11px] leading-tight">Trailing zero counts after decimal point</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Simple by design"
        title="From input to understanding"
        text="A fast, transparent workflow that helps you solve the problem and truly understand the method."
        icon={<Icon name="spark" size={14} />}
      />

      <main className="site-container pt-12 ">
        {/* Intro Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <Icon name="spark" size={15} />
            <span>Simple, transparent methodology</span>
          </div>

          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102e50]">
                How our precision engine works
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
                Our calculator handles the subtle nuances of scientific measurement notation so you can focus on learning and accurate reporting.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-blue-100 bg-blue-50/80 px-5 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                Workflow
              </p>
              <p className="mt-0.5 text-2xl font-bold text-[#102e50]">
                04 <span className="text-xs font-normal text-slate-500">easy steps</span>
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Interactive Cards */}
        <section className="space-y-5">
          {steps.map((step) => (
            <article
              key={step.n}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.07)]"
            >
              <div className="grid gap-6 md:grid-cols-[auto_1fr_270px] md:items-center">
                {/* Step Number Badge */}
                <div className="flex items-center gap-4 md:block">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-mono text-base font-bold text-blue-700 border border-blue-200/60 shadow-2xs transition-colors duration-300 group-hover:bg-[#102e50] group-hover:text-white">
                    {step.n}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 md:hidden">
                    <Icon name={step.icon} size={12} />
                    <span>{step.tag}</span>
                  </span>
                </div>

                {/* Step Description */}
                <div>
                  <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 mb-2">
                    <Icon name={step.icon} size={11} />
                    <span>{step.tag}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#102e50]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
                    {step.desc}
                  </p>
                </div>

                {/* Visual Preview Box */}
                <div className="w-full">
                  {step.renderVisual()}
                </div>
              </div>

              {/* Accent hover line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-[#102e50] transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </section>

        {/* Bottom CTA Section */}
        <section className="relative mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2d4d] via-[#123d63] to-[#164b73] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-white/[0.06]" />

          {/* Decorative symbols */}
          <span className="pointer-events-none absolute left-[10%] top-[18%] hidden text-3xl font-light text-white/[0.08] sm:block">
            ±
          </span>
          <span className="pointer-events-none absolute right-[12%] bottom-[18%] hidden text-2xl font-light text-white/[0.08] sm:block">
            10⁻³
          </span>

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Label */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-100">
              <Icon name="spark" size={13} />
              <span>Ready to calculate</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Ready to see it in action?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-blue-100/80">
              Use the calculator with no account required, no distractions, and zero guesswork.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => go("calculator")}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#103454] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <Icon name="calculator" size={16} />
                <span>Open calculator</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={16} />
                </span>
              </button>

              <button
                onClick={() => go("examples")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30"
              >
                <Icon name="flask" size={16} />
                <span>See worked examples</span>
              </button>
            </div>

            {/* Features list */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-blue-100/70">
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} />
                No sign-up needed
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} />
                Step-by-step reasoning
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} />
                100% Free & private
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
