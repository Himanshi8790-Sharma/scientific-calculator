import React from "react";
import type { Page } from "../types";
import { Icon } from "../components/common/Icons";
import { Calculator } from "../components/calculator/Calculator";
import { SigFigRulesSection } from "../components/sections/SigFigRulesSection";
import { TrustBarSection } from "../components/sections/TrustBarSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { QuickReferenceSection } from "../components/sections/QuickReferenceSection";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { CommonMistakesSection } from "../components/sections/CommonMistakesSection";
import { AudienceSection } from "../components/sections/AudienceSection";
import { LearnSection } from "../components/sections/LearnSection";
import { FaqSection } from "../components/sections/FaqSection";
import { CtaSection } from "../components/sections/CtaSection";

interface HomePageProps {
  go: (p: Page) => void;
}

export function HomePage({ go }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f5f9fd] via-white to-[#eaf3fc]">
        {/* Background decoration */}
        <div className="hero-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid items-center gap-8 lg:gap-10 xl:gap-12 py-8 sm:py-12 lg:py-16 lg:grid-cols-[1fr_1.18fr] overflow-hidden">
          {/* Hero Content */}
          <div className="animate-[fadeInUp_.7s_ease-out_both] min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#2f75bd] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Icon name="spark" size={14} />
              <span>Precise answers, clearly explained</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <h1 className="mt-4 sm:mt-5 max-w-xl text-[28px] xs:text-[34px] sm:text-[44px] lg:text-[48px] xl:text-[52px] font-bold leading-[1.12] tracking-[-.04em] text-[#0a2b4b] break-words">
              Significant figures,
              <span className="block mt-1 bg-gradient-to-r from-[#2f75bd] to-[#60a5e8] bg-clip-text text-transparent">
                made simple.
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-slate-600">
              Count, round, and calculate with confidence. Get instant results
              plus the reasoning behind every answer.
            </p>

            {/* Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row gap-3">
              <button
                onClick={() => go("calculator")}
                className="button-primary group w-full xs:w-auto justify-center px-5 py-3 shadow-lg shadow-blue-900/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Icon name="calculator" size={17} />
                <span>Start calculating</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={16} />
                </span>
              </button>

              <button
                onClick={() => go("rules")}
                className="button-secondary w-full xs:w-auto justify-center px-5 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <Icon name="book" size={17} />
                <span>Learn the rules</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600 sm:gap-x-6">
              {[
                "No sign-up needed",
                "Step-by-step reasoning",
                "100% Free & private",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 transition hover:text-blue-700"
                >
                  <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" size={12} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none min-w-0 animate-[fadeInUp_.8s_ease-out_.15s_both]">
            <div className="absolute -inset-3 rounded-[2rem] bg-blue-200/20 blur-xl pointer-events-none" />
            <div className="relative transition duration-500 hover:-translate-y-0.5 w-full min-w-0">
              <Calculator compact />
            </div>
          </div>
        </div>
      </section>

      {/* 01 · Sig Fig Rules */}
      <SigFigRulesSection />

      {/* 02 · Trust bar */}
      <TrustBarSection />

      

      {/* 04 · Quick reference table */}
      <QuickReferenceSection />

      {/* 05 · How it works */}
      <HowItWorksSection />

      {/* 06 · Common mistakes */}
      <CommonMistakesSection />

      {/* 07 · Who it’s for */}
      <AudienceSection />
      

      {/* 08 · Learn */}
      <LearnSection go={go} />
      {/* 03 · Features */}
      <FeaturesSection />

      {/* 09 · FAQ */}
      <FaqSection />

      {/* 10 · Conversion Strip */}
      <CtaSection go={go} />
    </>
  );
}
