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
    <div className={`w-full max-w-full overflow-x-auto scrollbar-none flex gap-1 ${compact ? "px-2 pt-1" : "px-3 sm:px-4 pt-2"}`}>
      {modes.map((item) => {
        const isActive = currentMode === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelectMode(item.key)}
            className={`mode-tab flex items-center gap-1.5 transition whitespace-nowrap shrink-0 ${
              compact ? "py-1.5 px-2 text-[11px]" : "py-2 px-3 text-xs sm:text-sm"
            } ${
              isActive ? "active text-[#185891]" : "hover:text-slate-900"
            }`}
          >
            <Icon name={item.icon} size={compact ? 12 : 14} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
