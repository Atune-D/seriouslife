"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function WhyPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { 
    vision, setVision,
    antiVision, setAntiVision,
    oneYearLens, setOneYearLens,
    constraints, addConstraint, removeConstraint
  } = useAppStore();

  const [showAnti, setShowAnti] = useState(false);
  const [newConstraint, setNewConstraint] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-neutral-200 p-4">
            <div>
              <div className="text-sm font-semibold">Direction</div>
              <div className="text-xs text-neutral-500">Short, factual, 1–2 sentences each.</div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <section className="rounded-2xl border border-neutral-200 p-3">
              <div className="text-xs font-semibold text-neutral-500">VISION</div>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="What life are you building?"
                className="mt-2 w-full resize-none rounded-xl border border-neutral-200 p-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                rows={3}
              />
            </section>

            <section className="rounded-2xl border border-neutral-200 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-neutral-500">ANTI-VISION</div>
                <button
                  onClick={() => setShowAnti((v) => !v)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  {showAnti ? "Hide" : "Show"}
                </button>
              </div>
              {showAnti ? (
                <textarea
                  value={antiVision}
                  onChange={(e) => setAntiVision(e.target.value)}
                  placeholder="What are you moving away from?"
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-200 p-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  rows={3}
                />
              ) : (
                <div className="mt-2 text-sm text-neutral-500">
                  Hidden by default to reduce pressure.
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-neutral-200 p-3">
              <div className="text-xs font-semibold text-neutral-500">1-YEAR LENS</div>
              <textarea
                value={oneYearLens}
                onChange={(e) => setOneYearLens(e.target.value)}
                placeholder="A year from now..."
                className="mt-2 w-full resize-none rounded-xl border border-neutral-200 p-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                rows={3}
              />
            </section>

            <section className="rounded-2xl border border-neutral-200 p-3">
              <div className="text-xs font-semibold text-neutral-500">CONSTRAINTS</div>

              <ul className="mt-2 space-y-2">
                {constraints.map((c, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-2 rounded-xl bg-neutral-50 p-2">
                    <span className="text-sm text-neutral-800">{c}</span>
                    <button
                      onClick={() => removeConstraint(idx)}
                      className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex gap-2">
                <input
                  value={newConstraint}
                  onChange={(e) => setNewConstraint(e.target.value)}
                  placeholder="Add a constraint (short rule)"
                  className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                />
                <button
                  onClick={() => {
                    const v = newConstraint.trim();
                    if (!v) return;
                    addConstraint(v);
                    setNewConstraint("");
                  }}
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Add
                </button>
              </div>
            </section>

            <div className="text-[11px] text-neutral-500">
              These changes are saved to your local state. API persistence coming soon.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
