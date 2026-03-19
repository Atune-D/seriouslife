"use client";

import type { Direction } from "./types";

export default function Sidebar({
  direction,
  onOpenDirection,
}: {
  direction: Direction;
  onOpenDirection: () => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Direction
        </div>
        <button
          onClick={onOpenDirection}
          className="rounded-lg border border-neutral-200 px-3 py-1 text-xs hover:bg-neutral-50"
        >
          Edit
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-neutral-500">Vision</div>
          <div className="mt-1 line-clamp-3 text-sm">{direction.vision}</div>
        </div>

        <div>
          <div className="text-xs text-neutral-500">1-Year Lens</div>
          <div className="mt-1 line-clamp-2 text-sm">{direction.oneYearLens}</div>
        </div>

        <div>
          <div className="text-xs text-neutral-500">Constraints</div>
          <ul className="mt-1 space-y-1">
            {direction.constraints.slice(0, 3).map((c, i) => (
              <li key={i} className="text-xs text-neutral-700">• {c}</li>
            ))}
            {direction.constraints.length > 3 && (
              <li className="text-xs text-neutral-400">+{direction.constraints.length - 3} more</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
