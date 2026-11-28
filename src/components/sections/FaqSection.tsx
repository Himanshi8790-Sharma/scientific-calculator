import React, { useState } from "react";
import { Icon } from "../common/Icons";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How many significant figures are in 0.004560?",
    answer:
      "4. Leading zeros are ignored, 4, 5 and 6 count, and the last zero counts because it comes after a decimal point.",
  },
  {
    question: "Are trailing zeros significant?",
    answer:
      "Only when the number has a decimal point. 2.50 has 3 sig figs, 1200 has 2, and 1200. has 4.",
  },
  {
    question: "How do I round to significant figures?",
    answer:
      "Keep the first n significant digits. If the next digit is 5 or more, round the last kept digit up.",
  },
  {
    question: "What are exact numbers?",
    answer:
      "Counted or defined values, like 12 eggs or 1 m = 100 cm. They have unlimited significant figures.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="site-container py-12 ">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow mx-auto mb-2.5">
            <Icon name="info" size={12} />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Quick clarity on common significant figure rules and edge cases.
          </p>
        </div>

        {/* FAQ Accordion Cards */}
        <div className="mt-10 space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-300/90 bg-white shadow-sm ring-1 ring-blue-100"
                    : "border-slate-200/80 bg-white hover:border-blue-200 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="group flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? "text-[#174f84]" : "text-[#0a2b4b] group-hover:text-[#174f84]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 shadow-xs ${
                      isOpen
                        ? "rotate-180 bg-[#174f84] text-white border-[#174f84] shadow-blue-900/20"
                        : "bg-[#edf5fc] text-[#174f84] border-blue-200 group-hover:bg-[#d9ebff] group-hover:border-blue-300"
                    }`}
                  >
                    <Icon name="down" size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-[#fbfdff] px-5 pb-5 pt-3.5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
