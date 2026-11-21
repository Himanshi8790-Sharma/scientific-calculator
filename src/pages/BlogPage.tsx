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

  return (
    <>
      <PageHero
        eyebrow="Learning center"
        title="Understand the numbers"
        text="Practical guides that make precision, measurement uncertainty, and scientific notation easier to master."
        icon={<Icon name="book" size={14} />}
      />

      <main className="site-container py-16">
        {/* Featured Article Card */}
        {featured && (
          <button
            onClick={() => go("blog-detail")}
            className="group grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-[#f5f9fd] text-left transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[.9fr_1.1fr]"
          >
            <div className="blog-visual">
              <div className="absolute inset-0 hero-grid opacity-60" />
              <div className="relative flex h-full items-end p-8">
                <div className="rounded-2xl bg-white p-5 shadow-xl border border-blue-50">
                  <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Measurement Example
                  </div>
                  <div className="mt-2 font-mono text-3xl font-semibold text-[#123f73]">
                    12.30 cm
                  </div>
                  <div className="mt-3 flex gap-1 font-mono">
                    {[1, 2, 3, 0].map((n, i) => (
                      <span
                        key={i}
                        className="grid h-7 w-7 place-items-center rounded-md bg-blue-100 text-xs font-bold text-blue-700"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex gap-3 text-xs font-semibold text-[#3978b2]">
                <span className="rounded-full bg-blue-100/60 px-2 py-0.5">FEATURED ARTICLE</span>
                <span className="text-slate-400 py-0.5 flex items-center gap-1">
                  <Icon name="clock" size={13} />
                  {featured.time}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#102e50] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {featured.desc}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1f64a3] group-hover:underline">
                <span>Read full guide</span>
                <Icon name="arrow" size={17} />
              </span>
            </div>
          </button>
        )}

        {/* Regular Articles Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {restPosts.map((p, i) => (
            <button
              key={p.title}
              onClick={() => go("blog-detail")}
              className="article-card text-left group"
            >
              <div className={`article-accent accent-${(i % 5) + 1}`}>
                <span className="font-mono">0{i + 2}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#3978b2]">
                  <span>{p.tag}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Icon name="clock" size={12} />
                    {p.time}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#1f64a3] group-hover:underline">
                  <span>Read guide</span>
                  <Icon name="arrow" size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
