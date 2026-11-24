import React from "react";
import type { Mode } from "../../types";
import { Icon } from "../common/Icons";

interface ModeTabsProps {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
  compact?: boolean;
}

export function ModeTabs({ currentMode, onSelectMode, compact = false }: ModeTabsProps) {
  const modes: { key: Mode; label: string; icon: string }[] = [
    { key: "sigfig", label: "SigFig", icon: "spark" },
    { key: "count", label: "Count", icon: "hash" },
    { key: "round", label: "Round", icon: "round" },
    { key: "calculate", label: "Calculate", icon: "calculator" },
    { key: "scientific", label: "Scientific notation", icon: "atom" },
  ];

  return (
    <div className={`border-b border-slate-200 ${compact ? "px-3 pt-1.5" : "px-4 pt-3 sm:px-6"}`}>
      <div className="scrollbar-none flex overflow-x-auto gap-1">
        {modes.map((item) => {
          const isActive = currentMode === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectMode(item.key)}
              className={`mode-tab flex items-center gap-1.5 transition whitespace-nowrap shrink-0 ${
                compact ? "py-1.5 px-2.5 text-xs" : ""
              } ${
                isActive ? "active text-[#185891]" : "hover:text-slate-900"
              }`}
            >
              <Icon name={item.icon} size={compact ? 13 : 15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
