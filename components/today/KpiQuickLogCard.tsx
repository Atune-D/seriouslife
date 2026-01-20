"use client";

import { useAppStore } from "@/lib/store";

export default function KpiQuickLogCard() {
  const { kpis, incKpi, decKpi } = useAppStore();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-sm font-semibold">KPI Quick Log</div>
      <div className="mt-3 space-y-2">
        {kpis.length === 0 ? (
          <div className="text-sm text-neutral-500">No KPIs yet. Add 1–3 in Goals.</div>
        ) : (
          kpis.map((k) => (
            <div key={k.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{k.name}</div>
                <div className="text-xs text-neutral-500">{k.unit}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decKpi(k.id)}
                  className="h-8 w-8 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                >
                  −
                </button>
                <div className="w-10 text-center text-sm font-semibold">{k.value}</div>
                <button
                  onClick={() => incKpi(k.id)}
                  className="h-8 w-8 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-2 text-[11px] text-neutral-500">Later: connect +/- to /api/kpi-entries/increment.</div>
    </div>
  );
}
