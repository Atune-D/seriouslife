"use client";

import KpiManager from "@/components/goals/KpiManager";
import { useAppStore, useUIStore } from "@/lib/store";

export default function GoalsPage() {
  const { vision, setVision } = useAppStore();
  const { openWhy } = useUIStore();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-neutral-500">VISION</h2>
          <button
            onClick={openWhy}
            className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Edit Direction
          </button>
        </div>
        <textarea
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          placeholder="Your life vision (1-2 sentences)"
          className="w-full resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
        <p className="mt-2 text-xs text-neutral-500">
          This vision guides all your tasks and goals. Keep it clear and actionable.
        </p>
      </div>

      <KpiManager />
    </div>
  );
}
