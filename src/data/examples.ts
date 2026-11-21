import type { ExampleProblem } from "../types";

export const exampleData: ExampleProblem[] = [
  {
    category: "Counting",
    problem: "How many sig figs are in 0.005040?",
    steps: [
      "Ignore the leading zeros (0.00).",
      "Count 5, the captive zero, 4, and the trailing decimal zero.",
    ],
    answer: "4 significant figures",
  },
  {
    category: "Rounding",
    problem: "Round 18.376 to 4 significant figures.",
    steps: [
      "The first four significant digits are 1, 8, 3, and 7.",
      "The next digit is 6 (≥ 5), so round 7 up to 8.",
    ],
    answer: "18.38",
  },
  {
    category: "Multiplication",
    problem: "Calculate 3.42 × 1.6.",
    steps: [
      "The raw result is 5.472.",
      "1.6 has the fewest sig figs (2). Round the final result to 2 sig figs.",
    ],
    answer: "5.5",
  },
  {
    category: "Addition",
    problem: "Calculate 12.11 + 0.3.",
    steps: [
      "The raw result is 12.41.",
      "0.3 has only 1 decimal place, so round to 1 decimal place.",
    ],
    answer: "12.4",
  },
  {
    category: "Scientific notation",
    problem: "Write 0.0007820 in scientific notation.",
    steps: [
      "Move the decimal 4 places to the right.",
      "Preserve all 4 significant figures including the trailing zero.",
    ],
    answer: "7.820 × 10⁻⁴",
  },
  {
    category: "Division",
    problem: "Calculate 45.0 ÷ 6.21.",
    steps: [
      "The raw result is 7.246376...",
      "Both values have 3 sig figs, so report the answer with 3 sig figs.",
    ],
    answer: "7.25",
  },
];
