"use client";

import { useAppStore } from "@/lib/store";
import TaskList from "@/components/shared/TaskList";
import AdjustTomorrowCard from "@/components/today/AdjustTomorrowCard";
import ReflectionCard from "@/components/today/ReflectionCard";

export default function TodayPage() {
  const { todayTasks } = useAppStore();

  return (
    <div className="space-y-4">
      <TaskList tasks={todayTasks} scope="today" />
      <AdjustTomorrowCard />
      <ReflectionCard />
    </div>
  );
}
