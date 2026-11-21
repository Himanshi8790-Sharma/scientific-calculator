import React from "react";
import type { Mode } from "../../types";
import type { Operation } from "../../utils/sigfig";
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
}

function StepItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-emerald-600 shrink-0">
        <Icon name="check" size={15} />
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
}: StepListProps) {
  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#102e50]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#d8eaff] text-[11px] font-bold text-[#185a9d]">
          <Icon name="atom" size={13} />
        </span>
        <span>How we got there</span>
      </div>

      <div className="space-y-2.5 text-xs leading-5 text-slate-600">
        {mode === "count" && (
          <>
            <StepItem text="Ignore leading zeros; they only locate the decimal point." />
            <StepItem text="Count every non-zero digit and zeros captive between non-zero digits." />
            <StepItem text="Count trailing zeros if the number contains an explicit decimal point." />
          </>
        )}

        {mode === "round" && (
          <>
            <StepItem text={`Locate the ${figures}th significant digit from the first non-zero digit.`} />
            <StepItem text="Check the next digit: 5 or higher rounds up; otherwise it stays unchanged." />
            <StepItem text={`Write the result while preserving exactly ${figures} significant figures.`} />
          </>
        )}

        {mode === "scientific" && (
          <>
            <StepItem text="Position the decimal point immediately after the first non-zero digit." />
            <StepItem text="Count the number of places shifted to determine the exponent of 10." />
            <StepItem text={`Preserve ${figures} significant figures in the coefficient mantissa.`} />
          </>
        )}

        {mode === "calculate" && calculation && (
          <>
            <StepItem text={`Raw calculation: ${value} ${operation} ${secondValue} = ${calculation.raw}`} />
            <StepItem text={calculation.explanation} />
            <StepItem text={`Reported result: ${calculation.value} (${calculation.precision})`} />
          </>
        )}
      </div>
    </div>
  );
}
