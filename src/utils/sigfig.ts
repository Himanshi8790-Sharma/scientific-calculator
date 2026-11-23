export type Operation = "+" | "-" | "×" | "÷";

export function normalizeNumericInput(input: string): string {
  return String(input).trim().replace(/,/g, "");
}

export function isValidNumber(input: string): boolean {
  const value = normalizeNumericInput(input);
  return /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value);
}

export function countSignificantFigures(input: string): number {
  if (!isValidNumber(input)) return 0;
  let value = normalizeNumericInput(input).toLowerCase().replace(/^[+-]/, "");
  value = value.split("e")[0];
  const hasDecimal = value.includes(".");
  const digits = value.replace(".", "").replace(/^0+/, "");
  if (!digits) {
    if (!hasDecimal) return 1;
    const afterDecimal = value.split(".")[1] || "";
    return afterDecimal.length || 1;
  }
  return hasDecimal ? digits.length : digits.replace(/0+$/, "").length || 1;
}

export function decimalPlaces(input: string): number {
  const value = normalizeNumericInput(input).toLowerCase();
  const [mantissa, exponentText] = value.split("e");
  const decimals = (mantissa.split(".")[1] || "").length;
  return Math.max(0, decimals - Number(exponentText || 0));
}

/**
 * Clean floating point imprecision artifact (e.g. 13.349999999999998 -> 13.35)
 */
export function cleanFloat(num: number): number {
  if (!Number.isFinite(num)) return num;
  return parseFloat(num.toPrecision(14));
}

/**
 * Robust decimal string rounding (Half-Up, matching scientific STEM conventions).
 * Prevents IEEE-754 floating point imprecision when rounding decimal values.
 */
export function roundDecimal(val: string | number, decimals: number): string {
  let s = typeof val === "number" ? val.toPrecision(14) : normalizeNumericInput(val);
  const sign = s.startsWith("-") ? "-" : "";
  if (s.startsWith("-") || s.startsWith("+")) s = s.slice(1);

  const [mantissa, exp] = s.toLowerCase().split("e");
  const exponent = exp ? parseInt(exp, 10) : 0;
  let [intPart, fracPart = ""] = mantissa.split(".");

  if (exponent > 0) {
    if (fracPart.length <= exponent) {
      intPart += fracPart + "0".repeat(exponent - fracPart.length);
      fracPart = "";
    } else {
      intPart += fracPart.slice(0, exponent);
      fracPart = fracPart.slice(exponent);
    }
  } else if (exponent < 0) {
    const shift = -exponent;
    if (intPart.length <= shift) {
      fracPart = "0".repeat(shift - intPart.length) + intPart + fracPart;
      intPart = "0";
    } else {
      fracPart = intPart.slice(intPart.length - shift) + fracPart;
      intPart = intPart.slice(0, intPart.length - shift);
    }
  }

  intPart = intPart.replace(/^0+/, "") || "0";

  if (decimals >= 0) {
    fracPart = fracPart.padEnd(decimals + 1, "0");
    const checkDigit = parseInt(fracPart[decimals], 10);
    let keepFrac = fracPart.slice(0, decimals);

    if (checkDigit >= 5) {
      let carry = 1;
      const newFracDigits = keepFrac.split("").map(Number);
      for (let i = newFracDigits.length - 1; i >= 0; i--) {
        const sum = newFracDigits[i] + carry;
        newFracDigits[i] = sum % 10;
        carry = Math.floor(sum / 10);
      }
      if (carry > 0) {
        const intDigits = intPart.split("").map(Number);
        for (let i = intDigits.length - 1; i >= 0; i--) {
          const sum = intDigits[i] + carry;
          intDigits[i] = sum % 10;
          carry = Math.floor(sum / 10);
        }
        if (carry > 0) intDigits.unshift(carry);
        intPart = intDigits.join("");
      }
      keepFrac = newFracDigits.join("");
    }
    return decimals === 0 ? sign + intPart : sign + intPart + "." + keepFrac;
  } else {
    const shift = -decimals;
    const padded = intPart.padStart(shift + 1, "0");
    const checkDigit = parseInt(padded[padded.length - shift], 10);
    let keepInt = padded.slice(0, padded.length - shift);
    if (checkDigit >= 5) {
      let carry = 1;
      const intDigits = keepInt.split("").map(Number);
      for (let i = intDigits.length - 1; i >= 0; i--) {
        const sum = intDigits[i] + carry;
        intDigits[i] = sum % 10;
        carry = Math.floor(sum / 10);
      }
      if (carry > 0) intDigits.unshift(carry);
      keepInt = intDigits.join("");
    }
    keepInt = keepInt.replace(/^0+/, "") || "0";
    return sign + keepInt + "0".repeat(shift);
  }
}

/**
 * Extracts and rounds the exact significant figures as digits and exponent (Half-Up).
 */
function getSignificantDigits(
  val: string | number,
  figures: number
): { sign: string; digits: string; power: number; isZero: boolean } {
  let s = typeof val === "number" ? val.toPrecision(14) : normalizeNumericInput(val);
  const sign = s.startsWith("-") ? "-" : "";
  if (s.startsWith("-") || s.startsWith("+")) s = s.slice(1);

  const [mantissa, exp] = s.toLowerCase().split("e");
  const exponent = exp ? parseInt(exp, 10) : 0;
  let [intPart, fracPart = ""] = mantissa.split(".");

  intPart = intPart.replace(/^0+/, "") || "0";

  let allDigits = "";
  let power = 0;

  if (intPart !== "0") {
    power = intPart.length - 1 + exponent;
    allDigits = intPart + fracPart;
  } else {
    const firstNonZero = fracPart.search(/[1-9]/);
    if (firstNonZero === -1) {
      return { sign, digits: "0".repeat(figures), power: 0, isZero: true };
    }
    power = -(firstNonZero + 1) + exponent;
    allDigits = fracPart.slice(firstNonZero);
  }

  allDigits = allDigits.padEnd(figures + 1, "0");
  const checkDigit = parseInt(allDigits[figures], 10);
  let keepDigits = allDigits.slice(0, figures);

  if (checkDigit >= 5) {
    let carry = 1;
    const digitsArr = keepDigits.split("").map(Number);
    for (let i = digitsArr.length - 1; i >= 0; i--) {
      const sum = digitsArr[i] + carry;
      digitsArr[i] = sum % 10;
      carry = Math.floor(sum / 10);
    }
    if (carry > 0) {
      power += 1;
      digitsArr.unshift(carry);
      digitsArr.pop();
    }
    keepDigits = digitsArr.join("");
  }

  return { sign, digits: keepDigits, power, isZero: false };
}

export function roundToSignificantFigures(input: string, figures: number): string {
  if (!isValidNumber(input) || figures < 1) return "";
  const parsed = getSignificantDigits(input, figures);
  if (parsed.isZero) {
    return figures === 1 ? "0" : "0." + "0".repeat(figures - 1);
  }

  const { sign, digits, power } = parsed;

  if (power >= figures || power <= -4) {
    let mantissa = digits[0];
    if (figures > 1) {
      mantissa += "." + digits.slice(1);
    }
    return sign + mantissa + "e" + power;
  }

  if (power >= 0) {
    const intLength = power + 1;
    const intPart = digits.slice(0, intLength).padEnd(intLength, "0");
    const fracPart = digits.slice(intLength);
    return fracPart ? sign + intPart + "." + fracPart : sign + intPart;
  } else {
    const leadingZeros = -power - 1;
    return sign + "0." + "0".repeat(leadingZeros) + digits;
  }
}

export function toScientificNotation(input: string, figures?: number): string {
  if (!isValidNumber(input)) return "";
  const count = figures || countSignificantFigures(input);
  if (count < 1) return "";
  const parsed = getSignificantDigits(input, count);
  const { sign, digits, power } = parsed;
  let mantissa = digits[0];
  if (count > 1) {
    mantissa += "." + digits.slice(1);
  }
  return sign + mantissa + " × 10^" + power;
}

export function toENotation(input: string, figures?: number): string {
  if (!isValidNumber(input)) return "";
  const count = figures || countSignificantFigures(input);
  if (count < 1) return "";
  const parsed = getSignificantDigits(input, count);
  const { sign, digits, power } = parsed;
  let mantissa = digits[0];
  if (count > 1) {
    mantissa += "." + digits.slice(1);
  }
  return `${sign}${mantissa}e${power}`;
}

export function toDecimalNotation(input: string): string {
  const norm = normalizeNumericInput(input);
  if (!isValidNumber(norm)) return "";
  if (!norm.toLowerCase().includes("e")) return norm;

  const sign = norm.startsWith("-") ? "-" : "";
  const clean = norm.replace(/^[+-]/, "");
  const [mantissa, exp] = clean.toLowerCase().split("e");
  const exponent = parseInt(exp, 10);
  const [intPart = "", fracPart = ""] = mantissa.split(".");

  if (exponent === 0) {
    return fracPart ? `${sign}${intPart}.${fracPart}` : `${sign}${intPart}`;
  } else if (exponent > 0) {
    if (fracPart.length <= exponent) {
      return `${sign}${intPart}${fracPart}${"0".repeat(exponent - fracPart.length)}`;
    } else {
      return `${sign}${intPart}${fracPart.slice(0, exponent)}.${fracPart.slice(exponent)}`;
    }
  } else {
    const shift = -exponent;
    if (intPart.length <= shift) {
      return `${sign}0.${"0".repeat(shift - intPart.length)}${intPart}${fracPart}`;
    } else {
      return `${sign}${intPart.slice(0, intPart.length - shift)}.${intPart.slice(intPart.length - shift)}${fracPart}`;
    }
  }
}

export function calculateWithSigFigs(aText: string, operation: Operation, bText: string) {
  const a = Number(normalizeNumericInput(aText));
  const b = Number(normalizeNumericInput(bText));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  if (operation === "÷" && b === 0) return null;

  const raw =
    operation === "+" ? a + b : operation === "-" ? a - b : operation === "×" ? a * b : a / b;
  const cleanedRaw = cleanFloat(raw);

  if (operation === "×" || operation === "÷") {
    const figures = Math.min(countSignificantFigures(aText), countSignificantFigures(bText));
    return {
      raw: cleanedRaw,
      value: roundToSignificantFigures(String(cleanedRaw), figures),
      precision: `${figures} significant figure${figures === 1 ? "" : "s"}`,
      explanation: `For multiplication and division, the answer uses the same number of significant figures as the least precise value (${figures}).`,
    };
  }

  const places = Math.min(decimalPlaces(aText), decimalPlaces(bText));
  return {
    raw: cleanedRaw,
    value: roundDecimal(cleanedRaw, places),
    precision: `${places} decimal place${places === 1 ? "" : "s"}`,
    explanation: `For addition and subtraction, the answer is rounded to the least number of decimal places (${places}).`,
  };
}

export interface SigFigAnalysis {
  sigCount: number;
  nonZeroCount: number;
  leadingZeros: number;
  captiveZeros: number;
  trailingZeros: number;
  steps: string[];
}

export function analyzeSignificantFigures(input: string): SigFigAnalysis | null {
  if (!isValidNumber(input)) return null;
  const norm = normalizeNumericInput(input);
  const clean = norm.replace(/^[+-]/, "");
  const [mantissaRaw, expText] = clean.toLowerCase().split("e");
  const hasExp = expText !== undefined;
  const exponent = hasExp ? parseInt(expText, 10) : 0;

  const hasDecimal = mantissaRaw.includes(".");
  const [intPart = "", fracPart = ""] = mantissaRaw.split(".");
  const fullDigitsNoDot = intPart + fracPart;

  const nonZeros = fullDigitsNoDot.replace(/0/g, "");
  const nonZeroCount = nonZeros.length;
  const firstNonZero = fullDigitsNoDot.search(/[1-9]/);

  let leadingZeros = 0;
  let trailingZeros = 0;
  let captiveZeros = 0;
  let sigCount = 0;
  const steps: string[] = [];

  if (firstNonZero === -1) {
    sigCount = hasDecimal ? fracPart.length || 1 : 1;
    steps.push(`Input is zero (${norm}).`);
    if (hasDecimal && fracPart.length > 0) {
      steps.push(
        `The ${fracPart.length} zero(s) after the decimal indicate precision to ${fracPart.length} decimal place${fracPart.length === 1 ? "" : "s"}.`
      );
      steps.push(`Reported significant figures: ${sigCount}.`);
    } else {
      steps.push("The single integer 0 represents 1 significant figure.");
    }
    return {
      sigCount,
      nonZeroCount: 0,
      leadingZeros: 0,
      captiveZeros: 0,
      trailingZeros: sigCount,
      steps,
    };
  }

  leadingZeros = firstNonZero;

  if (hasDecimal) {
    const match = fullDigitsNoDot.match(/0+$/);
    trailingZeros = match ? match[0].length : 0;
    sigCount = fullDigitsNoDot.length - leadingZeros;
  } else {
    const match = fullDigitsNoDot.match(/0+$/);
    trailingZeros = match ? match[0].length : 0;
    sigCount = fullDigitsNoDot.length - leadingZeros - trailingZeros;
  }

  const lastNonZero = fullDigitsNoDot.search(/[1-9](?!.*[1-9])/);
  if (lastNonZero > firstNonZero) {
    const between = fullDigitsNoDot.slice(firstNonZero, lastNonZero + 1);
    captiveZeros = (between.match(/0/g) || []).length;
  }

  if (hasExp) {
    steps.push(
      `Scientific notation: In ${norm}, significance is determined solely by the coefficient ${mantissaRaw} (the 10^${exponent} factor sets magnitude only).`
    );
  }

  steps.push(
    `Non-zero digits: Every non-zero digit is significant. ${
      nonZeroCount > 0
        ? `Found ${nonZeroCount} (${nonZeros.split("").join(", ")}).`
        : "None."
    }`
  );

  if (leadingZeros > 0) {
    steps.push(
      `Leading zeros: ${leadingZeros} leading zero(s) appear before the first non-zero digit. Leading zeros only locate the decimal point and are NOT significant.`
    );
  }

  if (captiveZeros > 0) {
    steps.push(
      `Captive zeros: ${captiveZeros} zero(s) are trapped between non-zero digits and ARE significant.`
    );
  }

  if (trailingZeros > 0) {
    if (hasDecimal) {
      steps.push(
        `Trailing zeros: ${trailingZeros} trailing zero(s) appear after the decimal point, indicating measured precision, and ARE significant.`
      );
    } else {
      steps.push(
        `Trailing zeros: ${trailingZeros} trailing zero(s) in a whole number without an explicit decimal point are place-holders and NOT significant.`
      );
    }
  }

  steps.push(
    `Conclusion: The value ${norm} contains exactly ${sigCount} significant figure${
      sigCount === 1 ? "" : "s"
    }.`
  );

  return {
    sigCount,
    nonZeroCount,
    leadingZeros,
    captiveZeros,
    trailingZeros,
    steps,
  };
}
