"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

function Chip({
  label,
  value,
  placeholder,
  onSave,
}: {
  label: string;
  value?: string;
  placeholder: string;
  onSave: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  return (
    <div className="relative">
      <button
        onClick={() => {
          setDraft(value ?? "");
          setOpen((v) => !v);
        }}
        className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
      >
        <span className="text-neutral-500">{label}:</span>{" "}
        <span className="text-neutral-900">{value?.trim() ? value : placeholder}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[320px] rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm z-20">
          <div className="text-xs font-semibold text-neutral-500 mb-2">{label}</div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(draft.trim());
                setOpen(false);
              }}
              className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800"
            >
              Save
            </button>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500">Auto-save later via API.</div>
        </div>
      )}
    </div>
  );
}

export default function HeaderChips() {
  const { todayGoal, weeklyTheme, monthlyTheme, setTodayGoal, setWeeklyTheme, setMonthlyTheme } = useAppStore();

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Chip label="Today Goal" value={todayGoal} placeholder="What matters today?" onSave={setTodayGoal} />
      <Chip label="Weekly Theme" value={weeklyTheme} placeholder="This week's focus" onSave={setWeeklyTheme} />
      <Chip label="Monthly Theme" value={monthlyTheme} placeholder="This month's direction" onSave={setMonthlyTheme} />
    </div>
  );
}
