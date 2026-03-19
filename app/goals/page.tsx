"use client";

import { useAppStore, useUIStore } from "@/lib/store";

export default function DirectionPage() {
  const { vision, antiVision, oneYearLens, constraints } = useAppStore();
  const { openWhy } = useUIStore();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Direction</h2>
            <p className="text-sm text-neutral-500 mt-1">Your identity-level context</p>
          </div>
          <button
            onClick={openWhy}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Edit Direction
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-neutral-500 mb-2">VISION</div>
            <p className="text-sm text-neutral-800">{vision || "Set your vision"}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-neutral-500 mb-2">1-YEAR LENS</div>
            <p className="text-sm text-neutral-800">{oneYearLens}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-neutral-500 mb-2">CONSTRAINTS</div>
            <ul className="space-y-1">
              {constraints.map((c, i) => (
                <li key={i} className="text-sm text-neutral-800">• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-neutral-50 p-4">
          <p className="text-xs text-neutral-600">
            <strong>Note:</strong> Anti-Vision is hidden by default to reduce pressure. 
            Click "Edit Direction" to view and modify all fields.
          </p>
        </div>
      </div>
    </div>
  );
}
