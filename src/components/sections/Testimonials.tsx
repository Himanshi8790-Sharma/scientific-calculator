import React, { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Emily Carter",
    role: "Chemistry Student",
    initials: "EC",
    text: "This calculator made significant figures much easier to understand. I can check my answers and actually learn why certain digits count.",
  },
  {
    name: "Daniel Brooks",
    role: "Physics Student",
    initials: "DB",
    text: "I use it regularly for physics problems. The step-by-step explanations make rounding and measurement precision much easier to understand.",
  },
  {
    name: "Sophia Williams",
    role: "Science Educator",
    initials: "SW",
    text: "A simple and useful tool for explaining significant figures. It makes calculation rules and measurement precision easier for students to follow.",
  },
  {
    name: "James Miller",
    role: "University Student",
    initials: "JM",
    text: "Having significant figures, rounding, and scientific notation in one place saves time. Everything is easy to find and simple to use.",
  },
  {
    name: "Olivia Wilson",
    role: "Laboratory Student",
    initials: "OW",
    text: "The precision breakdown is my favorite feature. It helps me understand which digits matter when recording measurements and doing lab calculations.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];
  const left = testimonials[(active - 1 + testimonials.length) % testimonials.length];
  const right = testimonials[(active + 1) % testimonials.length];

  return (
    <section className="relative overflow-hidden bg-[var(--brand-bg)] py-12 ">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-[var(--brand-light)]/60 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-100/50 blur-[100px]" />

      <div className="site-container relative z-10">

        {/* Heading */}
        <div className="mb-9 text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.15em] text-[var(--brand-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]" />
            USER EXPERIENCES
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-dark)] sm:text-3xl lg:text-4xl">
            What Learners{" "}
            <span className="text-[var(--brand-primary)]">
              Say About Us
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--brand-text-muted)] sm:text-base">
            Making calculations easier, learning precision better, and
            simplifying science one step at a time.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-0 sm:px-5 lg:px-0">

          {/* Left Preview - Desktop */}
          <div className="pointer-events-none absolute left-0 hidden w-[36%] -translate-x-4 scale-[0.88] opacity-40 transition-all duration-700 xl:block">
            <PreviewCard testimonial={left} />
          </div>

          {/* Right Preview - Desktop */}
          <div className="pointer-events-none absolute right-0 hidden w-[36%] translate-x-4 scale-[0.88] opacity-40 transition-all duration-700 xl:block">
            <PreviewCard testimonial={right} />
          </div>

          {/* Main Card */}
          <div className="relative z-10 w-full max-w-[620px]">
            <article
              key={active}
              className="testimonial-card-enter relative overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-white p-5 shadow-[0_15px_45px_-15px_rgba(23,79,132,0.20)] sm:rounded-3xl sm:p-7 md:p-9"
            >
              {/* Decorative Quote */}
              <span className="pointer-events-none absolute right-5 top-3 select-none font-serif text-7xl leading-none text-[var(--brand-subtle)] sm:right-8 sm:top-4 sm:text-8xl">
                “
              </span>

              {/* Stars */}
              <div className="relative z-10 flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-base sm:text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Review */}
              <p className="relative z-10 mt-5 min-h-[110px] text-sm leading-7 text-[var(--brand-text)] sm:mt-6 sm:min-h-[120px] sm:text-base sm:leading-8">
                {current.text}
              </p>

              {/* User */}
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--brand-border-subtle)] pt-4 sm:mt-6 sm:pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-blue)] text-sm font-bold text-white shadow-sm sm:h-12 sm:w-12">
                  {current.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-[var(--brand-primary)] sm:text-base">
                    {current.name}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-[var(--brand-text-muted)] sm:text-sm">
                    {current.role}
                  </p>
                </div>
              </div>
            </article>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4 sm:mt-7 sm:gap-5">

              {/* Previous */}
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] transition-all duration-200 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-subtle)] active:scale-95 sm:h-10 sm:w-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    aria-label={`View testimonial ${index + 1}`}
                    aria-current={active === index ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      active === index
                        ? "w-6 bg-[var(--brand-primary)] sm:w-7"
                        : "w-2 bg-[var(--brand-border)] hover:bg-[var(--brand-sky)]"
                    }`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] transition-all duration-200 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-subtle)] active:scale-95 sm:h-10 sm:w-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Slide indicator */}
            <p className="mt-3 text-center text-[11px] text-[var(--brand-text-muted)]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      {/* Component-level animation styles (no external CSS file) */}
      <style>{`
        .testimonial-card-enter {
          animation: testimonialReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes testimonialReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.975);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-card-enter {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* Side Preview Card */
function PreviewCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="rounded-3xl border border-[var(--brand-border)] bg-white/90 p-6 shadow-md">
      <div className="mb-3 flex gap-1 text-sm text-amber-400/80">
        ★ ★ ★ ★ ★
      </div>

      <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-[var(--brand-text-muted)]">
        “{testimonial.text}”
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-[var(--brand-border-subtle)] pt-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--brand-subtle)] text-xs font-bold text-[var(--brand-primary)]">
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--brand-dark)]">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-[var(--brand-text-muted)]">
            {testimonial.role}
          </p>
        </div>
      </div>
  </article>
  );
}