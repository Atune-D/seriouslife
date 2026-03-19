"use client";

import { useAppStore } from "@/lib/store";
import { useUIStore } from "@/lib/store";

export default function ThemeEditor() {
  const { todayGoal, weekTheme, monthTheme, setTodayGoal, setWeekTheme, setMonthTheme } = useAppStore();
  const { openWhy } = useUIStore();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Themes</div>
        <button
          onClick={openWhy}
          className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
        >
          Edit Direction
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <input
          value={todayGoal}
          onChange={(e) => setTodayGoal(e.target.value)}
          placeholder="Today goal (1 sentence)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <input
          value={weekTheme}
          onChange={(e) => setWeekTheme(e.target.value)}
          placeholder="Week theme (1 sentence)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <input
          value={monthTheme}
          onChange={(e) => setMonthTheme(e.target.value)}
          placeholder="Month theme (1 sentence)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">
        Later: persist via API (upsert by date/week_start/month_start).
      </div>
    </div>
  );
}
