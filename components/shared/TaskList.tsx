"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import type { Task } from "@/lib/types";
import TaskEditModal from "@/components/app/TaskEditModal";

export default function TaskList({ 
  tasks, 
  scope 
}: { 
  tasks: Task[]; 
  scope: "today" | "weekly" | "monthly";
}) {
  const { toggleTaskComplete, removeTask, addSubtask, toggleSubtask } = useAppStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addingSubtaskFor, setAddingSubtaskFor] = useState<string | null>(null);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
        <p className="text-neutral-500">No tasks yet. Click "+ New" to add one.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-neutral-900">{task.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">Tiny start: {task.tinyStart}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTask(task)}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Edit
              </button>
              <button
                onClick={() => removeTask(scope, task.id)}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskComplete(scope, task.id)}
              className="h-5 w-5 rounded border-neutral-300"
            />
            <span className={`text-sm font-medium ${task.completed ? "text-green-600" : "text-neutral-700"}`}>
              {task.completed ? "Completed" : "Mark as complete"}
            </span>
          </div>

          {task.subtasks.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-xs font-semibold text-neutral-500">
                SUBTASKS ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
              </div>
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(scope, task.id, subtask.id)}
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                  <span className={`text-sm ${subtask.completed ? "line-through text-neutral-500" : "text-neutral-900"}`}>
                    {subtask.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {addingSubtaskFor === task.id ? (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newSubtaskText.trim()) {
                    addSubtask(scope, task.id, newSubtaskText.trim());
                    setNewSubtaskText("");
                    setAddingSubtaskFor(null);
                  } else if (e.key === "Escape") {
                    setNewSubtaskText("");
                    setAddingSubtaskFor(null);
                  }
                }}
                placeholder="Add a subtask..."
                className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={() => {
                  if (newSubtaskText.trim()) {
                    addSubtask(scope, task.id, newSubtaskText.trim());
                    setNewSubtaskText("");
                    setAddingSubtaskFor(null);
                  }
                }}
                className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setNewSubtaskText("");
                  setAddingSubtaskFor(null);
                }}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingSubtaskFor(task.id)}
              className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              + Add subtask
            </button>
          )}
        </div>
      ))}

      {editingTask && (
        <TaskEditModal
          open={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
          scope={scope}
        />
      )}
    </div>
  );
}
