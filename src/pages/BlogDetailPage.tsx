import React from "react";
import type { Page } from "../types";
import { Icon } from "../components/common/Icons";

interface BlogDetailPageProps {
  go: (p: Page) => void;
}

export function BlogDetailPage({ go }: BlogDetailPageProps) {
  return (
    <main>
      <section className="bg-[#f4f8fc] py-16 sm:py-20 border-b border-slate-200/60">
        <div className="site-container max-w-4xl text-center">
          <button
            onClick={() => go("blog")}
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3675b0] hover:underline"
          >
            <span className="rotate-180">
              <Icon name="arrow" size={13} />
            </span>
            <span>BACK TO LEARNING CENTER</span>
          </button>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-.04em] text-[#0a2b4b] sm:text-5xl">
            Why significant figures matter in real-world science
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Precision is not about showing more decimal places. It is about honestly communicating what your physical measuring instrument can actually support.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">SigFig Editorial Team</span>
            <span>•</span>
            <span>Peer Reviewed & Updated</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Icon name="clock" size={13} />
              6 min read
            </span>
          </div>
        </div>
      </section>

      <article className="prose-custom mx-auto max-w-3xl px-5 py-16">
        <p className="lead">
          Imagine measuring a lab bench with an ordinary metric ruler and recording its length as 121.43786 centimeters. While the number looks extraordinarily sophisticated, an ordinary ruler could never justify that degree of certainty. Significant figures exist to keep our calculations scientifically honest.
        </p>

        <h2>1. Precision communicates measurement certainty</h2>
        <p>
          Every physical measurement has an inherent uncertainty limit. The instrument mechanism, resolution, environmental factors, and observer technique all dictate how confidently a quantity is known. Significant figures ensure that this precision is neither inflated nor lost when values pass through formulas.
        </p>

        <div className="article-callout rounded-xl border border-blue-200">
          <div className="flex items-center gap-2">
            <Icon name="atom" size={16} className="text-[#24659f]" />
            <strong>Core Scientific Principle</strong>
          </div>
          <p>
            Significant figures are not merely digits to tally for a test. They are a universal shorthand used across physics, chemistry, biology, and engineering to express measurement confidence.
          </p>
        </div>

        <h2>2. More digits do not equal greater accuracy</h2>
        <p>
          A pocket calculator or computer script may spit out twelve decimal digits, but those extra decimals are mathematical artifacts rather than physical reality. If your least precise measurement contains only two significant figures, a product or quotient derived from it cannot claim more than two significant figures.
        </p>

        <h3>Multiplication Example in Practice</h3>
        <div className="math-example">
          <span className="text-slate-500 font-mono">4.2 cm (2 sig figs) × 3.15 cm (3 sig figs)</span>
          <strong className="font-mono text-2xl text-[#174f84]">13 cm²</strong>
          <small className="text-slate-500">
            The raw calculator output is 13.23, but because 4.2 has only two significant digits, the final reported answer must be rounded to 2 significant figures.
          </small>
        </div>

        <h2>3. High-stakes applications in modern engineering</h2>
        <p>
          Correct precision reporting prevents real-world disasters. From dosage titrations in pharmacology where rounding prematurely could cause toxic overdoses, to aerospace structural calculations where tolerance stack-ups can lead to mechanical failure, respecting significant figures ensures that conclusions never overstate the evidence.
        </p>

        <h2>4. The golden rule: Guard digits during calculations</h2>
        <p>
          When solving multi-step problems, carry at least two extra "guard digits" through all intermediate stages, and apply significant figure rounding rules only once at the very final result. This simple discipline prevents intermediate rounding errors from distorting your answer.
        </p>

        <div className="mt-12 rounded-3xl bg-[#edf6ff] p-7 sm:p-9 border border-blue-100 text-left">
          <h3 className="mt-0 text-xl font-semibold text-[#102e50]">
            Check your next calculation now
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Use our interactive calculator to apply correct rounding and see the step-by-step reasoning in real time.
          </p>
          <button
            onClick={() => go("calculator")}
            className="button-primary mt-4 px-5 py-2.5 shadow-md"
          >
            <Icon name="calculator" size={17} />
            <span>Open calculator</span>
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </article>
    </main>
  );
}
