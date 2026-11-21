import React from "react";
import type { Page } from "../../types";
import { Icon } from "../common/Icons";

interface CtaSectionProps {
  go: (p: Page) => void;
  title?: string;
  subtitle?: string;
}

export function CtaSection({
  go,
  title = "Make every digit count.",
  subtitle = "Get a precise answer and understand the underlying scientific method in seconds.",
}: CtaSectionProps) {
  return (
    <section className="site-container my-12">
      <div className="rounded-3xl bg-[#eaf4fd] px-6 py-12 text-center sm:px-12 border border-blue-100/60 shadow-xs">
        <h2 className="text-2xl font-semibold tracking-tight text-[#102e50] sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          {subtitle}
        </p>
        <button
          onClick={() => go("calculator")}
          className="button-primary mt-6 px-6 py-3 shadow-md"
        >
          <Icon name="calculator" size={17} />
          <span>Try the calculator</span>
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  );
}
