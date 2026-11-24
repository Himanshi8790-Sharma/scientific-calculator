import React from "react";

interface ReferenceRow {
  number: string;
  sigFigs: number;
  why: string;
}

const referenceData: ReferenceRow[] = [
  { number: "1234", sigFigs: 4, why: "All non-zero digits count" },
  { number: "1005", sigFigs: 4, why: "Zeros in the middle count" },
  { number: "0.0052", sigFigs: 2, why: "Leading zeros are ignored" },
  { number: "2.50", sigFigs: 3, why: "Trailing zero after a point counts" },
  { number: "1200", sigFigs: 2, why: "Trailing zeros without a point" },
  { number: "1200.", sigFigs: 4, why: "The point makes the zeros count" },
  { number: "0.004560", sigFigs: 4, why: "Leading ignored, trailing counts" },
  { number: "6.022e23", sigFigs: 4, why: "Only 6.022 counts" },
];

export function QuickReferenceSection() {
  // Duplicate items for seamless looping
  const loopData = [...referenceData, ...referenceData];

  return (
    <section className="site-container py-10 sm:py-14 overflow-hidden">
      {/* Header */}
      <div className="mb-7">
        <div className="eyebrow mb-2">
          <span>QUICK REFERENCE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a2b4b]">
          Quick reference
        </h2>

        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Common numbers and how many significant figures they have.
        </p>
      </div>

      {/* Auto Scrolling Cards */}
      <div className="reference-marquee overflow-hidden">
        <div className="reference-track flex w-max gap-4">
          {loopData.map((row, index) => (
            <div
              key={`${row.number}-${index}`}
              className="reference-card group flex w-[260px] sm:w-[280px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-blue-200 hover:bg-[#f8fbff]"
            >
              {/* Top */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-widest text-slate-400">
                  EXAMPLE {String((index % referenceData.length) + 1).padStart(2, "0")}
                </span>

                <span className="rounded-md bg-[#f1f6fb] px-2.5 py-1 text-xs font-semibold text-[#174f84]">
                  {row.sigFigs} SF
                </span>
              </div>

              {/* Number */}
              <div className="mb-4 flex min-h-[65px] items-center">
                <span className="font-mono text-3xl font-bold tracking-tight text-[#102e50] transition-colors group-hover:text-[#1b5c96]">
                  {row.number}
                </span>
              </div>

              <div className="mb-4 h-px bg-slate-100" />

              {/* Explanation */}
              <p className="min-h-[42px] text-sm leading-6 text-slate-600">
                {row.why}
              </p>

              {/* Bottom */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Significant figures
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a2b4b] text-sm font-bold text-white">
                  {row.sigFigs}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}