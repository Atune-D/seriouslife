"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function TaskModal({
  open,
  onClose,
  scope,
}: {
  open: boolean;
  onClose: () => void;
  scope: "today" | "weekly" | "monthly";
}) {
  const { addTodayTask, addWeeklyTask, addMonthlyTask } = useAppStore();
  const [title, setTitle] = useState("");
  const [tinyStart, setTinyStart] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!title.trim() || !tinyStart.trim()) return;

    const task = { title: title.trim(), tinyStart: tinyStart.trim() };
    
    if (scope === "today") addTodayTask(task);
    else if (scope === "weekly") addWeeklyTask(task);
    else addMonthlyTask(task);

    setTitle("");
    setTinyStart("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold">New {scope.charAt(0).toUpperCase() + scope.slice(1)} Task</h2>
          <p className="text-sm text-neutral-500 mt-1">Add a task with a tiny start action</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Write draft proposal"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tiny Start (2-min action) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tinyStart}
              onChange={(e) => setTinyStart(e.target.value)}
              placeholder="e.g., Open blank document and write 3 bullets"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !tinyStart.trim()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
