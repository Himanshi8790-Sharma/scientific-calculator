import React from "react";
import type { Page } from "../../types";
import { Logo } from "./Logo";

interface FooterProps {
  go: (page: Page) => void;
}

interface FooterGroupProps {
  title: string;
  links: [string, Page][];
  go: (p: Page) => void;
}

function FooterGroup({ title, links, go }: FooterGroupProps) {
  return (
    <div>
      <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/70">
        {title}
      </h3>

      <ul className="flex flex-col gap-3">
        {links.map(([label, page]) => (
          <li key={page}>
            <button
              onClick={() => go(page)}
              className="group inline-flex items-center text-left text-sm text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              <span>{label}</span>
              <span className="ml-1.5 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ go }: FooterProps) {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#092744] text-white sm:mt-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/[0.04]" />

      {/* Main Footer */}
      <div className="site-container relative">
        <div className="grid grid-cols-1 gap-12 py-14 sm:py-16 md:grid-cols-2 md:gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">

          {/* Brand */}
          <div className="max-w-sm">
            <div className="mb-5 inline-block">
              <Logo onClick={() => go("home")} dark />
            </div>

            <p className="max-w-xs text-sm leading-7 text-slate-300/80">
              Accurate, transparent significant figures tools built for students,
              teachers, scientists, and engineers.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-300">
                Built for precision & learning
              </span>
            </div>
          </div>

          {/* Navigation groups */}
          <FooterGroup
            title="Tools"
            links={[
              ["Calculator", "calculator"],
              ["Rules", "rules"],
              ["Examples", "examples"],
              ["How it works", "how-it-works"],
            ]}
            go={go}
          />

          <FooterGroup
            title="Resources"
            links={[
              ["About us", "about"],
              ["Learning center", "blog"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ]}
            go={go}
          />

          <FooterGroup
            title="Legal"
            links={[
              ["Privacy policy", "privacy"],
              ["Terms of use", "terms"],
              ["Disclaimer", "disclaimer"],
            ]}
            go={go}
          />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08]">
          <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <p className="text-xs leading-5 text-slate-400">
              © {new Date().getFullYear()} SigFigLab. All rights reserved.
            </p>

            <p className="text-xs leading-5 text-slate-400 sm:text-right">
              Built for learning, designed for precision & clarity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}