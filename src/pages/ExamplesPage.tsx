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
  const categories = ["All", "Counting", "Rounding", "Operations", "Notation"];

  const visible = exampleData.filter(
    (e) =>
      filter === "All" ||
      e.category === filter ||
      (filter === "Operations" &&
        ["Multiplication", "Addition", "Division"].includes(e.category)) ||
      (filter === "Notation" && e.category === "Scientific notation"),
  );

  return (
    <>
      <PageHero
        eyebrow="Practice library"
        title="Worked examples"
        text="Follow each problem step-by-step from the raw experimental value to a properly reported answer."
        icon={<Icon name="flask" size={14} />}
      />

      <main className="site-container py-16">
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`filter-pill transition ${filter === c ? "active" : "hover:bg-slate-100"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((e) => {
            const index = exampleData.indexOf(e) + 1;
            return (
              <article className="example-card flex flex-col justify-between" key={e.problem}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="category-label">{e.category}</span>
                    <span className="text-xs font-mono text-slate-400">
                      #{index < 10 ? `0${index}` : index}
                    </span>
                  </div>
                  <h2>{e.problem}</h2>
                  <div className="space-y-2.5">
                    {e.steps.map((s, j) => (
                      <div className="flex items-start gap-2.5 text-xs leading-5 text-slate-600" key={s}>
                        <span className="step-dot shrink-0">{j + 1}</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="answer-box">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Reported Answer
                  </span>
                  <strong className="font-mono text-sm">{e.answer}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => go("calculator")}
            className="button-primary px-6 py-3 shadow-md"
          >
            <Icon name="calculator" size={17} />
            <span>Try your own problem</span>
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </main>
    </>
  );
}
