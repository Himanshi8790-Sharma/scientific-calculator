import type { RuleItem } from "../types";

export const rules: RuleItem[] = [
  {
    number: "1",
    title: "All non-zero digits are significant",
    description: "Every digit from 1–9 communicates measured precision.",
    example: "347 has 3 significant figures.",
  },
  {
    number: "2",
    title: "Zeros between non-zero digits count",
    description: "Embedded or captive zeros are always significant.",
    example: "1.007 has 4 significant figures.",
  },
  {
    number: "3",
    title: "Leading zeros do not count",
    description: "Zeros before the first non-zero digit only position the decimal.",
    example: "0.0042 has 2 significant figures.",
  },
  {
    number: "4",
    title: "Trailing decimal zeros count",
    description: "Zeros at the end of a decimal value indicate measured precision.",
    example: "8.200 has 4 significant figures.",
  },
  {
    number: "5",
    title: "Trailing whole-number zeros may be ambiguous",
    description: "Use scientific notation or a trailing decimal point to clearly communicate intended precision.",
    example: "1.20 × 10³ has 3 significant figures.",
  },
  {
    number: "6",
    title: "Exact numbers have unlimited precision",
    description: "Counted values and defined conversions do not limit an answer.",
    example: "12 eggs is an exact count.",
  },
];
