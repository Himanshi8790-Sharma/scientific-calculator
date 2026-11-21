import React from "react";
import { PageHero } from "../components/common/PageHero";
import { Calculator } from "../components/calculator/Calculator";
import { Icon } from "../components/common/Icons";

export function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="Calculate with confidence"
        text="Count, round, convert, or perform operations—all with transparent, step-by-step reasoning."
        icon={<Icon name="calculator" size={14} />}
      />

      <main className="site-container -mt-10 relative z-10">
        <Calculator />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Accurate by design",
              desc: "Standard scientific conventions and uncertainty guidelines applied consistently.",
              icon: "target",
            },
            {
              title: "Built for learning",
              desc: "Every calculation displays a step-by-step deduction of the exact rule used.",
              icon: "book",
            },
            {
              title: "100% Private & local",
              desc: "All calculations happen locally in your browser. No cookies, tracking, or remote storage.",
              icon: "shield",
            },
          ].map((item) => (
            <div className="info-card small" key={item.title}>
              <span className="icon-box">
                <Icon name={item.icon} size={18} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
