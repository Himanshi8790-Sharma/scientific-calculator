import type React from "react";
import type { Operation } from "./utils/sigfig";

export type Page =
  | "home"
  | "calculator"
  | "rules"
  | "examples"
  | "how-it-works"
  | "about"
  | "faq"
  | "blog"
  | "blog-detail"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer";

export type Mode = "count" | "round" | "calculate" | "scientific";

export interface NavItem {
  label: string;
  page: Page;
}

export interface RuleItem {
  number: string;
  title: string;
  description: string;
  example: string;
}

export interface ExampleProblem {
  category: "Counting" | "Rounding" | "Multiplication" | "Addition" | "Division" | "Scientific notation";
  problem: string;
  steps: string[];
  answer: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPostItem {
  tag: string;
  time: string;
  title: string;
  desc: string;
  featured?: boolean;
}

export interface LegalDocument {
  intro: string;
  sections: [string, string][];
}
