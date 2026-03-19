"use client";

import { useState } from "react";

function ThemeChip({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="mt-2 w-full bg-transparent text-sm outline-none"
          placeholder={`${label}...`}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="w-full rounded-2xl border border-neutral-200 bg-white p-3 text-left shadow-sm hover:bg-neutral-50"
    >
      <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <div className="mt-2 text-sm text-neutral-800">
        {value || `Set ${label.toLowerCase()}...`}
      </div>
    </button>
  );
}

export default function RightPanel({
  weeklyTheme,
  monthlyTheme,
  onWeeklyChange,
  onMonthlyChange,
  onOpenDirection,
  weekActive,
}: {
  weeklyTheme: string;
  monthlyTheme: string;
  onWeeklyChange: (v: string) => void;
  onMonthlyChange: (v: string) => void;
  onOpenDirection: () => void;
  weekActive: ("active" | "idle")[];
}) {
  return (
    <div className="space-y-4">
      <ThemeChip label="Weekly Theme" value={weeklyTheme} onChange={onWeeklyChange} />
      <ThemeChip label="Monthly Theme" value={monthlyTheme} onChange={onMonthlyChange} />
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Prompt</div>
          <button
            onClick={onOpenDirection}
            className="text-xs text-neutral-500 hover:text-neutral-800"
          >
            Why
          </button>
        </div>
        <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="text-sm">What am I avoiding right now?</div>
          <button className="mt-3 text-xs font-semibold text-neutral-700 hover:text-neutral-900">
            New prompt
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Week at a glance</div>
        <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs text-neutral-500">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <div key={d} className="space-y-2">
              <div className="rounded-xl border border-neutral-200 bg-white py-2">{d}</div>
              <div
                className={[
                  "mx-auto h-2 w-2 rounded-full",
                  weekActive[i] === "active" ? "bg-neutral-900" : "bg-neutral-300",
                ].join(" ")}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-neutral-500">
          Dots are auto-derived (no manual logging).
        </div>
      </div>
    </div>
  );
}
