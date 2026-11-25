import React from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";
import { posts } from "../data/blog";

interface BlogPageProps {
  go: (p: Page) => void;
}

export function BlogPage({ go }: BlogPageProps) {
  const featured = posts[0];
  const restPosts = posts.slice(1);

  const handleOpenBlog = (title: string) => {
    try {
      sessionStorage.setItem("selected_blog_title", title);
    } catch {
      // Fallback if sessionStorage is disabled
    }
    go("blog-detail");
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "fundamentals":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "how-to":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "study guide":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "common mistakes":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "scientific notation":
        return "bg-cyan-50 text-cyan-800 border-cyan-200/80";
      case "lab skills":
        return "bg-amber-50 text-amber-800 border-amber-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/80";
    }
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "fundamentals":
        return "spark";
      case "how-to":
        return "round";
      case "study guide":
        return "book";
      case "common mistakes":
        return "info";
      case "scientific notation":
        return "atom";
      case "lab skills":
        return "flask";
      default:
        return "book";
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Learning center"
        title="Understand the numbers"
        text="Practical guides that make precision, measurement uncertainty, and scientific notation easier to master."
        icon={<Icon name="book" size={14} />}
      />

      <main className="site-container pt-12 ">
        {/* Featured Article Card */}
        {featured && (
          <section className="mb-10">
            <button
              onClick={() => handleOpenBlog(featured.title)}
              className="group grid w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white text-left shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.08)] lg:grid-cols-[.95fr_1.05fr]"
            >
              {/* Visual Side */}
              <div className="relative min-h-[280px] sm:min-h-[320px] overflow-hidden bg-gradient-to-br from-[#0c2f52] to-[#164870] p-7 sm:p-10 flex flex-col justify-between">
                <div className="absolute inset-0 hero-grid opacity-30" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur-xs">
                    <Icon name="spark" size={13} />
                    <span>FEATURED EDITORIAL</span>
                  </span>
                  <span className="font-mono text-xs text-blue-200/70">
                    Guide #01
                  </span>
                </div>

                <div className="relative z-10 mt-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur-xs border border-white/40">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span>Precision Anatomy</span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700 font-mono">
                      4 Sig Figs
                    </span>
                  </div>

                  <div className="mt-2 font-mono text-3xl font-bold text-[#102e50]">
                    12.30 cm
                  </div>

                  <div className="mt-3 flex items-center gap-1 font-mono">
                    {["1", "2", ".", "3", "0"].map((char, i) => (
                      <span
                        key={i}
                        className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-bold ${char === "."
                            ? "text-slate-400"
                            : "bg-blue-100 text-blue-700 border border-blue-200/50"
                          }`}
                      >
                        {char}
                      </span>
                    ))}
                    <span className="ml-2 text-[11px] text-slate-500 font-sans font-medium">
                      (Trailing zero is significant)
                    </span>
                  </div>
                </div>
              </div>   

              {/* Text Side */}
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${getTagColor(
                      featured.tag,
                    )}`}
                  >
                    <Icon name={getTagIcon(featured.tag)} size={12} />
                    <span>{featured.tag}</span>
                  </span>

                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Icon name="clock" size={12} />
                    {featured.time}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-[#102e50] leading-snug">
                  {featured.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {featured.desc}
                </p>

                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#185891] group-hover:text-[#0b2d4d] transition-colors">
                  <span>Read complete guide</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="arrow" size={16} />
                  </span>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((p, i) => {
              const globalIndex = i + 2;
              const tagColor = getTagColor(p.tag);
              const tagIcon = getTagIcon(p.tag);

              return (
                <button
                  key={p.title}
                  onClick={() => handleOpenBlog(p.title)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 text-left shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.08)]"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider uppercase ${tagColor}`}
                      >
                        <Icon name={tagIcon} size={12} />
                        <span>{p.tag}</span>
                      </span>

                      <span className="font-mono text-xs font-semibold text-slate-400">
                        #{globalIndex < 10 ? `0${globalIndex}` : globalIndex}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-5">
                      <h3 className="text-lg font-semibold tracking-tight text-[#102e50] leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Icon name="clock" size={13} />
                      {p.time}
                    </span>

                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#185891] group-hover:text-[#0b2d4d] transition-colors">
                      <span>Read guide</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <Icon name="arrow" size={14} />
                      </span>
                    </span>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-[#102e50] transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="relative mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2d4d] via-[#123d63] to-[#164b73] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-white/[0.06]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-100">
              <Icon name="atom" size={13} />
              <span>Interactive Learning</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Test your understanding in real time
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-blue-100/80">
              Put these concepts into practice. Count significant figures, test
              rounding rules, and calculate answers with step-by-step explanations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => go("calculator")}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#103454] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <Icon name="calculator" size={16} />
                <span>Open calculator</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={16} />
                </span>
              </button>

              <button
                onClick={() => go("rules")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30"
              >
                <Icon name="book" size={16} />
                <span>Review all 6 rules</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
