import React from "react";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { pageTitles } from "../data/navigation";
import { legalContent } from "../data/legal";

interface LegalPageProps {
  kind: "privacy" | "terms" | "disclaimer";
}

export function LegalPage({ kind }: LegalPageProps) {
  const data = legalContent[kind];

  return (
    <>
      <PageHero
        eyebrow="Legal & Compliance"
        title={pageTitles[kind]}
        text={data.intro}
        icon={<Icon name="shield" size={14} />}
      />

      <main className="site-container py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sticky On-Page Nav */}
          <aside className="h-fit rounded-2xl bg-[#f4f8fc] p-5 lg:sticky lg:top-24 border border-blue-100/50">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              On this page
            </div>
            <nav className="mt-3 space-y-2">
              {data.sections.map(([title], i) => (
                <a
                  key={title}
                  href={`#section-${i}`}
                  className="block text-xs font-medium text-slate-600 hover:text-[#1f64a3] transition"
                >
                  {title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Legal Document Content */}
          <article className="legal-copy">
            <div className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-400">
              <Icon name="clock" size={13} />
              <span>Last updated: May 15, 2025</span>
            </div>

            {data.sections.map(([title, content], i) => (
              <section id={`section-${i}`} key={title} className="scroll-mt-24">
                <h2>{title}</h2>
                <p>{content}</p>
              </section>
            ))}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-base font-semibold text-[#102e50]">Questions or concerns?</h2>
              <p className="mt-1 text-sm text-slate-600">
                If you have questions about this policy or institutional terms, contact our legal counsel at:{" "}
                <a
                  href="mailto:legal@sigfiglab.com"
                  className="font-medium text-[#185891] hover:underline"
                >
                  legal@sigfiglab.com
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
