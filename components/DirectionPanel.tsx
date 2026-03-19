"use client";

import { useState } from "react";
import type { Direction } from "./types";

export default function DirectionPanel({
  open,
  onClose,
  direction,
  setDirection,
}: {
  open: boolean;
  onClose: () => void;
  direction: Direction;
  setDirection: (d: Direction) => void;
}) {
  const [showAnti, setShowAnti] = useState(false);
  const [newConstraint, setNewConstraint] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="Close"
      />
      {/* panel */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div>
            <div className="text-sm font-semibold">Direction</div>
            <div className="text-xs text-neutral-500">
              Short, factual, 1–2 sentences each.
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-3 py-1 text-sm hover:bg-neutral-50"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <Field
            label="Vision"
            value={direction.vision}
            onChange={(v) => setDirection({ ...direction, vision: v })}
          />

          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Anti-vision
              </div>
              <button
                onClick={() => setShowAnti((s) => !s)}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-900"
              >
                {showAnti ? "Hide" : "Show"}
              </button>
            </div>
            {!showAnti ? (
              <div className="mt-2 text-sm text-neutral-500">
                Hidden by default to reduce pressure.
              </div>
            ) : (
              <textarea
                value={direction.antiVision}
                onChange={(e) => setDirection({ ...direction, antiVision: e.target.value })}
                className="mt-3 h-24 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
              />
            )}
          </div>

          <Field
            label="1-year lens"
            value={direction.oneYearLens}
            onChange={(v) => setDirection({ ...direction, oneYearLens: v })}
          />

          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Constraints
            </div>

            <div className="mt-3 space-y-2">
              {direction.constraints.map((c, idx) => (
                <div key={`${c}-${idx}`} className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2">
                  <div className="text-sm">{c}</div>
                  <button
                    onClick={() =>
                      setDirection({
                        ...direction,
                        constraints: direction.constraints.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={newConstraint}
                onChange={(e) => setNewConstraint(e.target.value)}
                className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                placeholder="Add a constraint (short rule)"
              />
              <button
                onClick={() => {
                  const v = newConstraint.trim();
                  if (!v) return;
                  setDirection({ ...direction, constraints: [...direction.constraints, v] });
                  setNewConstraint("");
                }}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Add
              </button>
            </div>
          </div>

          <div className="text-xs text-neutral-400">
            MVP: local state. Wire to DB later.
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 h-20 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
      />
    </div>
  );
}
