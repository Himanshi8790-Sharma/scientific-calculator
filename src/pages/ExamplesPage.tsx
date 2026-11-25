import React, { useState } from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { exampleData } from "../data/examples";

interface ExamplesPageProps {
  go: (p: Page) => void;
}

export function ExamplesPage({ go }: ExamplesPageProps) {
  const [filter, setFilter] = useState("All");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = ["All", "Counting", "Rounding", "Operations", "Notation"];

  const visible = exampleData.filter(
    (e) =>
      filter === "All" ||
      e.category === filter ||
      (filter === "Operations" &&
        ["Multiplication", "Addition", "Division"].includes(e.category)) ||
      (filter === "Notation" && e.category === "Scientific notation"),
  );

  const getCategoryCount = (category: string) => {
    if (category === "All") return exampleData.length;
    if (category === "Operations") {
      return exampleData.filter((e) =>
        ["Multiplication", "Addition", "Division"].includes(e.category),
      ).length;
    }
    if (category === "Notation") {
      return exampleData.filter((e) => e.category === "Scientific notation").length;
    }
    return exampleData.filter((e) => e.category === category).length;
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Counting":
        return {
          icon: "hash",
          badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
          accentColor: "from-blue-600 to-sky-500",
        };
      case "Rounding":
        return {
          icon: "round",
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          accentColor: "from-emerald-600 to-teal-500",
        };
      case "Multiplication":
      case "Addition":
      case "Division":
        return {
          icon: "calculator",
          badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          accentColor: "from-indigo-600 to-blue-600",
        };
      case "Scientific notation":
        return {
          icon: "atom",
          badgeClass: "bg-cyan-50 text-cyan-800 border-cyan-200/80",
          accentColor: "from-cyan-600 to-blue-500",
        };
      default:
        return {
          icon: "flask",
          badgeClass: "bg-slate-50 text-slate-700 border-slate-200/80",
          accentColor: "from-blue-600 to-indigo-600",
        };
    }
  };

  const handleCopyAnswer = async (
    answer: string,
    index: number,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(answer);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Practice library"
        title="Worked examples"
        text="Follow each problem step-by-step from raw measurement values to a properly reported scientific answer."
        icon={<Icon name="flask" size={14} />}
      />
      
      <main className="site-container pt-12 ">
        {/* Intro Overview Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <Icon name="spark" size={15} />
            <span>Step-by-step scientific practice</span>
          </div>

          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102e50]">
                Master precision with clear solutions
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
                Designed for STEM coursework and laboratory reporting. Review key
                rules for non-zero digits, ambiguous zeros, arithmetic operations,
                and exponential notation.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-5 py-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                  Curated problems
                </p>
                <p className="mt-0.5 text-2xl font-bold text-[#102e50]">
                  06{" "}
                  <span className="text-xs font-normal text-slate-500">
                    fully worked
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Highlights */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon name="hash" size={16} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Counting Rule
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#102e50]">
              Leading vs. Trailing Zeros
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Leading zeros only locate the decimal point. Captive zeros and
              trailing decimal zeros always count toward precision.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon name="calculator" size={16} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Operations Rule
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#102e50]">
              Multiply & Divide
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              The product or quotient is limited by the initial measurement
              possessing the fewest significant figures.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <Icon name="atom" size={16} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Addition & Subtraction
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#102e50]">
              Decimal Places Rule
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              The sum or difference is restricted by the measurement with the
              fewest decimal places, reflecting instrument resolution.
            </p>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Problem categories">
            {categories.map((c) => {
              const count = getCategoryCount(c);
              const isActive = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  role="tab"
                  aria-selected={isActive}
                  className={`group flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#102e50] text-white shadow-sm shadow-[#102e50]/20"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-medium text-slate-500">
            Showing <span className="font-semibold text-slate-700">{visible.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{exampleData.length}</span> examples
          </div>
        </section>

        {/* Examples Grid */}
        <section>
          {visible.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Icon name="flask" size={22} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#102e50]">
                No examples found in this category
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Try selecting "All" to view all available worked problems.
              </p>
              <button
                onClick={() => setFilter("All")}
                className="button-secondary mt-5 px-4 py-2 text-xs"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((e) => {
                const index = exampleData.indexOf(e) + 1;
                const theme = getCategoryTheme(e.category);
                const isCopied = copiedIndex === index;

                return (
                  <article
                    key={e.problem}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.08)]"
                  >
                    <div>
                      {/* Card Header: Category & Problem # */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${theme.badgeClass}`}
                        >
                          <Icon name={theme.icon} size={12} />
                          <span>{e.category}</span>
                        </span>

                        <span className="font-mono text-xs font-semibold text-slate-400">
                          #{index < 10 ? `0${index}` : index}
                        </span>
                      </div>

                      {/* Problem Statement */}
                      <div className="mt-5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Problem
                        </span>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#102e50] leading-snug">
                          {e.problem}
                        </h3>
                      </div>

                      {/* Step-by-Step Breakdown */}
                      <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          <Icon name="spark" size={12} className="text-blue-500" />
                          <span>Solution Breakdown</span>
                        </div>

                        <div className="space-y-2.5">
                          {e.steps.map((step, j) => (
                            <div
                              key={step}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 font-mono text-[10px] font-bold text-blue-700 border border-blue-200/60">
                                {j + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reported Answer Box */}
                    <div className="mt-7">
                      <div className="rounded-xl border border-blue-100/90 bg-gradient-to-br from-[#f8fbff] to-[#edf5fd] p-4 transition-colors group-hover:border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                            <Icon name="check" size={13} className="text-emerald-600" />
                            <span>Reported Answer</span>
                          </span>

                          <button
                            onClick={(ev) => handleCopyAnswer(e.answer, index, ev)}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:bg-white hover:text-blue-700 hover:shadow-xs transition"
                            aria-label={`Copy answer for problem ${index}`}
                            title="Copy answer"
                          >
                            <Icon
                              name={isCopied ? "check" : "copy"}
                              size={12}
                              className={isCopied ? "text-emerald-600" : ""}
                            />
                            <span>{isCopied ? "Copied" : "Copy"}</span>
                          </button>
                        </div>

                        <div className="mt-2 font-mono text-base sm:text-lg font-bold text-[#102e50] tracking-tight">
                          {e.answer}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Accent line on hover */}
                    <div
                      className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${theme.accentColor} transition-all duration-300 group-hover:w-full`}
                    />
                  </article>
                );
              })}
            </div>
          )}
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
            10⁻⁴
          </span>

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Label */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-100">
              <Icon name="calculator" size={13} />
              <span>Interactive Problem Solving</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Have your own calculation to check?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-blue-100/80">
              Input your lab measurements directly into our calculator to count
              sig figs, round to specified precision, or compute operations with
              full step-by-step reasoning.
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
                onClick={() => go("rules")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30"
              >
                <Icon name="book" size={16} />
                <span>Review the 6 rules</span>
              </button>
            </div>

            {/* Features list */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-blue-100/70">
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} />
                Instant precision analysis
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
