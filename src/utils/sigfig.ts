export type Operation = "+" | "-" | "×" | "÷";

export function normalizeNumericInput(input: string) {
  return input.trim().replace(/,/g, "");
}

export function isValidNumber(input: string) {
  const value = normalizeNumericInput(input);
  return /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value);
}

export function countSignificantFigures(input: string) {
  if (!isValidNumber(input)) return 0;
  let value = normalizeNumericInput(input).toLowerCase().replace(/^[+-]/, "");
  value = value.split("e")[0];
  const hasDecimal = value.includes(".");
  const digits = value.replace(".", "").replace(/^0+/, "");
  if (!digits) return 1;
  return hasDecimal ? digits.length : digits.replace(/0+$/, "").length || 1;
}

export function decimalPlaces(input: string) {
  const value = normalizeNumericInput(input).toLowerCase();
  const [mantissa, exponentText] = value.split("e");
  const decimals = (mantissa.split(".")[1] || "").length;
  return Math.max(0, decimals - Number(exponentText || 0));
}

export function roundToSignificantFigures(input: string, figures: number) {
  const numeric = Number(normalizeNumericInput(input));
  if (!Number.isFinite(numeric) || figures < 1) return "";
  if (numeric === 0) return figures === 1 ? "0" : `0.${"0".repeat(figures - 1)}`;
  const exponent = Math.floor(Math.log10(Math.abs(numeric)));
  if (exponent >= figures || exponent <= -4) {
    return numeric.toPrecision(figures).replace("e+", "e");
  }
  return numeric.toPrecision(figures);
}

export function toScientificNotation(input: string, figures?: number) {
  const numeric = Number(normalizeNumericInput(input));
  if (!Number.isFinite(numeric)) return "";
  const count = figures || countSignificantFigures(input);
  return numeric.toExponential(Math.max(0, count - 1)).replace(/e\+?(-?\d+)/, " × 10^$1");
}

export function calculateWithSigFigs(aText: string, operation: Operation, bText: string) {
  const a = Number(normalizeNumericInput(aText));
  const b = Number(normalizeNumericInput(bText));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  if (operation === "÷" && b === 0) return null;

  const raw =
    operation === "+" ? a + b : operation === "-" ? a - b : operation === "×" ? a * b : a / b;

  if (operation === "×" || operation === "÷") {
    const figures = Math.min(countSignificantFigures(aText), countSignificantFigures(bText));
    return {
      raw,
      value: roundToSignificantFigures(String(raw), figures),
      precision: `${figures} significant figure${figures === 1 ? "" : "s"}`,
      explanation: `For multiplication and division, the answer uses the same number of significant figures as the least precise value (${figures}).`,
    };
  }

  const places = Math.min(decimalPlaces(aText), decimalPlaces(bText));
  return {
    raw,
    value: raw.toFixed(places),
    precision: `${places} decimal place${places === 1 ? "" : "s"}`,
    explanation: `For addition and subtraction, the answer is rounded to the least number of decimal places (${places}).`,
  };
}
