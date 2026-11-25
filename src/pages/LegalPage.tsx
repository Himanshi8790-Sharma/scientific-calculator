import React, { useState, useEffect } from "react";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { pageTitles } from "../data/navigation";
import { legalContent } from "../data/legal";
import type { Page } from "../types";

interface LegalPageProps {
  kind: "privacy" | "terms" | "disclaimer";
  go?: (page: Page) => void;
}

export function LegalPage({ kind, go }: LegalPageProps) {
  const data = legalContent[kind];
  const [activeSection, setActiveSection] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
    
  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = data.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${i}`);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          return;
        }
      }
      setActiveSection(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.sections, kind]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("legal@sigfiglab.com");
    setCopiedEmail(false);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const legalTabs: { kind: "privacy" | "terms" | "disclaimer"; label: string; icon: string }[] = [
    { kind: "privacy", label: "Privacy Policy", icon: "shield" },
    { kind: "terms", label: "Terms of Service", icon: "scale" },
    { kind: "disclaimer", label: "Scientific Disclaimer", icon: "info" },
  ];

  const currentIcon = kind === "privacy" ? "shield" : kind === "terms" ? "scale" : "info";

  return (
    <div className="bg-[#fafcff] min-h-screen ">
      <PageHero
        eyebrow="Compliance & Legal Center"
        title={pageTitles[kind]}
        text={data.intro}
        icon={<Icon name={currentIcon} size={15} />}
      />

      <main className="site-container -mt-6">
        {/* Document Switcher & Utility Toolbar */}
        <div className="mb-10 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Quick Document Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
                Document:
              </span>
              {legalTabs.map((tab) => {
                const isActive = tab.kind === kind;
                return (
                  <button
                    key={tab.kind}
                    onClick={() => {
                      if (go) {
                        go(tab.kind);
                      } else {
                        window.history.pushState({}, "", `/${tab.kind}`);
                        window.location.href = `/${tab.kind}`;
                      }
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${isActive
                        ? "bg-[#0a2b4b] text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-[#eff6fd] hover:text-[#174f84] border border-slate-200/60"
                      }`}
                  >
                    <Icon name={tab.icon} size={13} className={isActive ? "text-blue-300" : "text-slate-400"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Share & Print) */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 sm:border-0 sm:pt-0">
              <button
                onClick={handleCopyLink}
                title="Copy direct link to document"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-[#eff6fd] hover:text-[#174f84] transition"
              >
                <Icon name={copiedLink ? "check" : "copy"} size={13} className={copiedLink ? "text-emerald-600" : ""} />
                <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
              </button>
              <button
                onClick={handlePrint}
                title="Print document for records"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-[#eff6fd] hover:text-[#174f84] transition"
              >
                <Icon name="book" size={13} />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sticky On-Page Nav Sidebar */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-blue-100/80 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e7f2fc] text-[#174f84]">
                    <Icon name="book" size={13} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#102e50]">
                    On This Page
                  </span>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {data.sections.length} clauses
                </span>
              </div>

              <nav className="mt-4 space-y-1">
                {data.sections.map(([title], i) => {
                  const isCurrent = activeSection === i;
                  return (
                    <a
                      key={title}
                      href={`#section-${i}`}
                      onClick={() => setActiveSection(i)}
                      className={`group flex items-start gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${isCurrent
                          ? "bg-[#eaf3fc] font-semibold text-[#145388] shadow-xs"
                          : "font-medium text-slate-600 hover:bg-[#f4f8fc] hover:text-[#185891]"
                        }`}
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-mono transition-colors ${isCurrent
                            ? "bg-[#174f84] text-white"
                            : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-[#174f84]"
                          }`}
                      >
                        {i + 1}
                      </span>
                      <span className="leading-snug">{title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Document Metadata Pill Box */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs text-xs text-slate-500 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-[#102e50]">
                <Icon name="shield" size={14} className="text-[#1f64a3]" />
                <span>Document Status</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                <span>Standard</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active & Binding
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Version</span>
                <span className="font-mono font-medium text-slate-700">v2.4 (2025)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Jurisdiction</span>
                <span className="font-medium text-slate-700">Universal STEM</span>
              </div>
            </div>
          </aside>

          {/* Legal Document Content */}
          <article className="space-y-6">
            {/* Header timestamp banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100/70 bg-[#eff6fd]/70 px-4 py-3 text-xs">
              <div className="flex items-center gap-2 text-[#174f84] font-medium">
                <Icon name="clock" size={14} />
                <span>Last updated & verified: <strong>May 15, 2025</strong></span>
              </div>
              <span className="text-slate-400 text-[11px]">
                Standard Revision Reference ID: <code className="font-mono font-semibold text-slate-600">SFL-LEG-2025A</code>
              </span>
            </div>

            {/* Document Sections */}
            {data.sections.map(([title, content], i) => (
              <section
                id={`section-${i}`}
                key={title}
                className="scroll-mt-28 rounded-2xl border border-slate-200/80 bg-white p-7 lg:p-8 shadow-xs hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#edf5fc] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#174f84]">
                    Section 0{i + 1}
                  </span>
                </div>
                <h2 className="mt-3 text-lg lg:text-xl font-bold tracking-tight text-[#0a2b4b]">
                  {title}
                </h2>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-slate-600">
                  {content}
                </p>
              </section>
            ))}

            {/* Questions or Concerns Contact Box */}
            <div className="mt-12 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-white to-[#f4f9fe] p-7 lg:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#174f84] text-white shadow-xs">
                  <Icon name="mail" size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-[#0a2b4b]">
                    Questions or institutional concerns?
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If you have questions about this policy or institutional terms, contact our legal counsel at:{" "}
                    <a
                      href="mailto:legal@sigfiglab.com"
                      className="font-semibold text-[#174f84] underline decoration-blue-200 underline-offset-2 hover:decoration-[#174f84]"
                    >
                      legal@sigfiglab.com
                    </a>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="mailto:legal@sigfiglab.com"
                      className="button-primary px-4 py-2 text-xs"
                    >
                      <Icon name="mail" size={14} />
                      <span>Email Legal Counsel</span>
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="button-secondary px-4 py-2 text-xs"
                    >
                      <Icon name={copiedEmail ? "check" : "copy"} size={14} className={copiedEmail ? "text-emerald-600" : ""} />
                      <span>{copiedEmail ? "Copied: legal@sigfiglab.com" : "Copy Email"}</span>
                    </button>
                    <span className="text-[11px] text-slate-400">
                      Typical reply time: 24–48 business hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
