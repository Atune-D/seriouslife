"use client";

import { useAppStore } from "@/lib/store";
import TaskList from "@/components/shared/TaskList";

export default function WeeklyPage() {
  const { weeklyTasks } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-neutral-500">WEEKLY FOCUS</h2>
        <p className="mt-2 text-neutral-700">
          Focus on 1-3 key objectives for this week. These should align with your monthly and overall vision.
        </p>
      </div>

      <TaskList tasks={weeklyTasks} scope="weekly" />
    </div>
  );
}
