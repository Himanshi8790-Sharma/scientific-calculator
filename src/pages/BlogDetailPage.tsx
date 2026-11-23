import React, { useEffect, useState } from "react";
import type { Page, BlogPostItem } from "../types";
import { Icon } from "../components/common/Icons";
import { posts, blogArticleData } from "../data/blog";

interface BlogDetailPageProps {
  go: (p: Page) => void;
}

export function BlogDetailPage({ go }: BlogDetailPageProps) {
  const [activeTitle, setActiveTitle] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem("selected_blog_title");
      if (saved && posts.some((p) => p.title === saved)) {
        return saved;
      }
    } catch {
      // Fallback if sessionStorage is unavailable
    }
    return posts[0].title;
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const post: BlogPostItem =
    posts.find((p) => p.title === activeTitle) || posts[0];
  const article =
    blogArticleData[post.title] ||
    blogArticleData["Why significant figures matter in real-world science"];

  // Related articles (excluding current post)
  const relatedPosts = posts.filter((p) => p.title !== post.title).slice(0, 2);

  const switchArticle = (title: string) => {
    try {
      sessionStorage.setItem("selected_blog_title", title);
    } catch {
      // Fallback
    }
    setActiveTitle(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Ignore copy error
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTitle]);

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
    <main className="min-h-screen bg-white  text-[#142c44]">
      {/* Top Header / Breadcrumb Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#f5f9fd] via-[#f8fbfe] to-white py-14 ">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />

        <div className="site-container relative z-10 max-w-4xl text-center">
          {/* Top Breadcrumb & Share Actions */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => go("blog")}
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#174f84] shadow-2xs transition-all hover:border-blue-200 hover:bg-blue-50/50"
              aria-label="Back to Learning Center"
            >
              <span className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1">
                <Icon name="arrow" size={13} />
              </span>
              <span>All guides</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-2xs transition-all hover:border-slate-300 hover:text-slate-800"
              title="Copy guide link"
            >
              <Icon
                name={copiedLink ? "check" : "copy"}
                size={13}
                className={copiedLink ? "text-emerald-600" : "text-slate-400"}
              />
              <span>{copiedLink ? "Link copied!" : "Share"}</span>
            </button>
          </div>

          {/* Topic Badge */}
          <div className="mb-4 flex items-center justify-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide uppercase ${getTagColor(
                post.tag,
              )}`}
            >
              <Icon name={getTagIcon(post.tag)} size={13} />
              <span>{post.tag}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#0a2b4b] sm:text-4xl lg:text-[46px]">
            {post.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {post.desc}
          </p>

          {/* Metadata bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-100 text-[10px] text-blue-700 font-bold">
                Sf
              </span>
              <span>SigFigLab Editorial</span>
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="flex items-center gap-1 text-slate-600">
              <Icon name="shield" size={13} className="text-blue-600" />
              <span>Peer-Reviewed Science Guide</span>
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="flex items-center gap-1 text-slate-600">
              <Icon name="clock" size={13} />
              <span>{post.time}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <article className="site-container max-w-3xl px-5 sm:px-6 pt-12 ">
        {/* Magazine Lead Excerpt */}
        <div className="relative rounded-2xl border-l-4 border-[#174f84] bg-gradient-to-r from-[#f0f6fc] via-[#f7faff] to-white p-6 sm:p-7 text-base sm:text-lg font-normal leading-relaxed text-slate-700 shadow-2xs">
          <p>{article.lead}</p>
        </div>

        {/* Dynamic Sections */}
        {article.sections.map((section, sIndex) => (
          <section key={sIndex} className="mt-12">
            {/* Section Heading */}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0e2c4c]">
              {section.heading}
            </h2>

            {/* Paragraphs */}
            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              {section.body.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>

            {/* Scientific Principle Callout Box */}
            {section.callout && (
              <div className="my-8 overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-[#f2f8fe] via-[#f8fbfe] to-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#144f85]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100/70 text-blue-700">
                    <Icon name="spark" size={15} />
                  </div>
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#144f85]">
                    {section.callout.title}
                  </strong>
                </div>

                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-700 font-medium">
                  {section.callout.text}
                </p>
              </div>
            )}

            {/* Formatted Calculation Example Card */}
            {section.mathExample && (
              <div className="my-8 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs transition-colors hover:border-blue-200">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <Icon name="calculator" size={13} />
                    <span>Calculation Breakdown</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    Step-by-step
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200/70 bg-[#f8fbfe] px-4 py-3 font-mono text-sm sm:text-base text-slate-700">
                  {section.mathExample.calculation}
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Reported result:
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#102e50]">
                    {section.mathExample.result}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 border-t border-slate-100 pt-3">
                  {section.mathExample.explanation}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Interactive Calculator Banner */}
        <section className="mt-14 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#edf6ff] via-[#f5f9fd] to-white p-7 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <Icon name="calculator" size={16} />
            <span>Apply this rule in practice</span>
          </div>

          <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#102e50]">
            Check your next calculation now
          </h3>

          <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
            Use our interactive calculator to apply precision rules, verify
            significant figures, and inspect step-by-step reasoning in real time.
          </p>

          <button
            onClick={() => go("calculator")}
            className="button-primary mt-5 px-6 py-3 shadow-md"
          >
            <Icon name="calculator" size={17} />
            <span>Open interactive calculator</span>
            <Icon name="arrow" size={16} />
          </button>
        </section>

        {/* Related Guides Cross-Navigation */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-slate-200/80 pt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#102e50]">
                  Continue Learning
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore related precision and measurement guides
                </p>
              </div>

              <button
                onClick={() => go("blog")}
                className="text-xs font-semibold text-[#185891] hover:underline"
              >
                All guides →
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <button
                  key={related.title}
                  onClick={() => switchArticle(related.title)}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-5 text-left shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span className="text-blue-700 uppercase tracking-wider">
                      {related.tag}
                    </span>
                    <span>{related.time}</span>
                  </div>

                  <h4 className="mt-2 text-sm font-semibold text-[#102e50] group-hover:text-blue-700 transition-colors">
                    {related.title}
                  </h4>

                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                    {related.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#185891]">
                    <span>Read guide</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => go("blog")}
            className="button-secondary px-6 py-2.5 text-xs"
          >
            ← Back to all learning guides
          </button>
        </div>
      </article>
    </main>
  );
}
