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
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">
        {links.map(([label, page]) => (
          <button
            key={page}
            onClick={() => go(page)}
            className="w-fit text-left text-sm text-slate-300 transition hover:text-white"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Footer({ go }: FooterProps) {
  return (
    <footer className="mt-24 bg-[#092744] text-white">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <Logo onClick={() => go("home")} dark />
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">
            Accurate, transparent significant figures tools built for students, teachers,
            scientists, and engineers.
          </p>
        </div>

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

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>© 2025 SigFigLab. All rights reserved.</span>
          <span>Built for learning, designed for precision & clarity.</span>
        </div>
      </div>
    </footer>
  );
}
