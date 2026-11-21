import React, { useState } from "react";
import type { Page } from "../../types";
import { navItems } from "../../data/navigation";
import { Logo } from "./Logo";
import { Icon } from "./Icons";

interface NavbarProps {
  page: Page;
  go: (page: Page) => void;
}

export function Navbar({ page, go }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all">
      <div className="site-container flex h-[72px] items-center justify-between">
        <Logo onClick={() => go("home")} />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => go(item.page)}
              className={`nav-link ${page === item.page ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => go("about")}
            className={`nav-link ${page === "about" ? "active" : ""}`}
          >
            About
          </button>
          <button
            onClick={() => go("calculator")}
            className="button-primary h-10 px-5 shadow-sm"
          >
            <Icon name="calculator" size={16} />
            <span>Open calculator</span>
            <Icon name="arrow" size={15} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={18} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden animate-in fade-in duration-150">
          <div className="mx-auto flex max-w-xl flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  go(item.page);
                  setOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  page === item.page
                    ? "bg-[#edf6ff] text-[#174f84] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                go("about");
                setOpen(false);
              }}
              className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                page === "about"
                  ? "bg-[#edf6ff] text-[#174f84] font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              About us
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  go("calculator");
                  setOpen(false);
                }}
                className="button-primary w-full justify-center py-3"
              >
                <Icon name="calculator" size={17} />
                <span>Open calculator</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
