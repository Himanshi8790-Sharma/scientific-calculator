import type { NavItem, Page } from "../types";

export const pageTitles: Record<Page, string> = {
  home: "Sig Fig Calculator",
  calculator: "Significant Figures Calculator",
  rules: "Significant Figures Rules",
  examples: "Worked Examples",
  "how-it-works": "How It Works",
  about: "About Us",
  faq: "Frequently Asked Questions",
  blog: "Learning Center",
  "blog-detail": "Why Significant Figures Matter",
  contact: "Contact Us",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  disclaimer: "Disclaimer",
};

export const navItems: NavItem[] = [
  { label: "Calculator", page: "calculator" },
  { label: "Rules", page: "rules" },
  { label: "Examples", page: "examples" },
  { label: "How it works", page: "how-it-works" },
  { label: "Learn", page: "blog" },
  { label: "About", page: "about" },
];