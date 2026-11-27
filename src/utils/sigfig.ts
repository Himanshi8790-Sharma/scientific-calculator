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
  const normInput = normalizeNumericInput(input).toLowerCase();
  const inputHadExp = normInput.includes("e");

  // Keep scientific notation if original had exponent or if number is extremely large / small
  if (inputHadExp || power >= 12 || power <= -7) {
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

export function toSuperscript(num: number | string): string {
  const map: Record<string, string> = {
    "-": "⁻",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };
  return String(num)
    .split("")
    .map((c) => map[c] || c)
    .join("");
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
  return `${sign}${mantissa} × 10${toSuperscript(power)}`;
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
  significantDigits: string[];
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
  const significantDigits: string[] = [];
  const steps: string[] = [];

  if (firstNonZero === -1) {
    sigCount = hasDecimal ? fracPart.length || 1 : 1;
    steps.push(`Input is zero (${norm}).`);
    if (hasDecimal && fracPart.length > 0) {
      steps.push(
        `The ${fracPart.length} zero(s) after the decimal indicate precision to ${fracPart.length} decimal place${fracPart.length === 1 ? "" : "s"}.`
      );
      steps.push(`Reported significant figures: ${sigCount}.`);
      for (let i = 0; i < sigCount; i++) significantDigits.push("0");
    } else {
      steps.push("The single integer 0 represents 1 significant figure.");
      significantDigits.push("0");
    }
    return {
      sigCount,
      nonZeroCount: 0,
      leadingZeros: 0,
      captiveZeros: 0,
      trailingZeros: sigCount,
      significantDigits,
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

  // Extract the exact significant digits in sequential order
  const firstNzInMantissa = mantissaRaw.search(/[1-9]/);
  const lastNzInMantissa = mantissaRaw.search(/[1-9](?!.*[1-9])/);
  for (let i = 0; i < mantissaRaw.length; i++) {
    const ch = mantissaRaw[i];
    if (!/\d/.test(ch)) continue;
    let isSig = false;
    if (i >= firstNzInMantissa) {
      if (hasDecimal) {
        isSig = true;
      } else {
        isSig = i <= lastNzInMantissa;
      }
    }
    if (isSig) {
      significantDigits.push(ch);
    }
  }

  if (hasExp) {
    steps.push(
      `Scientific notation: In ${norm}, significance is determined solely by the coefficient ${mantissaRaw} (the 10^${exponent} factor sets magnitude only).`
    );
  }

  const firstNzChar = mantissaRaw[firstNzInMantissa];
  const firstNzPos = firstNzInMantissa + 1;
  steps.push(
    `First sig fig: '${firstNzChar}' at position ${firstNzPos}.`
  );

  steps.push(
    `Non-zero digits: ${nonZeroCount} digit${
      nonZeroCount === 1 ? "" : "s"
    } (${nonZeros.split("").join(", ")}) → All significant.`
  );

  if (leadingZeros > 0) {
    steps.push(
      `Leading zeros: ${leadingZeros} zero${
        leadingZeros === 1 ? "" : "s"
      } before '${firstNzChar}' are placeholders → Not significant.`
    );
  }

  if (captiveZeros > 0) {
    steps.push(
      `Captive zeros: ${captiveZeros} zero${
        captiveZeros === 1 ? "" : "s"
      } between non-zero digits → Significant.`
    );
  }

  if (trailingZeros > 0) {
    if (hasDecimal) {
      steps.push(
        `Trailing zeros: ${trailingZeros} zero${
          trailingZeros === 1 ? "" : "s"
        } after decimal → Significant (shows precision).`
      );
    } else {
      steps.push(
        `Trailing zeros: ${trailingZeros} trailing zero${
          trailingZeros === 1 ? "" : "s"
        } without decimal → Placeholders (not significant).`
      );
    }
  }

  steps.push(
    `Total: ${sigCount} significant figure${
      sigCount === 1 ? "" : "s"
    } (${significantDigits.join(", ")}).`
  );

  return {
    sigCount,
    nonZeroCount,
    leadingZeros,
    captiveZeros,
    trailingZeros,
    significantDigits,
    steps,
  };
}

export interface RoundingDigitItem {
  char: string;
  type: "kept" | "check" | "dropped" | "symbol";
  label?: string;
}

export interface RoundingAnalysis {
  originalValue: string;
  originalSigFigs: number;
  targetFigures: number;
  roundedValue: string;
  scientificNotation: string;
  keptDigits: string;
  roundingDigit: string | null;
  checkDigit: string | null;
  checkValue: number | null;
  roundedUp: boolean;
  digitItems: RoundingDigitItem[];
  steps: string[];
}

export function analyzeRounding(input: string, figures: number): RoundingAnalysis | null {
  if (!isValidNumber(input) || figures < 1) return null;
  const norm = normalizeNumericInput(input);
  const roundedValue = roundToSignificantFigures(input, figures);
  const originalSigFigs = countSignificantFigures(input);
  const scientificNotation = toScientificNotation(roundedValue, figures);
  const clean = norm.replace(/^[+-]/, "");
  const [mantissaRaw, expText] = clean.toLowerCase().split("e");

  const firstNonZero = mantissaRaw.search(/[1-9]/);
  const digitItems: RoundingDigitItem[] = [];
  const keptChars: string[] = [];
  let checkDigit: string | null = null;
  let checkValue: number | null = null;
  let roundedUp = false;
  const steps: string[] = [];

  if (firstNonZero === -1) {
    steps.push(`Input is zero (${norm}).`);
    steps.push(
      `Rounding zero to ${figures} significant figure${figures === 1 ? "" : "s"
      } yields ${roundedValue}.`
    );
    return {
      originalValue: norm,
      originalSigFigs: 1,
      targetFigures: figures,
      roundedValue,
      scientificNotation: toScientificNotation(roundedValue, figures),
      keptDigits: "0",
      roundingDigit: "0",
      checkDigit: null,
      checkValue: null,
      roundedUp: false,
      digitItems: [{ char: "0", type: "kept", label: "Zero" }],
      steps,
    };
  }

  let sigCount = 0;
  for (let i = 0; i < mantissaRaw.length; i++) {
    const ch = mantissaRaw[i];
    if (ch === ".") {
      digitItems.push({ char: ".", type: "symbol" });
      continue;
    }
    if (i < firstNonZero) {
      digitItems.push({ char: ch, type: "dropped", label: "Leading zero (not significant)" });
      continue;
    }

    sigCount++;
    if (sigCount <= figures) {
      digitItems.push({ char: ch, type: "kept", label: `Sig Fig ${sigCount}` });
      keptChars.push(ch);
    } else if (sigCount === figures + 1) {
      checkDigit = ch;
      checkValue = parseInt(ch, 10);
      roundedUp = checkValue >= 5;
      digitItems.push({
        char: ch,
        type: "check",
        label: `Next/decision digit (${ch} ${roundedUp ? "≥ 5 → Round Up" : "< 5 → Keep Unchanged"})`,
      });
    } else {
      digitItems.push({ char: ch, type: "dropped", label: "Dropped / placeholder digit" });
    }
  }

  const roundingDigit = keptChars.length > 0 ? keptChars[keptChars.length - 1] : null;

  steps.push(
    `Original count: ${norm} has ${originalSigFigs} significant figure${
      originalSigFigs === 1 ? "" : "s"
    }.`
  );

  const keptStr = keptChars.join(", ");
  steps.push(
    `Rounding digit: For ${figures} sig figs, kept digits are ${keptStr} (rounding digit: '${roundingDigit}').`
  );

  if (checkDigit !== null && checkValue !== null) {
    if (roundedUp) {
      steps.push(
        `Decision digit: Next digit is '${checkDigit}' (≥ 5 → Round UP, adding 1 to '${roundingDigit}').`
      );
    } else {
      steps.push(
        `Decision digit: Next digit is '${checkDigit}' (< 5 → Keep '${roundingDigit}' unchanged, no round up).`
      );
    }
  } else {
    steps.push(
      `Decision digit: Number already has ${originalSigFigs} sig fig${
        originalSigFigs === 1 ? "" : "s"
      }.`
    );
  }

  if (mantissaRaw.includes(".")) {
    const [intPartRaw = ""] = clean.split(".");
    const nonZeroInt = intPartRaw.replace(/^0+/, "");
    if (nonZeroInt.length > figures) {
      const zerosCount = nonZeroInt.length - figures;
      steps.push(
        `Magnitude: Preserved with ${zerosCount} zero${
          zerosCount === 1 ? "" : "s"
        } before decimal → ${roundedValue} (decimals dropped).`
      );
    }
  } else {
    const originalLen = clean.split("e")[0].length;
    if (originalLen > figures) {
      const zerosCount = originalLen - figures;
      steps.push(
        `Magnitude: Preserved with ${zerosCount} zero${
          zerosCount === 1 ? "" : "s"
        } → ${roundedValue}.`
      );
    }
  }

  steps.push(
    `Final result: ${norm} rounded to ${figures} sig figs = ${roundedValue} (Scientific: ${scientificNotation}).`
  );

  return {
    originalValue: norm,
    originalSigFigs,
    targetFigures: figures,
    roundedValue,
    scientificNotation,
    keptDigits: keptChars.join(""),
    roundingDigit,
    checkDigit,
    checkValue,
    roundedUp,
    digitItems,
    steps,
  };
}

export interface ScientificNotationAnalysis {
  originalValue: string;
  targetFigures: number;
  coefficient: string;
  exponent: number;
  formattedResult: string;
  eNotation: string;
  steps: string[];
}

export function analyzeScientificNotation(
  input: string,
  figures: number
): ScientificNotationAnalysis | null {
  if (!isValidNumber(input) || figures < 1) return null;
  const norm = normalizeNumericInput(input);
  const formattedResult = toScientificNotation(input, figures);
  const eNotation = toENotation(input, figures);
  const clean = norm.replace(/^[+-]/, "");
  const sign = norm.startsWith("-") ? "-" : "";

  const [mantissaRaw, expText] = clean.toLowerCase().split("e");
  const inputExp = expText ? parseInt(expText, 10) : 0;
  const firstNonZero = mantissaRaw.search(/[1-9]/);

  const steps: string[] = [];

  // Zero case
  if (firstNonZero === -1) {
    const coeff = figures === 1 ? "0" : "0." + "0".repeat(figures - 1);
    steps.push(`First digit: The input is 0 (zero has no non-zero leading digit).`);
    steps.push(`Decimal shift: No shift required; value remains at zero with exponent 0 (10⁰).`);
    steps.push(
      `Coefficient precision: Written as '${coeff}' to represent exactly ${figures} significant figure${
        figures === 1 ? "" : "s"
      }.`
    );
    steps.push(`Final notation: 0 in scientific notation is ${coeff} × 10⁰ (or ${coeff}e+0).`);
    return {
      originalValue: norm,
      targetFigures: figures,
      coefficient: coeff,
      exponent: 0,
      formattedResult: `${coeff} × 10⁰`,
      eNotation: `${coeff}e+0`,
      steps,
    };
  }

  const parsed = getSignificantDigits(input, figures);
  const finalPower = parsed.power;
  const mantissaDigits = parsed.digits;
  let finalMantissa = mantissaDigits[0];
  if (figures > 1) {
    finalMantissa += "." + mantissaDigits.slice(1);
  }
  const coefficient = `${sign}${finalMantissa}`;

  const firstChar = mantissaRaw[firstNonZero];

  // Step 1: First non-zero digit
  steps.push(
    `First digit: Locate first non-zero digit '${firstChar}' in ${norm}${
      firstNonZero > 0 ? " (ignoring leading zeros)" : ""
    } to anchor the coefficient.`
  );

  // Step 2: Decimal movement & Exponent
  let decPos = mantissaRaw.indexOf(".");
  if (decPos === -1) {
    decPos = mantissaRaw.length;
  }

  let initialShift = 0;
  let direction: "left" | "right" | "none" = "none";

  if (decPos > firstNonZero + 1) {
    initialShift = decPos - 1 - firstNonZero;
    direction = "left";
  } else if (decPos < firstNonZero) {
    initialShift = firstNonZero - decPos;
    direction = "right";
  } else {
    initialShift = 0;
    direction = "none";
  }

  if (direction === "left") {
    steps.push(
      `Decimal shift: Move decimal ${initialShift} place${
        initialShift === 1 ? "" : "s"
      } LEFT to position after '${firstChar}' → Exponent is positive (+${finalPower}) because original number is ≥ 10 (10${toSuperscript(
        finalPower
      )}).`
    );
  } else if (direction === "right") {
    steps.push(
      `Decimal shift: Move decimal ${initialShift} place${
        initialShift === 1 ? "" : "s"
      } RIGHT to position after '${firstChar}' → Exponent is negative (${finalPower}) because original number is < 1 (10${toSuperscript(
        finalPower
      )}).`
    );
  } else {
    steps.push(
      `Decimal shift: Decimal is already located directly after '${firstChar}' (0 places shifted) → Exponent is ${
        finalPower >= 0 ? "+" + finalPower : finalPower
      } (10${toSuperscript(finalPower)}).`
    );
  }

  // Step 3: Coefficient precision & Rounding
  let allSigDigits = "";
  if (decPos !== -1) {
    const rawNoDec = mantissaRaw.replace(".", "");
    allSigDigits = rawNoDec.slice(firstNonZero > decPos ? firstNonZero - 1 : firstNonZero);
  } else {
    allSigDigits = mantissaRaw.slice(firstNonZero);
  }

  const availableDigits = allSigDigits.length;

  if (availableDigits < figures) {
    const padCount = figures - availableDigits;
    steps.push(
      `Coefficient precision: Original number has ${availableDigits} significant digit${
        availableDigits === 1 ? "" : "s"
      }; padded with ${padCount} trailing zero${
        padCount === 1 ? "" : "s"
      } to preserve exactly ${figures} sig figs → Mantissa is '${finalMantissa}'.`
    );
  } else if (availableDigits === figures) {
    steps.push(
      `Coefficient precision: Retains all ${figures} significant digit${
        figures === 1 ? "" : "s"
      } without rounding → Mantissa is '${finalMantissa}'.`
    );
  } else {
    const checkChar = allSigDigits[figures];
    const checkVal = parseInt(checkChar, 10);
    const lastKept = allSigDigits[figures - 1];

    if (checkVal >= 5) {
      steps.push(
        `Coefficient precision: For ${figures} sig figs, next digit after '${lastKept}' is '${checkChar}' (≥ 5 → Round UP) → Mantissa is '${finalMantissa}'.`
      );
    } else {
      steps.push(
        `Coefficient precision: For ${figures} sig figs, next digit after '${lastKept}' is '${checkChar}' (< 5 → Keep unchanged) → Mantissa is '${finalMantissa}'.`
      );
    }
  }

  // Step 4: Final Scientific Notation
  steps.push(
    `Final notation: Combine coefficient and power of 10 → ${formattedResult} (or ${eNotation}).`
  );

  return {
    originalValue: norm,
    targetFigures: figures,
    coefficient,
    exponent: finalPower,
    formattedResult,
    eNotation,
    steps,
  };
}
