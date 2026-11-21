import type { BlogPostItem } from "../types";

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
