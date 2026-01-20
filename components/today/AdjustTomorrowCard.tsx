"use client";

import { useState } from "react";

export default function AdjustTomorrowCard() {
  const [worked, setWorked] = useState("");
  const [change, setChange] = useState("");
  const [tomorrowSmallest, setTomorrowSmallest] = useState("");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-sm font-semibold">Compare & Adjust</div>
      <div className="mt-1 text-sm text-neutral-500">
        Keep this light. The goal is iteration, not perfection.
      </div>

      <div className="mt-3 grid gap-2">
        <input
          value={worked}
          onChange={(e) => setWorked(e.target.value)}
          placeholder="What worked today? (optional)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <input
          value={change}
          onChange={(e) => setChange(e.target.value)}
          placeholder="What should change tomorrow? (optional)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <input
          value={tomorrowSmallest}
          onChange={(e) => setTomorrowSmallest(e.target.value)}
          placeholder="Tomorrow's smallest lever (optional)"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">
        Later: persist into Reflection or a "daily_adjustment" table.
      </div>
    </div>
  );
}
