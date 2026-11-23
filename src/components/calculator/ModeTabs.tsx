import React from "react";
import type { Mode } from "../../types";
import { Icon } from "../common/Icons";

interface ModeTabsProps {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
}

export function ModeTabs({ currentMode, onSelectMode }: ModeTabsProps) {
  const modes: { key: Mode; label: string; icon: string }[] = [
    { key: "count", label: "Count", icon: "hash" },
    { key: "sigfig", label: "SigFig", icon: "spark" },
    { key: "round", label: "Round", icon: "round" },
    { key: "calculate", label: "Calculate", icon: "calculator" },
    { key: "scientific", label: "Scientific notation", icon: "atom" },
  ];

  return (
    <div className="border-b border-slate-200 px-4 pt-3 sm:px-6">
      <div className="scrollbar-none flex overflow-x-auto gap-1">
        {modes.map((item) => {
          const isActive = currentMode === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectMode(item.key)}
              className={`mode-tab flex items-center gap-1.5 transition ${
                isActive ? "active text-[#185891]" : "hover:text-slate-900"
              }`}
            >
              <Icon name={item.icon} size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
