import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";

interface AboutPageProps {
  go: (p: Page) => void;
}

export function AboutPage({ go }: AboutPageProps) {
  return (
    <>
      <PageHero
        eyebrow="About SigFigLab"
        title="Precision should feel approachable"
        text="We build scientific calculation tools that explain themselves."
        icon={<Icon name="target" size={14} />}
      />

      <main className="site-container py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="content-title">
              Built to close the gap between an answer and genuine understanding.
            </h2>
            <div className="content-copy">
              <p>
                Significant figures are a foundational scientific concept with enormous real-world consequences. They communicate the true precision of measurements and prevent scientists and engineers from claiming more certainty than experimental data justifies.
              </p>
              <p>
                Too many online calculators provide an opaque final number without context. SigFigLab was built to make every calculation transparent—providing learners with the answer, the applied scientific rule, and the logical steps that connect the two.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "target",
                title: "Accuracy",
                desc: "Strictly adheres to standard STEM conventions, IUPAC recommendations, and physics curricula.",
              },
              {
                icon: "book",
                title: "Clarity",
                desc: "Transparent, plain-English explanations without unnecessary academic pretension.",
              },
              {
                icon: "shield",
                title: "Privacy First",
                desc: "All calculations execute strictly client-side in your browser. Nothing is ever sent to a server.",
              },
              {
                icon: "spark",
                title: "Accessibility",
                desc: "Free, fully responsive, and fast on desktops, tablets, and smartphones alike.",
              },
            ].map((item) => (
              <div className="info-card small" key={item.title}>
                <div className="icon-box">
                  <Icon name={item.icon} size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="eyebrow mx-auto">
            <Icon name="spark" size={13} />
            <span>Our principle</span>
          </div>
          <blockquote className="mx-auto mt-5 max-w-3xl text-2xl font-medium leading-relaxed tracking-tight text-[#102e50] sm:text-3xl">
            “A useful calculator gives you an answer. A great one helps you understand why it is right.”
          </blockquote>
          <button
            onClick={() => go("contact")}
            className="button-secondary mt-8 px-6 py-3 shadow-xs"
          >
            <Icon name="mail" size={17} />
            <span>Get in touch with us</span>
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </main>
    </>
  );
}
