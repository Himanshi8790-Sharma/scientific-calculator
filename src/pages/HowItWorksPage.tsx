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
      title: "Choose a calculation mode",
      desc: "Select Count, Round, Calculate, or Scientific notation based on your current scientific or homework problem.",
      preview: "Count · Round · Calculate",
    },
    {
      n: "02",
      title: "Enter values with exact precision",
      desc: "Include all measured trailing zeros. In scientific measurements, writing 12.00 communicates much greater instrument precision than 12.",
      preview: "0.004560",
    },
    {
      n: "03",
      title: "Review the formatted result",
      desc: "Instantly see the properly rounded output, highlighted significant digits, and the exact uncertainty count.",
      preview: "4 significant figures",
    },
    {
      n: "04",
      title: "Follow the transparent step-by-step logic",
      desc: "Read the clear breakdown explaining whether leading zeros were skipped, captive zeros were counted, or decimal places dictated the final rounding.",
      preview: "Rule explained clearly",
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

      <main className="site-container py-16">
        <div className="mx-auto max-w-4xl">
          {steps.map((step) => (
            <div className="process-row" key={step.n}>
              <div className="process-number font-mono">{step.n}</div>
              <div className="process-copy">
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
              </div>
              <div className="hidden rounded-2xl bg-[#f4f8fc] p-5 text-sm font-mono font-medium text-[#315b83] md:block text-center border border-blue-100/50">
                {step.preview}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#0b2d4d] px-7 py-10 text-center text-white sm:px-12 shadow-xl">
          <h2 className="text-2xl font-semibold">Ready to see it in action?</h2>
          <p className="mt-2 text-sm text-slate-300">
            Use the calculator with no account required, no distractions, and zero guesswork.
          </p>
          <button
            onClick={() => go("calculator")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#123f73] hover:bg-slate-100 transition shadow-md"
          >
            <Icon name="calculator" size={18} />
            <span>Open calculator</span>
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </main>
    </>
  );
}
