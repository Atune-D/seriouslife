"use client";

import { useAppStore } from "@/lib/store";
import TaskList from "@/components/shared/TaskList";

export default function MonthlyPage() {
  const { monthlyTasks } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-neutral-500">MONTHLY OBJECTIVES</h2>
        <p className="mt-2 text-neutral-700">
          Set your major goals for this month. Break them down into weekly and daily tasks.
        </p>
      </div>

      <TaskList tasks={monthlyTasks} scope="monthly" />
    </div>
  );
}
