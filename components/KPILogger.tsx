'use client';

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { incrementKPI } from '@/lib/api-client';

interface KPI {
  id: string;
  name: string;
  unit: string;
  target: number | null;
  todayValue: number;
}

interface KPILoggerProps {
  kpis: KPI[];
  date: string;
  onUpdate?: () => void;
}

export function KPILogger({ kpis, date, onUpdate }: KPILoggerProps) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(kpis.map((kpi) => [kpi.id, kpi.todayValue]))
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleIncrement = async (kpiId: string, delta: number) => {
    setLoading((prev) => ({ ...prev, [kpiId]: true }));
    
    // Optimistic update
    const newValue = Math.max(0, values[kpiId] + delta);
    setValues((prev) => ({ ...prev, [kpiId]: newValue }));

    try {
      const result = await incrementKPI(kpiId, date, delta);
      setValues((prev) => ({ ...prev, [kpiId]: result.value }));
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update KPI:', error);
      // Revert on error
      setValues((prev) => ({ ...prev, [kpiId]: values[kpiId] - delta }));
    } finally {
      setLoading((prev) => ({ ...prev, [kpiId]: false }));
    }
  };

  if (kpis.length === 0) {
    return (
      <Card title="KPI Quick Log">
        <p className="text-gray-500 dark:text-gray-400">
          No KPIs defined yet. Go to Goals to create your KPIs.
        </p>
      </Card>
    );
  }

  return (
    <Card title="KPI Quick Log">
      <div className="space-y-4">
        {kpis.map((kpi) => {
          const currentValue = values[kpi.id] ?? 0;
          const isLoading = loading[kpi.id];

          return (
            <div key={kpi.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{kpi.name}</h3>
                {kpi.target && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {kpi.target} {kpi.unit}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleIncrement(kpi.id, -1)}
                  disabled={isLoading || currentValue === 0}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  −
                </button>

                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold">{currentValue}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {kpi.unit}
                  </div>
                </div>

                <button
                  onClick={() => handleIncrement(kpi.id, 1)}
                  disabled={isLoading}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}


