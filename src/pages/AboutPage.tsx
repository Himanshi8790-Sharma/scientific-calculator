import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";

interface AboutPageProps {
  go: (p: Page) => void;
}

export function AboutPage({ go }: AboutPageProps) {
  const pillars = [
    {
      icon: "target",
      title: "Accuracy",
      desc: "Strictly adheres to standard STEM conventions, IUPAC recommendations, and physics curricula.",
      badge: "Standards Compliant",
    },
    {
      icon: "book",
      title: "Clarity",
      desc: "Transparent, plain-English explanations without unnecessary academic pretension.",
      badge: "Pedagogy First",
    },
    {
      icon: "shield",
      title: "Privacy First",
      desc: "All calculations execute strictly client-side in your browser. Nothing is ever sent to a server.",
      badge: "100% Client-Side",
    },
    {
      icon: "spark",
      title: "Accessibility",
      desc: "Free, fully responsive, and fast on desktops, tablets, and smartphones alike.",
      badge: "Universal Access",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="About SigFigLab"
        title="Precision should feel approachable"
        text="We build scientific calculation tools that explain themselves."
        icon={<Icon name="target" size={14} />}
      />

      <main className="site-container pt-12 ">
        {/* Core Mission & Pillars Section */}
        <section className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <Icon name="spark" size={13} />
              <span>Our Mission</span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0a2b4b] sm:text-3xl lg:text-[34px] lg:leading-[1.2]">
              Built to close the gap between an answer and genuine understanding.
            </h2>

            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              <p>
                Significant figures are a foundational scientific concept with
                enormous real-world consequences. They communicate the true
                precision of measurements and prevent scientists and engineers
                from claiming more certainty than experimental data justifies.
              </p>
              <p>
                Too many online calculators provide an opaque final number
                without context. SigFigLab was built to make every calculation
                transparent—providing learners with the answer, the applied
                scientific rule, and the logical steps that connect the two.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.08)]"
              >
                {/* Card Top: Icon & Micro Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100/70 shadow-2xs transition-colors duration-300 group-hover:bg-[#102e50] group-hover:text-white">
                    <Icon name={item.icon} size={18} />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.badge}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="mt-4 text-base font-semibold text-[#102e50] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>

                {/* Bottom Accent Hover Line */}
                <div className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-gradient-to-r from-blue-500 to-[#102e50] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Principle Quote Showcase Section */}
        <section className="relative mt-16 sm:mt-20 overflow-hidden rounded-[28px] border border-blue-100/80 bg-gradient-to-br from-[#f6faff] via-[#edf5fd] to-white px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xs">
          {/* Decorative quotation mark */}
          <span className="pointer-events-none absolute left-6 top-4 font-serif text-8xl leading-none text-blue-200/30 sm:left-12 sm:top-6 sm:text-9xl select-none">
            “
          </span>

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Eyebrow */}
            <div className="eyebrow mx-auto">
              <Icon name="spark" size={13} />
              <span>Our principle</span>
            </div>

            {/* Blockquote */}
            <blockquote className="mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-[#0a2b4b]">
              “A useful calculator gives you an answer. A great one helps you
              understand why it is right.”
            </blockquote>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => go("contact")}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-6 py-3.5 text-sm font-semibold text-[#102e50] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <Icon name="mail" size={17} />
                <span>Get in touch with us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={17} />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
