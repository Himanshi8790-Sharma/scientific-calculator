import React from "react";
import type { Page } from "../../types";
import { Icon } from "../common/Icons";

interface CtaSectionProps {
  go: (p: Page) => void;
  title?: string;
  subtitle?: string;
}

export function CtaSection({
  go,
  title = "Make every digit count.",
  subtitle = "Stop guessing. Calculate with confidence and understand the science behind every result.",
}: CtaSectionProps) {
  return (
    <section className="site-container my-10">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2d4d] via-[#123d63] to-[#164b73] px-6 py-14 text-center text-white sm:px-12 sm:py-16">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-white/[0.06]" />

        {/* Decorative symbols */}
        <span className="pointer-events-none absolute left-[10%] top-[18%] hidden text-4xl font-light text-white/[0.08] sm:block">
          ±
        </span>
        <span className="pointer-events-none absolute right-[12%] bottom-[20%] hidden text-3xl font-light text-white/[0.08] sm:block">
          10⁻³
        </span>

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-100">
            <Icon name="atom" size={14} />
            <span>Precision starts here</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100/75 sm:text-base">
            {subtitle}
          </p>

          {/* CTA */}
          <button
            onClick={() => go("calculator")}
            className="group mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#103454] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#123d63]"
          >
            <Icon name="calculator" size={17} />
            <span>Explore the calculator</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" size={17} />
            </span>
          </button>

          {/* Features */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-blue-100/70">
            <span className="flex items-center gap-2">
              <Icon name="check" size={14} />
              Accurate calculations
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span className="flex items-center gap-2">
              <Icon name="check" size={14} />
              Instant results
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span className="flex items-center gap-2">
              <Icon name="check" size={14} />
              Learn as you calculate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}