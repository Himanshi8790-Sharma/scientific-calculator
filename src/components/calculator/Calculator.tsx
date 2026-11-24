import React, { useEffect, useMemo, useState } from "react";
import type { Mode } from "../../types";
import {
  analyzeSignificantFigures,
  calculateWithSigFigs,
  countSignificantFigures,
  decimalPlaces,
  isValidNumber,
  type Operation,
  roundToSignificantFigures,
  toDecimalNotation,
  toENotation,
  toScientificNotation,
} from "../../utils/sigfig";
import { Icon } from "../common/Icons";
import { ModeTabs } from "./ModeTabs";
import { DigitHighlighter } from "./DigitHighlighter";
import { StepList } from "./StepList";

interface CalculatorProps {
  compact?: boolean;
  initialMode?: Mode;
}

interface SubmittedCalculation {
  value: string;
  figures: number;
  secondValue: string;
  operation: Operation;
}

export function Calculator({ compact = false, initialMode = "sigfig" }: CalculatorProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [value, setValue] = useState("0.004560");
  const [submittedData, setSubmittedData] = useState<SubmittedCalculation | null>(null);
  const [figures, setFigures] = useState(3);
  const [secondValue, setSecondValue] = useState("2.1");
  const [operation, setOperation] = useState<Operation>("×");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const valid = isValidNumber(value);
  const secondValid = isValidNumber(secondValue);
  const canCalculate = mode === "calculate" ? valid && secondValid : valid;

  const activeValue = submittedData ? submittedData.value : value;
  const activeFigures = submittedData ? submittedData.figures : figures;
  const activeSecondValue = submittedData ? submittedData.secondValue : secondValue;
  const activeOperation = submittedData ? submittedData.operation : operation;

  const calculation = useMemo(() => {
    if (!submittedData || mode !== "calculate") return null;
    return calculateWithSigFigs(activeValue, activeOperation, activeSecondValue);
  }, [submittedData, mode, activeValue, activeOperation, activeSecondValue]);

  const sigAnalysis = useMemo(() => {
    if (!submittedData || mode !== "sigfig") return null;
    return analyzeSignificantFigures(activeValue);
  }, [submittedData, mode, activeValue]);

  const result = useMemo(() => {
    if (!submittedData) return "";
    if (mode === "count" || mode === "sigfig") {
      return String(countSignificantFigures(activeValue));
    }
    if (mode === "round") {
      return roundToSignificantFigures(activeValue, activeFigures);
    }
    if (mode === "scientific") {
      return toScientificNotation(activeValue, activeFigures);
    }
    if (mode === "calculate") {
      return calculation?.value || "";
    }
    return "";
  }, [submittedData, mode, activeValue, activeFigures, calculation]);

  // Determine whether to show the result pane on the right side
  const showResult = submittedData !== null && result !== "";

  function handleSelectMode(newMode: Mode) {
    setMode(newMode);
    setSubmittedData(null);
  }

  function handleCalculate() {
    if (!canCalculate) {
      setTouched(true);
      return;
    }
    setIsCalculating(true);
    setSubmittedData({
      value,
      figures,
      secondValue,
      operation,
    });
    const timer = window.setTimeout(() => setIsCalculating(false), 180);
    return () => window.clearTimeout(timer);
  }

  function useExample(example: string) {
    setValue(example);
    setTouched(true);
    setSubmittedData(null);
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
    <div
      className={`calculator-shell overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.06] transition duration-300 hover:shadow-2xl hover:shadow-blue-900/[0.08] ${
        compact ? "compact" : ""
      }`}
    >
      {/* Mode Tabs */}
      <div className={`border-b border-slate-100 bg-white ${compact ? "p-1.5" : "p-2"}`}>
        <ModeTabs currentMode={mode} onSelectMode={handleSelectMode} compact={compact} />
      </div>

      <div className="grid lg:grid-cols-[1.05fr_.95fr]">
        {/* Left Input Pane */}
        <div className={`${compact ? "p-4 sm:p-5" : "p-5 sm:p-7"} lg:border-r lg:border-slate-100`}>
          <div className={`${compact ? "mb-3" : "mb-5"} flex items-center justify-between gap-3`}>
              <div>
                <h3 className={`${compact ? "text-xs sm:text-sm font-bold" : "text-sm font-bold"} text-[#102e50]`}>
                  {mode === "calculate"
                    ? "Enter your values"
                    : mode === "sigfig"
                      ? "Significant Figures Calculator"
                      : mode === "count"
                        ? "Count Significant Figures"
                        : mode === "round"
                          ? "Round to Significant Figures"
                          : "Convert to Scientific Notation"}
                </h3>
                <p className={`mt-0.5 ${compact ? "text-[11px] leading-4" : "text-xs leading-5"} text-slate-500`}>
                  {mode === "calculate"
                    ? "Enter values, choose an operation, and click Result"
                    : mode === "sigfig"
                      ? "Enter a number and click Result to view significant figures and rules"
                      : mode === "count"
                        ? "Enter a number and click Result to view its significant figures breakdown"
                        : mode === "round"
                          ? "Enter a number, choose precision, and click Result"
                          : "Enter a number, choose precision, and click Result"}
                </p>
              </div>

              <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-[#185891]">
                <Icon name="check" size={10} />
                On demand
              </span>
            </div>

          {/* Input Fields */}
          {mode === "calculate" ? (
            <div className="grid grid-cols-[1fr_48px_1fr] gap-2 sm:grid-cols-[1fr_56px_1fr]">
              <input
                aria-label="First value"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                className={`number-input min-w-0 rounded-xl transition-all focus:ring-4 focus:ring-blue-100 ${
                  touched && !valid ? "invalid" : ""
                }`}
                placeholder="Value A"
              />

              <select
                aria-label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="number-input cursor-pointer rounded-xl px-2 text-center text-lg font-bold transition focus:ring-4 focus:ring-blue-100"
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                className={`number-input min-w-0 rounded-xl transition-all focus:ring-4 focus:ring-blue-100 ${
                  !secondValid ? "invalid" : ""
                }`}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCalculate();
              }}
              className={`number-input rounded-xl transition-all focus:ring-4 focus:ring-blue-100 ${
                touched && !valid ? "invalid" : ""
              }`}
              placeholder="e.g. 0.004560"
            />
          )}

          {/* Validation Message */}
          {touched && !valid && (
            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-600">
              <Icon name="info" size={14} />
              <span>Enter a valid number, such as 12.30 or 4.5e-3.</span>
            </p>
          )}

          {/* Significant Figures Selection (for Round and Scientific tabs) */}
          {mode !== "count" && mode !== "sigfig" && mode !== "calculate" && (
            <div className="mt-5 animate-[fadeInUp_.3s_ease-out_both]">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Significant figures
              </label>

              <div className="flex gap-2">
                {[2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFigures(n)}
                    className={`figure-button transition duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                      figures === n ? "active" : ""
                    }`}
                    aria-pressed={figures === n}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Presets */}
          <div className={`${compact ? "mt-3 gap-1.5 text-[11px]" : "mt-6 gap-2 text-xs"} flex flex-wrap items-center text-slate-500`}>
            <span className="font-medium text-slate-400">Try presets:</span>

            {["1200", "0.00340", "6.022e23"].map((ex) => (
              <button
                key={ex}
                onClick={() => useExample(ex)}
                className={`rounded-lg border border-slate-200 bg-slate-50 font-mono font-medium text-slate-700 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95 ${
                  compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1.5 text-xs"
                }`}
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Precision Note */}
          <div className={`${compact ? "mt-3 p-2.5 text-[11px] leading-4" : "mt-6 p-3.5 text-xs leading-5"} flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 text-[#315b83]`}>
            <span className="mt-0.5 shrink-0 text-blue-600">
              <Icon name="info" size={compact ? 13 : 15} />
            </span>

            <div>
              <span className="font-semibold">Precision note: </span>
              Trailing zeros after a decimal point are significant. Enter values
              exactly as measured in your experiment or assignment.
            </div>
          </div>

          {/* Result Button (All Tabs) */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="button-primary w-full justify-center py-3 text-sm font-semibold shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="check" size={16} />
              <span>Result</span>
            </button>
          </div>
        </div>

        {/* Right Result Pane */}
        <div className={`flex flex-col justify-between bg-gradient-to-br from-[#f8fbff] to-[#f1f7fd] ${compact ? "p-4 sm:p-5" : "p-5 sm:p-7"}`}>
          <div>
            {/* Result Header */}
            <div className={`${compact ? "mb-2.5" : "mb-4"} flex items-center justify-between`}>
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[.14em] text-slate-500">
                <Icon name="scale" size={compact ? 13 : 14} className="text-[#2f75bd]" />
                Result
              </span>

              <button
                onClick={copy}
                disabled={!showResult || !result}
                className={`copy-button inline-flex items-center gap-1.5 rounded-lg transition duration-200 hover:bg-white hover:text-[#174f84] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                  compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5"
                }`}
                aria-label="Copy result"
              >
                <Icon name={copied ? "check" : "copy"} size={compact ? 14 : 16} />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Loading State */}
            {isCalculating ? (
              <div className="grid min-h-64 place-items-center" aria-live="polite">
                <div className="text-center">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-blue-100 border-t-[#2f75bd]" />
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Evaluating precision…
                  </p>
                </div>
              </div>
            ) : showResult ? (
              <>
                {/* Result Card */}
                <div className={`result-card rounded-2xl border border-blue-100/80 bg-white shadow-sm transition duration-300 hover:shadow-md ${
                  compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className={`${compact ? "text-xs" : "text-sm"} font-medium text-slate-500`}>
                      {mode === "count"
                        ? "Significant figures"
                        : mode === "sigfig"
                          ? "Significant figures count"
                          : mode === "round"
                            ? `Rounded to ${activeFigures} sig figs`
                            : mode === "calculate"
                              ? calculation?.precision
                              : "Scientific notation"}
                    </div>
                    {mode === "count" && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-[#185891]">
                        Count Analysis
                      </span>
                    )}
                    {mode === "sigfig" && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-[#185891]">
                        SigFig Analysis
                      </span>
                    )}
                  </div>

                  <div className={`break-all font-bold tracking-[-.04em] text-[#123f73] transition-all duration-300 ${
                    compact ? "mt-1 text-[28px] sm:text-[34px]" : "mt-2 text-[34px] sm:text-[42px]"
                  }`}>
                    {result}
                  </div>

                  {(mode === "count" || mode === "sigfig") && (
                    <DigitHighlighter value={activeValue} />
                  )}

                  {/* Count Tab Complete Result Metrics */}
                  {mode === "count" && submittedData && (
                    <div className={`${compact ? "mt-3 space-y-1.5 pt-2.5 text-[11px]" : "mt-5 space-y-2 pt-4 text-xs"} border-t border-slate-100`}>
                      <div className={`flex items-center justify-between gap-2 rounded-xl bg-[#f8fbfe] border border-slate-100/80 ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
                        <span className="font-medium text-slate-600">Decimal notation</span>
                        <span className="font-mono font-bold text-[#102e50] max-w-[50%] truncate text-right">
                          {toDecimalNotation(activeValue)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between gap-2 rounded-xl bg-[#f8fbfe] border border-slate-100/80 ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
                        <span className="font-medium text-slate-600">Number of significant figures</span>
                        <span className="font-bold text-[#185891]">
                          {countSignificantFigures(activeValue)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between gap-2 rounded-xl bg-[#f8fbfe] border border-slate-100/80 ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
                        <span className="font-medium text-slate-600">Number of decimals</span>
                        <span className="font-mono font-bold text-[#102e50]">
                          {decimalPlaces(activeValue)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between gap-2 rounded-xl bg-[#f8fbfe] border border-slate-100/80 ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
                        <span className="font-medium text-slate-600">Scientific notation</span>
                        <span className="font-mono font-bold text-[#102e50] max-w-[50%] truncate text-right">
                          {toScientificNotation(activeValue)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between gap-2 rounded-xl bg-[#f8fbfe] border border-slate-100/80 ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
                        <span className="font-medium text-slate-600">E notation</span>
                        <span className="font-mono font-bold text-[#102e50] max-w-[50%] truncate text-right">
                          {toENotation(activeValue)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SigFig Mode Detailed Anatomy Breakdown */}
                  {mode === "sigfig" && sigAnalysis && (
                    <div className={`grid grid-cols-2 border-t border-slate-100 sm:grid-cols-4 ${
                      compact ? "mt-2.5 gap-1.5 pt-2 text-[11px]" : "mt-4 gap-2 pt-3 text-xs"
                    }`}>
                      <div className={`rounded-xl bg-[#f7fafc] text-center ${compact ? "p-1.5" : "p-2"}`}>
                        <div className="text-[9px] uppercase font-bold text-slate-400">
                          Non-Zero
                        </div>
                        <div className="mt-0.5 font-bold text-[#102e50]">
                          {sigAnalysis.nonZeroCount}
                        </div>
                      </div>
                      <div className={`rounded-xl bg-[#f7fafc] text-center ${compact ? "p-1.5" : "p-2"}`}>
                        <div className="text-[9px] uppercase font-bold text-slate-400">
                          Captive
                        </div>
                        <div className="mt-0.5 font-bold text-[#102e50]">
                          {sigAnalysis.captiveZeros}
                        </div>
                      </div>
                      <div className={`rounded-xl bg-[#f7fafc] text-center ${compact ? "p-1.5" : "p-2"}`}>
                        <div className="text-[9px] uppercase font-bold text-slate-400">
                          Trailing
                        </div>
                        <div className="mt-0.5 font-bold text-[#102e50]">
                          {sigAnalysis.trailingZeros}
                        </div>
                      </div>
                      <div className={`rounded-xl bg-[#f7fafc] text-center ${compact ? "p-1.5" : "p-2"}`}>
                        <div className="text-[9px] uppercase font-bold text-slate-400">
                          Leading
                        </div>
                        <div className="mt-0.5 font-bold text-slate-500">
                          {sigAnalysis.leadingZeros}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Solution */}
                <div className={`${compact ? "mt-2.5" : "mt-4"} animate-[fadeInUp_.35s_ease-out_both]`}>
                  <StepList
                    mode={mode}
                    figures={activeFigures}
                    value={activeValue}
                    secondValue={activeSecondValue}
                    operation={activeOperation}
                    calculation={calculation}
                    compact={compact}
                  />
                </div>
              </>
            ) : (
              /* Empty / Initial State */
              <div className="grid min-h-64 place-items-center text-center">
                <div className="max-w-xs animate-[fadeInUp_.3s_ease-out_both]">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-[#174f84]">
                    <Icon name="calculator" size={24} />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800">
                    Ready to calculate
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {mode === "calculate"
                      ? 'Enter both numbers, choose an operation, and click the "Result" button to view the step-by-step solution.'
                      : 'Enter your values and click the "Result" button to view the complete calculation and breakdown.'}
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
