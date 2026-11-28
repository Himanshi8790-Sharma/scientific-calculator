import React from "react";
import { Icon } from "../common/Icons";

const audienceList = [
  {
    title: "Students",
    description: "Check homework and learn the rule behind each answer.",
    icon: "book",
  },
  {
    title: "Teachers",
    description: "Build answer keys and show the reasoning in class.",
    icon: "target",
  },
  {
    title: "Lab technicians",
    description: "Report measurements with the right precision.",
    icon: "flask",
  },
  {
    title: "Engineers",
    description: "Keep results honest about how precise they are.",
    icon: "scale",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-gradient-to-b from-[#f8fbfe] to-[#edf5fc]/40 py-12 sm:pb-10 border-y border-blue-100/50">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow mx-auto mb-2.5">
            <Icon name="atom" size={12} />
            <span>USE CASES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a2b4b]">
            Who it’s for
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Made for anyone who works with numbers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audienceList.map((aud) => (
            <div
              key={aud.title}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5fc] text-[#174f84]">
                <Icon name={aud.icon} size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold text-[#0a2b4b]">
                {aud.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {aud.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
