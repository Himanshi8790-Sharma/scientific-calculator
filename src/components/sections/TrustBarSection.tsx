import React from "react";
import { Icon } from "../common/Icons";

const trustItems = [
  {
    label: "Free to use",
    subtitle: "100% free tool",
    icon: "check",
  },
  {
    label: "No sign-up",
    subtitle: "Zero accounts needed",
    icon: "shield",
  },
  {
    label: "Instant results",
    subtitle: "Real-time calculation",
    icon: "spark",
  },
  {
    label: "Works on mobile",
    subtitle: "Phone, tablet & desktop",
    icon: "calculator",
  },
];

export function TrustBarSection() {
  return (
    <section className="site-container py-7">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-100/80 bg-gradient-to-br from-white via-[#f8fbfe] to-[#edf5fd]/60 p-5 sm:p-8 lg:p-10 shadow-xs">
        {/* Decorative background blurs */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-sky-100/40 blur-2xl" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <div className="eyebrow mx-auto mb-2.5">
            <Icon name="check" size={12} />
            <span>Built for students & researchers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a2b4b]">
            Built to be simple
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            Everything you need, nothing you don&apos;t.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="relative z-10 mt-6 sm:mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:p-4.5 shadow-xs backdrop-blur-xs transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#edf5fc] to-[#dbebfc] text-[#174f84] shadow-xs transition duration-300 group-hover:scale-105 group-hover:bg-[#174f84] group-hover:text-white">
                <Icon name={item.icon} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-[#0a2b4b] group-hover:text-[#174f84] transition-colors truncate">
                  {item.label}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400 font-medium sm:truncate">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
