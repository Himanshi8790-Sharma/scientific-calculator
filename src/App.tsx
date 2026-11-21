import React, { useEffect, useState } from "react";
import type { Page } from "./types";
import { pageTitles } from "./data/navigation";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

// Page imports
import { HomePage } from "./pages/HomePage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { RulesPage } from "./pages/RulesPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { AboutPage } from "./pages/AboutPage";
import { FaqPage } from "./pages/FaqPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";

export default function App() {
  const getInitialPage = (): Page => {
    const hash = window.location.hash.replace("#/", "").replace("#", "");
    return pageTitles[hash as Page] ? (hash as Page) : "home";
  };

  const [page, setPage] = useState<Page>(getInitialPage);

  const go = (next: Page) => {
    window.location.hash = `/${next}`;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const next = window.location.hash.replace("#/", "").replace("#", "") as Page;
      setPage(pageTitles[next] ? next : "home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page]} | SigFigLab`;
  }, [page]);

  const renderContent = () => {
    switch (page) {
      case "home":
        return <HomePage go={go} />;
      case "calculator":
        return <CalculatorPage />;
      case "rules":
        return <RulesPage go={go} />;
      case "examples":
        return <ExamplesPage go={go} />;
      case "how-it-works":
        return <HowItWorksPage go={go} />;
      case "about":
        return <AboutPage go={go} />;
      case "faq":
        return <FaqPage />;
      case "blog":
        return <BlogPage go={go} />;
      case "blog-detail":
        return <BlogDetailPage go={go} />;
      case "contact":
        return <ContactPage />;
      case "privacy":
      case "terms":
      case "disclaimer":
        return <LegalPage kind={page} />;
      default:
        return <HomePage go={go} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#142c44] flex flex-col justify-between selection:bg-[#cfe6fb] selection:text-[#0a2b4b]">
      <div>
        <Navbar page={page} go={go} />
        {renderContent()}
      </div>
      <Footer go={go} />
    </div>
  );
}
