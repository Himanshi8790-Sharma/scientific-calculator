import React from "react";
import type { Mode } from "../../types";
import { type Operation, analyzeSignificantFigures } from "../../utils/sigfig";
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
  return (
    <div className={`flex items-start ${compact ? "gap-2" : "gap-2.5"}`}>
      <span className="mt-0.5 text-emerald-600 shrink-0">
        <Icon name="check" size={compact ? 13 : 15} />
      </span>
      <span>{text}</span>
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
  const sigAnalysis = mode === "sigfig" ? analyzeSignificantFigures(value) : null;

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      <div className={`flex items-center gap-1.5 font-semibold text-[#102e50] ${compact ? "mb-1.5 text-xs" : "mb-3 text-sm"}`}>
        <span className={`grid place-items-center rounded-full bg-[#d8eaff] font-bold text-[#185a9d] ${compact ? "h-5 w-5 text-[10px]" : "h-6 w-6 text-[11px]"}`}>
          <Icon name="atom" size={compact ? 11 : 13} />
        </span>
        <span>How we got there</span>
      </div>

      <div className={`text-slate-600 ${compact ? "space-y-1.5 text-[11px] leading-snug" : "space-y-2.5 text-xs leading-5"}`}>
        {mode === "count" && (
          <>
            <StepItem text="Ignore leading zeros; they only locate the decimal point." compact={compact} />
            <StepItem text="Count every non-zero digit and zeros captive between non-zero digits." compact={compact} />
            {!compact && <StepItem text="Count trailing zeros if the number contains an explicit decimal point." compact={compact} />}
          </>
        )}

        {mode === "sigfig" && sigAnalysis && (
          <>
            {sigAnalysis.steps.slice(0, compact ? 2 : undefined).map((step, idx) => (
              <StepItem key={idx} text={step} compact={compact} />
            ))}
          </>
        )}

        {mode === "round" && (
          <>
            <StepItem text={`Locate the ${figures}th significant digit from the first non-zero digit.`} compact={compact} />
            <StepItem text="Check the next digit: 5 or higher rounds up; otherwise it stays unchanged." compact={compact} />
            {!compact && <StepItem text={`Write the result while preserving exactly ${figures} significant figures.`} compact={compact} />}
          </>
        )}

        {mode === "scientific" && (
          <>
            <StepItem text="Position the decimal point immediately after the first non-zero digit." compact={compact} />
            <StepItem text="Count the number of places shifted to determine the exponent of 10." compact={compact} />
            {!compact && <StepItem text={`Preserve ${figures} significant figures in the coefficient mantissa.`} compact={compact} />}
          </>
        )}

        {mode === "calculate" && calculation && (
          <>
            <StepItem text={`Raw calculation: ${value} ${operation} ${secondValue} = ${calculation.raw}`} compact={compact} />
            <StepItem text={calculation.explanation} compact={compact} />
            {!compact && <StepItem text={`Reported result: ${calculation.value} (${calculation.precision})`} compact={compact} />}
          </>
        )}
      </div>
    </div>
  );
}
