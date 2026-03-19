"use client";

import type { Themes } from "./types";

function EditableChip({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-[280px] max-w-full bg-transparent text-sm outline-none"
        placeholder={`${label}...`}
      />
    </div>
  );
}

export default function HeaderBar({
  themes,
  setThemes,
}: {
  themes: Themes;
  setThemes: (t: Themes) => void;
}) {
  return (
    <div className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-4 py-3">
        <EditableChip
          label="Today goal"
          value={themes.todayGoal}
          onChange={(v) => setThemes({ ...themes, todayGoal: v })}
        />
        <EditableChip
          label="Weekly theme"
          value={themes.weeklyTheme}
          onChange={(v) => setThemes({ ...themes, weeklyTheme: v })}
        />
        <EditableChip
          label="Monthly theme"
          value={themes.monthlyTheme}
          onChange={(v) => setThemes({ ...themes, monthlyTheme: v })}
        />
      </div>
    </div>
  );
}
