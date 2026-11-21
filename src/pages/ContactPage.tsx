import React, { useState } from "react";
import { PageHero } from "../components/common/PageHero";
import { Icon } from "../components/common/Icons";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, ...props }: FieldProps) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      <input className="form-input" {...props} />
    </label>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="How can we help?"
        text="Send a question, report a calculation issue, or share an idea for improving our tools."
        icon={<Icon name="mail" size={14} />}
      />

      <main className="site-container py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          {/* Side Info Cards */}
          <div>
            <div className="info-card">
              <div className="icon-box">
                <Icon name="mail" size={20} />
              </div>
              <h3>Email our team</h3>
              <p>For general inquiries, bug reports, and suggestions, reach us directly at:</p>
              <a
                href="mailto:hello@sigfiglab.com"
                className="mt-3 inline-block font-semibold text-[#185891] hover:underline text-sm"
              >
                hello@sigfiglab.com
              </a>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f4f8fc] p-6 border border-blue-100/60">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#102e50]">
                <Icon name="info" size={16} className="text-[#24659f]" />
                <h3>Before you submit an issue</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                If reporting an unexpected calculation result, please include the specific numbers entered, the selected calculator mode, and your textbook or syllabus conventions.
              </p>
            </div>
          </div>

          {/* Form / Success Screen */}
          {sent ? (
            <div className="grid min-h-96 place-items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xs">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Icon name="check" size={26} />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#102e50]">Message received!</h2>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you for reaching out. A STEM specialist will review your feedback and get back to you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="button-secondary mt-6 px-5 py-2.5"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
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
              <div className="mt-5">
                <label className="form-label">Inquiry topic</label>
                <select className="form-input cursor-pointer">
                  <option>General inquiry</option>
                  <option>Calculator precision / bug feedback</option>
                  <option>Educational rule suggestion</option>
                  <option>Partnership or institutional use</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input min-h-36 resize-y"
                  placeholder="Describe your question or calculation feedback in detail…"
                  required
                />
              </div>
              <button
                type="submit"
                className="button-primary mt-6 w-full justify-center py-3 shadow-md"
              >
                <span>Send message</span>
                <Icon name="arrow" size={17} />
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
