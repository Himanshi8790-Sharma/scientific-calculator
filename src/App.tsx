import { useEffect, useState } from "react";
import type { Page } from "./types";
import { pageTitles } from "./data/navigation";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
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
  const initial = (window.location.pathname.replace("/", "") || "home") as Page;
  const [page, setPage] = useState<Page>(
    pageTitles[initial] ? initial : "home",
  );

  const go = (next: Page) => {
    window.history.pushState({}, "", `/${next}`);
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const update = () => {
      const next = (window.location.pathname.replace("/", "") || "home") as Page;
      setPage(pageTitles[next] ? next : "home");
    };

    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page] || "SigFigLab"} | SigFigLab`;
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
        return <FaqPage go={go} />;
      case "blog":
        return <BlogPage go={go} />;
      case "blog-detail":
        return <BlogDetailPage go={go} />;
      case "contact":
        return <ContactPage go={go} />;
      case "privacy":
      case "terms":
      case "disclaimer":
        return <LegalPage kind={page} go={go} />;
      default:
        return <HomePage go={go} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#142c44]">
      <Navbar page={page} go={go} />
      {renderContent()}
      <Footer go={go} />
    </div>
  );
}
