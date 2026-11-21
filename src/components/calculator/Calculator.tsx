import React, { useEffect, useMemo, useState } from "react";
import type { Mode } from "../../types";
import {
  calculateWithSigFigs,
  countSignificantFigures,
  isValidNumber,
  type Operation,
  roundToSignificantFigures,
  toScientificNotation,
} from "../../utils/sigfig";
import { Icon } from "../common/Icons";
import { ModeTabs } from "./ModeTabs";
import { DigitHighlighter } from "./DigitHighlighter";
import { StepList } from "./StepList";

interface CalculatorProps {
  compact?: boolean;
}

export function Calculator({ compact = false }: CalculatorProps) {
  const [mode, setMode] = useState<Mode>("count");
  const [value, setValue] = useState("0.004560");
  const [figures, setFigures] = useState(3);
  const [secondValue, setSecondValue] = useState("2.1");
  const [operation, setOperation] = useState<Operation>("×");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const valid = isValidNumber(value);
  const secondValid = isValidNumber(secondValue);
  const count = valid ? countSignificantFigures(value) : 0;
  const calculation =
    valid && secondValid ? calculateWithSigFigs(value, operation, secondValue) : null;

  const result = useMemo(() => {
    if (!valid) return "";
    if (mode === "count") return String(count);
    if (mode === "round") return roundToSignificantFigures(value, figures);
    if (mode === "scientific") return toScientificNotation(value, figures);
    return calculation?.value || "";
  }, [valid, mode, count, value, figures, calculation]);

  useEffect(() => {
    setIsCalculating(true);
    const timer = window.setTimeout(() => setIsCalculating(false), 180);
    return () => window.clearTimeout(timer);
  }, [mode, value, secondValue, operation, figures]);

  function useExample(example: string) {
    setValue(example);
    setTouched(true);
  }

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard?.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback
    }
  }

  return (
    <div className={`calculator-shell ${compact ? "compact" : ""}`}>
      <ModeTabs currentMode={mode} onSelectMode={setMode} />

      <div className="grid lg:grid-cols-[1.05fr_.95fr]">
        {/* Left Input Pane */}
        <div className="p-5 sm:p-7 lg:border-r lg:border-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[#102e50]">
                {mode === "calculate" ? "Enter your values" : "Enter a number"}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Decimals and scientific notation (e.g. 4.5e-3) are supported
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live result
            </span>
          </div>

          {mode === "calculate" ? (
            <div className="grid grid-cols-[1fr_64px_1fr] gap-2">
              <input
                aria-label="First value"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
                className={`number-input ${touched && !valid ? "invalid" : ""}`}
                placeholder="Value A"
              />
              <select
                aria-label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="number-input px-3 text-center font-bold text-lg cursor-pointer"
              >
                {(["+", "-", "×", "÷"] as Operation[]).map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
              <input
                aria-label="Second value"
                value={secondValue}
                onChange={(e) => setSecondValue(e.target.value)}
                className={`number-input ${!secondValid ? "invalid" : ""}`}
                placeholder="Value B"
              />
            </div>
          ) : (
            <input
              aria-label="Number input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setTouched(true);
              }}
              className={`number-input ${touched && !valid ? "invalid" : ""}`}
              placeholder="e.g. 0.004560"
            />
          )}

          {touched && !valid && (
            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-600">
              <Icon name="info" size={14} />
              <span>Enter a valid number, such as 12.30 or 4.5e-3.</span>
            </p>
          )}

          {mode !== "count" && mode !== "calculate" && (
            <div className="mt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Significant figures
              </label>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFigures(n)}
                    className={`figure-button transition ${figures === n ? "active" : ""}`}
                    aria-pressed={figures === n}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Try presets:</span>
            {["1200", "0.00340", "6.022e23"].map((ex) => (
              <button
                key={ex}
                onClick={() => useExample(ex)}
                className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-5 text-[#315b83]">
            <span className="mt-0.5 text-blue-600 shrink-0">
              <Icon name="info" size={15} />
            </span>
            <div>
              <span className="font-semibold">Precision note:</span> Trailing zeros after a decimal point are significant. Enter values exactly as measured in your experiment or assignment.
            </div>
          </div>
        </div>

        {/* Right Result Pane */}
        <div className="bg-[#f8fbff] p-5 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[.14em] text-slate-500 flex items-center gap-1.5">
                <Icon name="scale" size={14} className="text-[#2f75bd]" />
                Result
              </span>
              <button
                onClick={copy}
                disabled={!result}
                className="copy-button transition hover:text-[#174f84]"
                aria-label="Copy result"
              >
                <Icon name={copied ? "check" : "copy"} size={16} />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {isCalculating ? (
              <div className="grid min-h-64 place-items-center" aria-live="polite">
                <div className="text-center">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-blue-100 border-t-[#2f75bd]" />
                  <p className="mt-3 text-xs font-medium text-slate-500">Evaluating precision…</p>
                </div>
              </div>
            ) : valid && (mode !== "calculate" || calculation) ? (
              <>
                <div className="result-card">
                  <div className="text-sm font-medium text-slate-500">
                    {mode === "count"
                      ? "Significant figures"
                      : mode === "round"
                        ? `Rounded to ${figures} sig figs`
                        : mode === "calculate"
                          ? calculation?.precision
                          : "Scientific notation"}
                  </div>
                  <div className="mt-2 break-all text-[34px] font-semibold tracking-[-.04em] text-[#123f73] sm:text-[42px]">
                    {result}
                  </div>
                  {mode === "count" && <DigitHighlighter value={value} />}
                </div>

                <StepList
                  mode={mode}
                  figures={figures}
                  value={value}
                  secondValue={secondValue}
                  operation={operation}
                  calculation={calculation}
                />
              </>
            ) : (
              <div className="grid min-h-64 place-items-center text-center">
                <div>
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                    <Icon name="calculator" size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">Check your input</h3>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                    Enter valid numeric values (such as integers, decimals, or standard exponential notation).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
