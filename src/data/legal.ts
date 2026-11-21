import type { LegalDocument } from "../types";

export const legalContent: Record<"privacy" | "terms" | "disclaimer", LegalDocument> = {
  privacy: {
    intro:
      "This policy explains what information SigFig Calculator handles and the privacy protections available to you.",
    sections: [
      [
        "Information we collect",
        "Calculator inputs are processed locally in your web browser and are not transmitted to or stored on our servers. We may collect aggregated, non-identifying technical information such as browser type, device category, and screen resolution to optimize performance.",
      ],
      [
        "Information you provide",
        "If you reach out via our contact form, we collect the name, email address, and message content you provide solely to respond to your inquiry and provide technical support.",
      ],
      [
        "Cookies and analytics",
        "We may use essential session cookies and privacy-conscious analytics to monitor uptime and site performance. These are never used for targeted behavioral advertising.",
      ],
      [
        "Data security",
        "We employ industry-standard encryption (HTTPS/TLS) and modern infrastructure security practices to protect any correspondence sent to us.",
      ],
      [
        "Your choices",
        "You may disable cookies in your browser settings at any time without impacting calculator functionality. You may also request deletion of any support correspondence by contacting us.",
      ],
      [
        "Policy updates",
        "We may periodically revise this policy. Any updates will be posted here with an updated revision date.",
      ],
    ],
  },
  terms: {
    intro: "These terms govern your access to and use of SigFig Calculator and its educational tools.",
    sections: [
      [
        "Using the service",
        "You may freely use SigFig Calculator for personal, educational, research, and professional purposes in accordance with applicable laws. Automated scraping or denial-of-service attempts are strictly prohibited.",
      ],
      [
        "Educational purpose",
        "Our calculators and guides are designed to support learning and routine calculations. They are provided as educational aids and do not substitute for formal engineering, medical, or legal verification.",
      ],
      [
        "Intellectual property",
        "The web interface, custom visual representations, explanations, algorithms, and documentation are protected by copyright and intellectual property laws.",
      ],
      [
        "Service availability",
        "While we aim for 99.9% uptime and consistent reliability, the service is provided on an 'as-is' and 'as-available' basis without warranties of uninterrupted service.",
      ],
      [
        "Limitation of liability",
        "Under no circumstances shall SigFig Calculator or its contributors be held liable for indirect, incidental, or consequential damages resulting from calculation results or reliance on site content.",
      ],
      [
        "Changes to terms",
        "We reserve the right to amend these terms at any time. Continued use of the website indicates acceptance of the amended terms.",
      ],
    ],
  },
  disclaimer: {
    intro:
      "Please review this scientific and educational disclaimer before relying on calculations or educational material.",
    sections: [
      [
        "No professional advice",
        "The tools, formulas, and guides provided on this website are intended strictly for educational and general calculation purposes. They do not constitute formal scientific, medical, financial, or engineering certification.",
      ],
      [
        "Accuracy of results",
        "While our calculation engine follows internationally recognized significant figure conventions (including IUPAC and standard STEM curriculum guidelines), users are encouraged to verify critical calculations independently.",
      ],
      [
        "Institutional & regional conventions",
        "Specific academic institutions, scientific journals, or laboratory protocols may adopt specialized rounding rules (e.g., Banker's Rounding vs. standard half-up rounding) or treatment of trailing zeros. Always adhere to your instructor's or publisher's guidelines.",
      ],
      [
        "External links",
        "Any links to external references, textbooks, or tools are provided for convenience. We hold no responsibility for external content or privacy policies.",
      ],
      [
        "User responsibility",
        "You assume full responsibility for validating all outputs against the requirements of your specific application, exam, or research paper.",
      ],
    ],
  },
};
