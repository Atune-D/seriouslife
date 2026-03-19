"use client";

import { useState } from "react";

type Energy = "low" | "medium" | "high";

export default function ReflectionCard() {
  const [open, setOpen] = useState(false);
  const [energy, setEnergy] = useState<Energy>("medium");
  const [stuckReason, setStuckReason] = useState("");
  const [tomorrowChange, setTomorrowChange] = useState("");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between">
        <div className="text-sm font-semibold">Night Reflection</div>
        <span className="text-xs text-neutral-500">{open ? "Hide" : "Open"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <div>
            <div className="text-xs font-semibold text-neutral-500">ENERGY</div>
            <div className="mt-2 flex gap-2">
              {(["low", "medium", "high"] as Energy[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEnergy(e)}
                  className={[
                    "rounded-xl px-3 py-2 text-sm font-medium border",
                    energy === e ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <input
              value={stuckReason}
              onChange={(ev) => setStuckReason(ev.target.value)}
              placeholder="Why I got stuck today (optional, 1 line)"
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            />
            <input
              value={tomorrowChange}
              onChange={(ev) => setTomorrowChange(ev.target.value)}
              placeholder="What I will do differently tomorrow (optional, 1 line)"
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
