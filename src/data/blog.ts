import type { BlogPostItem } from "../types";

export interface BlogArticleContent {
  lead: string;
  sections: {
    heading: string;
    body: string[];
    callout?: {
      title: string;
      text: string;
    };
    mathExample?: {
      calculation: string;
      result: string;
      explanation: string;
    };
  }[];
}

export const posts: BlogPostItem[] = [
  {
    tag: "Fundamentals",
    time: "6 min read",
    title: "Why significant figures matter in real-world science",
    desc: "How precision communicates confidence—and why extra digits can be misleading in research and engineering.",
    featured: true,
  },
  {
    tag: "How-to",
    time: "5 min read",
    title: "A practical guide to rounding significant figures",
    desc: "A repeatable, foolproof method for rounding any value without losing intended precision.",
  },
  {
    tag: "Study guide",
    time: "7 min read",
    title: "Sig figs in multiplication and division",
    desc: "Learn the precision rules for arithmetic operations with clear, step-by-step examples you can follow.",
  },
  {
    tag: "Common mistakes",
    time: "4 min read",
    title: "Five significant-figure errors to avoid",
    desc: "Spot and fix the most common mistakes before they cost you points on an exam or lab report.",
  },
  {
    tag: "Scientific notation",
    time: "6 min read",
    title: "Scientific notation made intuitive",
    desc: "Move between very large astronomical numbers, tiny subatomic values, and standard decimal forms confidently.",
  },
  {
    tag: "Lab skills",
    time: "8 min read",
    title: "Reporting measurements with honest precision",
    desc: "Connect physical instrument limitations, uncertainty margins, and properly formatted experimental values.",
  },
];

export const blogArticleData: Record<string, BlogArticleContent> = {
  "Why significant figures matter in real-world science": {
    lead: "Imagine measuring a lab bench with an ordinary metric ruler and recording its length as 121.43786 centimeters. While the number looks extraordinarily sophisticated, an ordinary ruler could never justify that degree of certainty. Significant figures exist to keep our calculations scientifically honest.",
    sections: [
      {
        heading: "1. Precision communicates measurement certainty",
        body: [
          "Every physical measurement has an inherent uncertainty limit. The instrument mechanism, resolution, environmental factors, and observer technique all dictate how confidently a quantity is known.",
          "Significant figures ensure that this precision is neither inflated nor lost when values pass through formulas. Communicating more digits than your apparatus can measure is equivalent to inventing data.",
        ],
        callout: {
          title: "Core Scientific Principle",
          text: "Significant figures are not merely digits to tally for a test. They are a universal shorthand used across physics, chemistry, biology, and engineering to express measurement confidence.",
        },
      },
      {
        heading: "2. More digits do not equal greater accuracy",
        body: [
          "A pocket calculator or computer script may spit out twelve decimal digits, but those extra decimals are mathematical artifacts rather than physical reality.",
          "If your least precise measurement contains only two significant figures, a product or quotient derived from it cannot claim more than two significant figures.",
        ],
        mathExample: {
          calculation: "4.2 cm (2 sig figs) × 3.15 cm (3 sig figs)",
          result: "13 cm²",
          explanation:
            "The raw calculator output is 13.23, but because 4.2 has only two significant digits, the final reported answer must be rounded to 2 significant figures.",
        },
      },
      {
        heading: "3. High-stakes applications in modern engineering",
        body: [
          "Correct precision reporting prevents real-world disasters. From dosage titrations in pharmacology where rounding prematurely could cause toxic overdoses, to aerospace structural calculations where tolerance stack-ups can lead to mechanical failure, respecting significant figures ensures that conclusions never overstate the evidence.",
        ],
      },
      {
        heading: "4. The golden rule: Guard digits during calculations",
        body: [
          "When solving multi-step problems, carry at least two extra guard digits through all intermediate stages, and apply significant figure rounding rules only once at the very final result. This simple discipline prevents intermediate rounding errors from distorting your answer.",
        ],
      },
    ],
  },

  "A practical guide to rounding significant figures": {
    lead: "Rounding values to a required number of significant figures is a core laboratory skill. Done incorrectly, it can introduce systematic skew and obscure instrument precision. Here is a clear, repeatable method.",
    sections: [
      {
        heading: "1. The four-step rounding method",
        body: [
          "Step 1: Identify the first non-zero digit on the left—this is your first significant figure.",
          "Step 2: Count to the right until you reach the requested number of significant figures.",
          "Step 3: Inspect the decider digit immediately following your last desired figure.",
          "Step 4: If the decider digit is 5 or greater, round your last figure up by 1. If it is 4 or less, leave it unchanged. Replace whole-number places with zeros if necessary.",
        ],
        callout: {
          title: "Preserving Place Value",
          text: "Never drop digits before a decimal point without replacing them with placeholder zeros! Rounding 1,482 to two significant figures gives 1,500, not 15.",
        },
      },
      {
        heading: "2. Preserving trailing zeros in rounded decimals",
        body: [
          "When rounding values containing a decimal point, trailing zeros must be retained if they are part of your significant count.",
          "For example, rounding 4.996 to three significant figures gives 5.00. The two trailing zeros prove that the measurement was accurate to the hundredths place.",
        ],
        mathExample: {
          calculation: "Round 18.376 to 4 significant figures",
          result: "18.38",
          explanation:
            "The first four significant digits are 1, 8, 3, and 7. The decider digit is 6 (which is ≥ 5), so 7 rounds up to 8.",
        },
      },
      {
        heading: "3. Rounding in multi-step coursework",
        body: [
          "Keep unrounded numbers in your scientific calculator or scratchpad during intermediate formulas. Rounding too early compounds errors and leads to discrepancies on exams and problem sets.",
        ],
      },
    ],
  },

  "Sig figs in multiplication and division": {
    lead: "Multiplication and division follow a fundamentally different rule from addition and subtraction. Understanding why this happens makes scientific precision intuitive.",
    sections: [
      {
        heading: "1. The Least Significant Factor Rule",
        body: [
          "When multiplying or dividing measured quantities, the final reported answer must have the same number of significant figures as the measurement with the fewest significant figures.",
          "Unlike addition, which is bounded by decimal positions, multiplication distributes relative uncertainty across the entire product.",
        ],
        callout: {
          title: "Relative vs. Absolute Uncertainty",
          text: "Multiplication and division compound percentage (relative) uncertainties. Therefore, the total number of significant figures dictates the final uncertainty.",
        },
      },
      {
        heading: "2. Worked multiplication example",
        body: [
          "Suppose you measure the sides of an experimental solar cell as 3.42 cm and 1.6 cm.",
        ],
        mathExample: {
          calculation: "3.42 cm (3 sig figs) × 1.6 cm (2 sig figs)",
          result: "5.5 cm²",
          explanation:
            "The raw product is 5.472 cm². Because 1.6 cm has only 2 significant figures, the final reported answer is rounded to 2 significant figures: 5.5 cm².",
        },
      },
      {
        heading: "3. Exact numbers never limit precision",
        body: [
          "Counted items (e.g., 6 test tubes) and exact unit definitions (e.g., exactly 1,000 meters in a kilometer, or 2.54 cm in an inch) have infinite precision. Never reduce your answer's sig figs based on an exact conversion factor.",
        ],
      },
    ],
  },

  "Five significant-figure errors to avoid": {
    lead: "Significant figure errors are among the most frequent reasons students lose points on chemistry and physics exams. Here are the five most common traps and how to avoid them.",
    sections: [
      {
        heading: "1. Counting leading zeros as significant",
        body: [
          "Mistake: Thinking 0.0042 has four significant figures. Leading zeros only position the decimal point. Only '4' and '2' are significant (2 sig figs).",
          "Mistake: Dropping trailing zeros in decimals. Writing 8.2 instead of 8.20 removes the precision indicated by a calibrated lab scale.",
        ],
        callout: {
          title: "The Pacific / Atlantic Memory Rule",
          text: "If the decimal is Present, count from the Pacific (left) starting at the first non-zero digit. If the decimal is Absent, count from the Atlantic (right) starting at the first non-zero digit.",
        },
      },
      {
        heading: "2. Applying multiplication rules to addition",
        body: [
          "Addition and subtraction depend strictly on decimal places, not the total count of significant figures. Adding 12.11 (2 decimal places) and 0.3 (1 decimal place) gives 12.4 (1 decimal place), which happens to have 3 sig figs.",
        ],
        mathExample: {
          calculation: "12.11 + 0.3",
          result: "12.4",
          explanation:
            "The raw sum is 12.41. The value with the fewest decimal places is 0.3 (one decimal place), so the answer rounds to one decimal place.",
        },
      },
      {
        heading: "3. Premature intermediate rounding",
        body: [
          "Rounding at every step of a multi-variable physics formula causes rounding drift. Store intermediate numbers in calculator memory and round only once at the conclusion.",
        ],
      },
    ],
  },

  "Scientific notation made intuitive": {
    lead: "Scientific notation is science's most elegant tool for eliminating ambiguity. It allows scientists to express astronomical distances and microscopic wavelengths without losing track of precision.",
    sections: [
      {
        heading: "1. Eliminating the trailing-zero ambiguity",
        body: [
          "In conventional notation, writing 1,200 meters leaves ambiguity: are the zeros measured or merely placeholders? Scientific notation resolves this completely:",
          "• 1.2 × 10³ m = 2 significant figures",
          "• 1.20 × 10³ m = 3 significant figures (hundreds and tens measured)",
          "• 1.200 × 10³ m = 4 significant figures (measured down to the single meter)",
        ],
        callout: {
          title: "The Structure of Scientific Form",
          text: "In m × 10ⁿ, the coefficient m must be between 1 and 10 (1 ≤ |m| < 10). Every single digit written in the coefficient is always significant.",
        },
      },
      {
        heading: "2. Converting small decimals to scientific form",
        body: [
          "When moving the decimal point to the right, the exponent is negative. Always keep all measured trailing zeros in your coefficient.",
        ],
        mathExample: {
          calculation: "Convert 0.0007820 into scientific notation",
          result: "7.820 × 10⁻⁴",
          explanation:
            "Move the decimal 4 places to the right. Retain the trailing zero because it represents measured precision.",
        },
      },
      {
        heading: "3. Multiplying and dividing exponential numbers",
        body: [
          "Multiply coefficients and add exponents: (2.0 × 10³) × (3.0 × 10⁴) = 6.0 × 10⁷. Check that your coefficient retains the correct number of significant figures.",
        ],
      },
    ],
  },

  "Reporting measurements with honest precision": {
    lead: "A number without an understanding of instrument precision is scientifically incomplete. Learn how to record analog and digital measurements honestly according to standard laboratory protocol.",
    sections: [
      {
        heading: "1. The estimated final digit principle",
        body: [
          "On every analog measurement tool (graduated cylinders, metric rulers, glass burettes), you record all certain digits indicated by the etched markings, plus one final estimated digit between markings.",
          "For example, with a ruler marked in millimeters, you can report down to tenths of a millimeter (e.g. 14.3 mm).",
        ],
        callout: {
          title: "The Golden Rule of Measurement",
          text: "A measurement contains all certain digits plus exactly one estimated digit. That estimated digit is scientifically significant and carries meaningful information.",
        },
      },
      {
        heading: "2. Digital balances and lab instruments",
        body: [
          "Digital lab balances already estimate the final fluctuating digit. If an analytical balance displays 25.400 g, you must record all three trailing zeros. Omitting them loses two orders of magnitude of instrument precision.",
        ],
        mathExample: {
          calculation: "Reading a 50 mL buret with 0.1 mL graduations",
          result: "32.45 mL (4 sig figs)",
          explanation:
            "32.4 mL is certain from the tick lines; the final '5' is estimated between 32.4 and 32.5 mL. All 4 digits are significant.",
        },
      },
      {
        heading: "3. Scientific integrity in research reports",
        body: [
          "Over-reporting precision is viewed as academic dishonesty or sloppiness in peer-reviewed scientific journals. Adhering to significant figure conventions demonstrates professional rigor.",
        ],
      },
    ],
  },
};
