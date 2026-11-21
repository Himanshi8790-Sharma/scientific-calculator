import type { FaqItem } from "../types";

export const faqs: FaqItem[] = [
  {
    question: "What are significant figures?",
    answer:
      "Significant figures are the digits in a number that carry meaningful information about its precision. They include all non-zero digits, zeros between significant digits, and certain trailing zeros.",
  },
  {
    question: "Are leading zeros ever significant?",
    answer:
      "No. Leading zeros only locate the decimal point. In 0.0042, only 4 and 2 are significant, so it has 2 significant figures.",
  },
  {
    question: "Do trailing zeros count?",
    answer:
      "Trailing zeros count when a decimal point makes the intended precision clear (e.g. 8.200 has 4 sig figs). For whole numbers such as 1200, the precision can be ambiguous without an explicit decimal point, so scientific notation (1.20 × 10³) is recommended.",
  },
  {
    question: "Why are addition rules different from multiplication rules?",
    answer:
      "Addition and subtraction are limited by decimal places (the least precise decimal position), while multiplication and division are limited by the total number of significant figures. Each rule reflects how uncertainty propagates through that specific mathematical operation.",
  },
  {
    question: "How should exact numbers be handled?",
    answer:
      "Counted quantities (e.g. 12 eggs) and defined conversions (e.g. 100 cm in 1 m) are exact. They have unlimited significant figures and do not restrict the precision of a calculation.",
  },
  {
    question: "Can I enter scientific notation?",
    answer:
      "Yes. Standard scientific notations like 6.022e23, 4.50e-3, or 1.2e+5 are supported throughout the calculator.",
  },
  {
    question: "Does the calculator save my work or track my data?",
    answer:
      "No. All calculations are executed locally in your browser and are never uploaded or stored on any server.",
  },
];
