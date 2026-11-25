import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { rules } from "../data/rules";

interface RulesPageProps {
  go: (p: Page) => void;
}

export function RulesPage({ go }: RulesPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Learning guide"
        title="Significant figures rules"
        text="Six straightforward rules for deciding which digits communicate precision—and why."
        icon={<Icon name="book" size={14} />}
      />

      <main className="site-container pt-16">
        {/* Intro Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <Icon name="spark" size={15} />
            <span>Understand the fundamentals</span>
          </div>
    
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102e50]">
                How to identify significant digits
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Significant figures help us express how precise a measurement
                is. Use these six rules to determine which digits matter, which
                zeros count, and how measurements should be written.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                Fundamental rules
              </p>
              <p className="mt-1 text-2xl font-semibold text-[#102e50]">
                06{" "}
                <span className="text-sm font-normal text-slate-500">
                  rules
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Rules Grid */}
        <section>
          <div className="grid gap-5 md:grid-cols-2">
            {rules.map((rule, index) => (
              <article
                key={rule.number}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_35px_rgba(15,45,80,0.07)]"
              >
                {/* Card top */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700 transition-colors duration-300 group-hover:bg-[#102e50] group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Rule {rule.number}
                  </span>
                </div>

                {/* Card Content */}
                <div className="mt-5">
                  <h3 className="text-xl font-semibold tracking-tight text-[#102e50]">
                    {rule.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {rule.description}
                  </p>
                </div>

                {/* Example */}
                <div className="mt-6 rounded-xl border border-blue-100 bg-[#f6faff] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon name="spark" size={13} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                      Example
                    </span>
                  </div>

                  <p className="font-mono text-sm font-medium leading-6 text-[#102e50]">
                    {rule.example}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative mt-14 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2d4d] via-[#123d63] to-[#164b73] px-6 py-9 text-center text-white sm:px-10 ">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-white/[0.06]" />

          {/* Decorative symbols */}
          <span className="pointer-events-none absolute left-[10%] top-[15%] hidden text-3xl font-light text-white/[0.08] sm:block">
            ±
          </span>

          <span className="pointer-events-none absolute right-[12%] bottom-[15%] hidden text-2xl font-light text-white/[0.08] sm:block">
            10⁻³
          </span>

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Label */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium tracking-wide text-blue-100">
              <Icon name="spark" size={13} />
              <span>Practice what you learned</span>
            </div>

            {/* Heading */}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Know the rules.
              <br />
              Now put them to work.
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-blue-100/75">
              Test your understanding with real numbers. Use the interactive
              calculator to count significant figures, round measurements, and
              explore scientific notation.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => go("calculator")}
              className="group mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#103454] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#123d63]"
            >
              <Icon name="calculator" size={16} />
              <span>Try the calculator</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" size={16} />
              </span>
            </button>

            {/* Features */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-blue-100/70">
              <span className="flex items-center gap-2">
                <Icon name="check" size={13} />
                Understand significant figures
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

              <span className="flex items-center gap-2">
                <Icon name="check" size={13} />
                Practice with real numbers
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

              <span className="flex items-center gap-2">
                <Icon name="check" size={13} />
                Build calculation confidence
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
