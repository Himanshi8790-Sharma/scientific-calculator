import React from "react";
import { Icon } from "../common/Icons";

export default function CalculationInfo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbfe] via-white to-[#edf5fc]/30 border-y border-blue-100/60 py-10 sm:py-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-100/40 blur-[90px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-sky-100/40 blur-[90px]" />

      <div className="site-container relative z-10">
        {/* Section Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="eyebrow mx-auto mb-3">
            <Icon name="atom" size={13} />
            <span>LEARN & UNDERSTAND</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#0a2b4b] sm:text-3xl lg:text-4xl">
            Understand Significant Figures &{" "}
            <span className="bg-gradient-to-r from-[#174f84] to-[#2f75bd] bg-clip-text text-transparent">
              Measurement Precision
            </span>
          </h2>


        </div>
        {/* First Card */}
        <article className="rounded-2xl border border-slate-200/80 bg-white px-5 py-6 shadow-sm transition-all duration-300 hover:shadow-md sm:px-7 sm:py-7 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf5fc] text-[#185891]">
              <Icon name="clock" size={21} />
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-[#0a2b4b] sm:text-xl">
              What Does Significant Figure Calculation Actually Measure?
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Our Significant Figures Calculator helps you identify meaningful
              digits in a number and understand the precision of a measurement.
              Simply enter a number to determine how many significant figures it
              contains.
            </p>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Significant figures distinguish meaningful digits from leading zeros
              and placeholder zeros, helping represent measurement accuracy in
              scientific and mathematical calculations.
            </p>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Different operations follow different rules. Multiplication and
              division use significant figures, while addition and subtraction
              depend on decimal places to maintain the correct precision.
            </p>
          </div>
        </article>

        {/* Second Card */}
        {/* <article className="mt-6 rounded-2xl border border-slate-200/80 bg-white px-5 py-6 shadow-sm transition-all duration-300 hover:shadow-md sm:px-7 sm:py-7 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf5fc] text-[#185891]">
              <Icon name="users" size={21} />
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-[#0a2b4b] sm:text-xl">
              Who Can Benefit From This Calculator?
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Students can practice significant figure rules, verify homework,
              and improve their understanding of scientific measurements and
              rounding.
            </p>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Teachers can use it as a quick learning resource, while science
              students, researchers, and professionals can use it to perform
              precise calculations and avoid rounding errors.
            </p>
          </div>
        </article> */}
      </div>
    </section>
  );
}