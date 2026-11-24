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
  return (
    <section className="site-container py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="eyebrow mx-auto mb-2.5">
          <span>QUICK REFERENCE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
          Quick reference
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Common numbers and how many significant figures they have.
        </p>
      </div>

      {/* Table Container */}
      <div className="mt-10 mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-[#f8fbfe] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th scope="col" className="px-3.5 py-3 sm:px-6 sm:py-3.5">
                  Number
                </th>
                <th scope="col" className="px-3 py-3 sm:px-6 sm:py-3.5 text-center">
                  Sig figs
                </th>
                <th scope="col" className="px-3.5 py-3 sm:px-6 sm:py-3.5">
                  Why
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referenceData.map((row) => (
                <tr
                  key={row.number}
                  className="transition-colors hover:bg-[#f6faff]"
                >
                  <td className="whitespace-nowrap px-3.5 py-3 sm:px-6 sm:py-3.5 font-mono font-bold text-[#102e50]">
                    {row.number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-3.5 text-center font-bold text-[#174f84]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#edf5fc] text-xs">
                      {row.sigFigs}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 sm:px-6 sm:py-3.5 text-slate-600">
                    {row.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
