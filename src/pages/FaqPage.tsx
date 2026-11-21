import React, { useState } from "react";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { faqs } from "../data/faqs";

export function FaqPage() {
  const [open, setOpen] = useState<number>(0);

  return (
    <>
      <PageHero
        eyebrow="Help center"
        title="Frequently asked questions"
        text="Quick, clear answers to the questions STEM learners and educators ask most."
        icon={<Icon name="info" size={14} />}
      />

      <main className="site-container py-16">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                className={`faq-item transition duration-200 ${isOpen ? "open" : ""}`}
                key={item.question}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-semibold text-[#102e50]">
                    {item.question}
                  </span>
                  <span
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#185891]" : ""
                    }`}
                  >
                    <Icon name="down" size={18} />
                  </span>
                </button>
                {isOpen && (
                  <p className="text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 pt-3">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
