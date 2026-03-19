"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import type { Task } from "@/lib/types";

export default function TaskEditModal({
  open,
  onClose,
  task,
  scope,
}: {
  open: boolean;
  onClose: () => void;
  task: Task;
  scope: "today" | "weekly" | "monthly";
}) {
  const { updateTask, addSubtask, toggleSubtask, removeSubtask } = useAppStore();
  const [title, setTitle] = useState(task.title);
  const [tinyStart, setTinyStart] = useState(task.tinyStart);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  if (!open) return null;

  const handleSave = () => {
    updateTask(scope, task.id, { title: title.trim(), tinyStart: tinyStart.trim() });
    onClose();
  };

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    addSubtask(scope, task.id, newSubtaskText.trim());
    setNewSubtaskText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <p className="text-sm text-neutral-500 mt-1">Update task details and manage subtasks</p>
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

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Subtasks</label>
            
            {task.subtasks.length > 0 && (
              <div className="space-y-2 mb-3">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2 rounded-xl border border-neutral-200 p-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(scope, task.id, subtask.id)}
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                    <span className={`flex-1 text-sm ${subtask.completed ? "line-through text-neutral-500" : "text-neutral-900"}`}>
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => removeSubtask(scope, task.id, subtask.id)}
                      className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                placeholder="Add a subtask..."
                className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddSubtask}
                disabled={!newSubtaskText.trim()}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
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
            onClick={handleSave}
            disabled={!title.trim() || !tinyStart.trim()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
