"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function KpiManager() {
  const { kpis, addKpi, removeKpi } = useAppStore();
  const [name, setName] = useState("");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-sm font-semibold">KPIs</div>
      <div className="mt-3 space-y-2">
        {kpis.map((k) => (
          <div key={k.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
            <div className="text-sm font-medium">{k.name}</div>
            <button
              onClick={() => removeKpi(k.id)}
              className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add KPI (max 3 recommended)"
          className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />
        <button
          onClick={() => {
            const v = name.trim();
            if (!v) return;
            addKpi(v);
            setName("");
          }}
          className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Add
        </button>
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">Later: sync KPIs to DB.</div>
    </div>
  );
}
