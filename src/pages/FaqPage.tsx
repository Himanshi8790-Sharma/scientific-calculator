import React, { useState } from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { faqs } from "../data/faqs";

interface FaqPageProps {
  go?: (p: Page) => void;
}

export function FaqPage({ go }: FaqPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <PageHero
        eyebrow="Help center"
        title="Frequently asked questions"
        text="Quick, clear answers to the questions STEM learners and educators ask most."
        icon={<Icon name="info" size={14} />}
      />

      <main className="site-container pt-12 ">
        <div className="mx-auto max-w-3xl">
          {/* FAQ Accordion List - Starts directly below hero */}
          <section className="space-y-3.5">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              const indexNumber = i + 1;

              return (      
                <div
                  key={item.question}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                    ? "border-blue-200/90 bg-gradient-to-b from-white to-[#fbfdff] shadow-[0_10px_28px_rgba(15,45,80,0.06)]"
                    : "border-slate-200/90 bg-white shadow-2xs hover:border-slate-300"
                    }`}
                >
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors duration-200 ${isOpen
                          ? "bg-[#102e50] text-white shadow-2xs"
                          : "bg-blue-50 text-blue-700 border border-blue-100/60"
                          }`}
                      >
                        {indexNumber < 10 ? `0${indexNumber}` : indexNumber}
                      </span>

                      <span className="text-[15px] sm:text-base font-semibold text-[#102e50] leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${isOpen
                        ? "bg-blue-100/70 text-blue-800 rotate-180"
                        : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}
                    >
                      <Icon name="down" size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100/80 px-5 sm:px-6 pt-3.5 pb-6 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Bottom Help Desk Card */}
          <section className="relative mt-16 overflow-hidden rounded-[28px] border border-blue-100/80 bg-gradient-to-br from-[#f0f6fd] via-[#f7faff] to-white p-7 sm:p-10 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm border border-blue-100">
              <Icon name="mail" size={20} />
            </div>

            <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#102e50]">
              Still have questions about precision?
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-600">
              Can't find what you're looking for? Reach out to our STEM team or test your numbers directly in our step-by-step interactive calculator.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {go && (
                <button
                  onClick={() => go("calculator")}
                  className="button-primary px-6 py-3 shadow-md"
                >
                  <Icon name="calculator" size={16} />
                  <span>Try the calculator</span>
                  <Icon name="arrow" size={15} />
                </button>
              )}

              {go && (
                <button
                  onClick={() => go("contact")}
                  className="button-secondary px-5 py-3 shadow-2xs"
                >
                  <Icon name="mail" size={16} />
                  <span>Contact our team</span>
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} className="text-emerald-600" />
                Verified STEM explanations
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} className="text-emerald-600" />
                Zero tracking & 100% private
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <span className="flex items-center gap-1.5">
                <Icon name="check" size={13} className="text-emerald-600" />
                Fast educator support
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
