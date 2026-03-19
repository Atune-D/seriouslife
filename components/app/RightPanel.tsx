"use client";

import PromptCard from "../today/PromptCard";
import { weekDays } from "@/lib/date";
import { useUIStore } from "@/lib/store";

export default function RightPanel() {
  const { openWhy } = useUIStore();

  return (
    <div className="sticky top-4 space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Prompt</div>
          <button
            onClick={openWhy}
            className="rounded-xl px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Why
          </button>
        </div>
        <div className="mt-3">
          <PromptCard />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="text-sm font-semibold">Week at a glance</div>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {weekDays().map((d) => (
            <div key={d.key} className="rounded-xl border border-neutral-200 bg-neutral-50 p-2 text-center">
              <div className="text-[11px] text-neutral-500">{d.label}</div>
              <div className="mt-1 text-sm font-semibold text-neutral-800">•</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[11px] text-neutral-500">
          Replace "•" with completed indicators based on KPI/task/reflection presence.
        </div>
      </div>
    </div>
  );
}
