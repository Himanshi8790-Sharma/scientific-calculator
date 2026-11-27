import React from "react";
import type { Mode } from "../../types";
import {
  type Operation,
  analyzeSignificantFigures,
  analyzeRounding,
  analyzeScientificNotation,
  countSignificantFigures,
  decimalPlaces,
} from "../../utils/sigfig";
import { Icon } from "../common/Icons";

interface StepListProps {
  mode: Mode;
  figures: number;
  value: string;
  secondValue: string;
  operation: Operation;
  calculation: {
    raw: number;
    value: string;
    precision: string;
    explanation: string;
  } | null;
  compact?: boolean;
}

function StepItem({ text, compact = false }: { text: string; compact?: boolean }) {
  const colonIdx = text.indexOf(": ");
  const hasLabel = colonIdx > 0 && colonIdx < 35;

  return (
    <div className={`flex items-start ${compact ? "gap-1.5" : "gap-2"} leading-snug break-words min-w-0`}>
      <span className="mt-0.5 text-emerald-600 shrink-0">
        <Icon name="check" size={compact ? 12 : 13} />
      </span>
      <span className="min-w-0 flex-1">
        {hasLabel ? (
          <>
            <strong className="text-slate-800 font-semibold">{text.slice(0, colonIdx)}: </strong>
            <span>{text.slice(colonIdx + 2)}</span>
          </>
        ) : (
          text
        )}
      </span>
    </div>
  );
}

export function StepList({
  mode,
  figures,
  value,
  secondValue,
  operation,
  calculation,
  compact = false,
}: StepListProps) {
  const sigAnalysis = (mode === "count" || mode === "sigfig") ? analyzeSignificantFigures(value) : null;
  const roundAnalysis = mode === "round" ? analyzeRounding(value, figures) : null;
  const sciAnalysis = mode === "scientific" ? analyzeScientificNotation(value, figures) : null;

  return (
    <div className={`${compact ? "mt-2.5 pt-2" : "mt-3.5 pt-3"} border-t border-slate-100/90 w-full min-w-0`}>
      <div className={`flex items-center gap-1.5 font-semibold text-[#102e50] ${compact ? "mb-1 text-xs" : "mb-2 text-xs sm:text-sm"}`}>
        <span className={`grid place-items-center rounded-full bg-[#d8eaff] font-bold text-[#185a9d] ${compact ? "h-4 w-4 text-[9px]" : "h-5 w-5 text-[10px]"}`}>
          <Icon name="atom" size={compact ? 10 : 12} />
        </span>
        <span>How we got there</span>
      </div>

      <div
        className={`text-slate-600 ${
          compact
            ? "space-y-1 text-[11px] max-h-[150px]"
            : "space-y-1.5 text-xs max-h-[220px]"
        } overflow-y-auto pr-1 scrollbar-thin`}
      >
        {/* SigFig Tab: Swapped to display concise counting rules */}
        {mode === "sigfig" && (
          <>
            <StepItem text="Ignore leading zeros; they only locate the decimal point." compact={compact} />
            <StepItem text="Count every non-zero digit and zeros captive between non-zero digits." compact={compact} />
            {!compact && <StepItem text="Count trailing zeros if the number contains an explicit decimal point." compact={compact} />}
          </>
        )}

        {/* Count Tab: Swapped to display detailed step-by-step breakdown */}
        {mode === "count" && sigAnalysis && (
          <>
            {sigAnalysis.steps.map((step, idx) => (
              <StepItem key={idx} text={step} compact={compact} />
            ))}
          </>
        )}

        {mode === "round" && roundAnalysis && (
          <>
            {roundAnalysis.steps.map((step, idx) => (
              <StepItem key={idx} text={step} compact={compact} />
            ))}
          </>
        )}

        {mode === "round" && !roundAnalysis && (
          <>
            <StepItem text={`Locate the ${figures}th significant digit from the first non-zero digit.`} compact={compact} />
            <StepItem text="Check the next digit: 5 or higher rounds up; otherwise it stays unchanged." compact={compact} />
            {!compact && <StepItem text={`Write the result while preserving exactly ${figures} significant figures.`} compact={compact} />}
          </>
        )}

        {/* Scientific Notation Tab: Dynamic step-by-step deduction */}
        {mode === "scientific" && sciAnalysis && (
          <>
            {sciAnalysis.steps.map((step, idx) => (
              <StepItem key={idx} text={step} compact={compact} />
            ))}
          </>
        )}

        {mode === "scientific" && !sciAnalysis && (
          <>
            <StepItem text="Position the decimal point immediately after the first non-zero digit." compact={compact} />
            <StepItem text="Count the number of places shifted to determine the exponent of 10." compact={compact} />
            {!compact && <StepItem text={`Preserve ${figures} significant figures in the coefficient mantissa.`} compact={compact} />}
          </>
        )}

        {mode === "calculate" && calculation && (
          <>
            <StepItem
              text={
                operation === "×" || operation === "÷"
                  ? `Identify precision: '${value}' has ${countSignificantFigures(value)} sig figs; '${secondValue}' has ${countSignificantFigures(secondValue)} sig figs.`
                  : `Identify precision: '${value}' has ${decimalPlaces(value)} decimal place${decimalPlaces(value) === 1 ? "" : "s"}; '${secondValue}' has ${decimalPlaces(secondValue)} decimal place${decimalPlaces(secondValue) === 1 ? "" : "s"}.`
              }
              compact={compact}
            />
            <StepItem text={calculation.explanation} compact={compact} />
            <StepItem text={`Raw arithmetic: ${value} ${operation} ${secondValue} = ${calculation.raw}`} compact={compact} />
            <StepItem text={`Final rounded result: ${calculation.value} (${calculation.precision})`} compact={compact} />
          </>
        )}
      </div>
    </div>
  );
}
