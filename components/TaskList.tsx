"use client";

import { useMemo, useState } from "react";
import type { Task, TaskScope } from "./types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function TaskList({
  tasks,
  allTasks,
  setTasks,
  scope,
}: {
  tasks: Task[];
  allTasks: Task[];
  setTasks: (t: Task[]) => void;
  scope: TaskScope;
}) {
  const [title, setTitle] = useState("");
  const [tinyStart, setTinyStart] = useState("");

  const canAdd = useMemo(() => title.trim().length > 0, [title]);

  function addTask() {
    if (!canAdd) return;
    const next: Task = {
      id: uid(),
      title: title.trim(),
      tinyStart: tinyStart.trim() || undefined,
      done: false,
      scope,
      subtasks: [],
    };
    setTasks([next, ...allTasks]);
    setTitle("");
    setTinyStart("");
  }

  function toggleTask(id: string) {
    setTasks(
      allTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function addSubtask(taskId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks(
      allTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: [...t.subtasks, { id: uid(), text: trimmed, done: false }],
            }
          : t
      )
    );
  }

  function toggleSubtask(taskId: string, subId: string) {
    setTasks(
      allTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subId ? { ...s, done: !s.done } : s
              ),
            }
          : t
      )
    );
  }

  return (
    <div>
      {/* Add */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            placeholder="New task title..."
          />
          <input
            value={tinyStart}
            onChange={(e) => setTinyStart(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            placeholder="Tiny start (optional): e.g., open file and write 1 line"
          />
          <div className="flex justify-end">
            <button
              onClick={addTask}
              disabled={!canAdd}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold",
                canAdd
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-500",
              ].join(" ")}
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mt-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
            No tasks yet. Add one above.
          </div>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleTask(t.id)}
                      className="h-4 w-4"
                    />
                    <div className={["text-sm font-semibold", t.done ? "line-through text-neutral-400" : ""].join(" ")}>
                      {t.title}
                    </div>
                  </div>
                  {t.tinyStart ? (
                    <div className="mt-1 text-xs text-neutral-500">
                      Tiny start: <span className="text-neutral-700">{t.tinyStart}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Subtasks */}
              <Subtasks
                task={t}
                onAdd={(text) => addSubtask(t.id, text)}
                onToggle={(subId) => toggleSubtask(t.id, subId)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Subtasks({
  task,
  onAdd,
  onToggle,
}: {
  task: Task;
  onAdd: (text: string) => void;
  onToggle: (subId: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="mt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Subtasks ({task.subtasks.filter((s) => s.done).length}/{task.subtasks.length})
      </div>

      <div className="mt-2 space-y-2">
        {task.subtasks.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={s.done} onChange={() => onToggle(s.id)} className="h-4 w-4" />
            <span className={s.done ? "line-through text-neutral-400" : ""}>{s.text}</span>
          </label>
        ))}

        <div className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            placeholder="Add subtask..."
          />
          <button
            onClick={() => {
              onAdd(text);
              setText("");
            }}
            className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
