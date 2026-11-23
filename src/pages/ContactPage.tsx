import React, { useState } from "react";
import type { Page } from "../types";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";

interface ContactPageProps {
  go?: (p: Page) => void;
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, ...props }: FieldProps) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-3 text-sm text-[#102e50] shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
        {...props}
      />
    </label>
  );
}

export function ContactPage({ go }: ContactPageProps) {
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText("hello@sigfiglab.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch {
      // Ignore copy error
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="How can we help?"
        text="Send a question, report a calculation issue, or share an idea for improving our tools."
        icon={<Icon name="mail" size={14} />}
      />

      <main className="site-container pt-12 ">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.8fr_1.2fr] items-start">
          {/* Left Column: Side Info Cards */}
          <div className="space-y-5">
            {/* Direct Email Card */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,45,80,0.04)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,45,80,0.07)]">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100/70 shadow-2xs transition-colors duration-300 group-hover:bg-[#102e50] group-hover:text-white">
                  <Icon name="mail" size={20} />
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Direct Support
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#102e50] tracking-tight">
                Email our team
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                For general inquiries, calculation bug reports, and educational
                suggestions, reach us directly at:
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href="mailto:hello@sigfiglab.com"
                  className="font-mono text-sm font-semibold text-[#185891] hover:underline"
                >
                  hello@sigfiglab.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  title="Copy email address"
                >
                  <Icon
                    name={copiedEmail ? "check" : "copy"}
                    size={12}
                    className={
                      copiedEmail ? "text-emerald-600" : "text-slate-400"
                    }
                  />
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Icon name="clock" size={13} className="text-slate-400" />
                <span>Typical response time: within 24 hours</span>
              </div>

              <div className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-gradient-to-r from-blue-500 to-[#102e50] transition-all duration-300 group-hover:w-full" />
            </div>

            {/* Before You Submit Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-blue-100/90 bg-gradient-to-br from-[#f6faff] via-[#edf5fd] to-white p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#185891]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 text-blue-700">
                  <Icon name="info" size={16} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#102e50]">
                  Before you submit an issue
                </h3>
              </div>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                If reporting an unexpected calculation result, please include:
              </p>

              <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600 font-bold">•</span>
                  <span>The specific numeric values and notation entered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600 font-bold">•</span>
                  <span>
                    The selected calculator mode (Count, Round, Calculate,
                    Scientific)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600 font-bold">•</span>
                  <span>
                    Your syllabus or textbook convention (e.g. IUPAC, OpenStax)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form / Success Screen */}
          <div>
            {sent ? (
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 text-center shadow-[0_4px_24px_rgba(15,45,80,0.06)]">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Icon name="check" size={28} />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#102e50]">
                  Message received!
                </h2>
                <p className="mx-auto mt-2.5 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-600">
                  Thank you for reaching out. A STEM specialist will review your
                  feedback and get back to you shortly.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSent(false)}
                    className="button-secondary px-5 py-2.5 text-xs font-semibold"
                  >
                    Send another message
                  </button>

                  {go && (
                    <button
                      onClick={() => go("calculator")}
                      className="button-primary px-5 py-2.5 text-xs font-semibold"
                    >
                      <Icon name="calculator" size={14} />
                      <span>Back to calculator</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(15,45,80,0.04)]"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-[#102e50]">
                    Send our team a message
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    Fill in your question or feedback below and we’ll respond as
                    soon as possible.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name" placeholder="Alex" required />
                  <Field label="Last name" placeholder="Morgan" required />
                </div>

                <div className="mt-5">
                  <Field
                    label="Email address"
                    placeholder="alex@example.com"
                    type="email"
                    required
                  />
                </div>

                <div className="mt-5 text-left">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Inquiry topic
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-3 pr-10 text-sm text-[#102e50] shadow-2xs outline-none transition-all cursor-pointer focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100">
                      <option>General inquiry</option>
                      <option>Calculator precision / bug feedback</option>
                      <option>Educational rule suggestion</option>
                      <option>Partnership or institutional use</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                      <Icon name="down" size={16} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-left">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 text-sm text-[#102e50] shadow-2xs outline-none transition-all placeholder:text-slate-400 min-h-36 resize-y focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                    placeholder="Describe your question or calculation feedback in detail…"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="button-primary mt-7 w-full justify-center py-3.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <span>Send message</span>
                  <Icon name="arrow" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
