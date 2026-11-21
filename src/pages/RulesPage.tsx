import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { rules } from "../data/rules";

interface RulesPageProps {
  go: (p: Page) => void;
}

export function RulesPage({ go }: RulesPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Learning guide"
        title="Significant figures rules"
        text="Six straightforward rules for deciding which digits communicate precision—and why."
        icon={<Icon name="book" size={14} />}
      />

      <main className="site-container py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {rules.map((rule) => (
            <article className="rule-card" key={rule.number}>
              <div className="rule-number font-mono">{rule.number}</div>
              <div>
                <h2>{rule.title}</h2>
                <p>{rule.description}</p>
                <div className="example-strip font-mono">
                  <span className="font-sans font-semibold text-xs text-slate-400 mr-2 uppercase tracking-wide">
                    Example:
                  </span>
                  {rule.example}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#edf6ff] p-7 sm:p-10 border border-blue-100">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow">
                <Icon name="spark" size={13} />
                <span>Quick reference</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#102e50]">
                Ready to put the rules into practice?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Try any value in our interactive calculator and see which digits are counted in real time.
              </p>
            </div>
            <button
              onClick={() => go("calculator")}
              className="button-primary px-6 py-3 shadow-md whitespace-nowrap"
            >
              <Icon name="calculator" size={17} />
              <span>Open calculator</span>
              <Icon name="arrow" size={17} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
