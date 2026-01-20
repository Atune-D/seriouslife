"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function TaskListCard() {
  const { tasks, addTask, setTaskProgress, markTaskDone } = useAppStore();
  const [title, setTitle] = useState("");
  const [tinyStart, setTinyStart] = useState("");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-sm font-semibold">Tasks</div>

      <div className="mt-3 space-y-2">
        {tasks.length === 0 ? (
          <div className="text-sm text-neutral-500">Add 1 small lever for today.</div>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="rounded-xl border border-neutral-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="mt-1 text-xs text-neutral-500 truncate">Tiny start: {t.tinyStart}</div>
                </div>

                <button
                  onClick={() => markTaskDone(t.id)}
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800"
                >
                  Done
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="text-xs text-neutral-500">Progress</div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={t.progress}
                  onChange={(e) => setTaskProgress(t.id, Number(e.target.value))}
                  className="w-full"
                />
                <div className="w-8 text-right text-sm font-semibold">{t.progress}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 rounded-xl bg-neutral-50 p-3">
        <div className="text-xs font-semibold text-neutral-500">ADD TASK</div>
        <div className="mt-2 grid grid-cols-1 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
          />
          <input
            value={tinyStart}
            onChange={(e) => setTinyStart(e.target.value)}
            placeholder="Tiny start (2 minutes). Example: open file and write 3 bullets"
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (!title.trim() || !tinyStart.trim()) return;
                addTask({ title: title.trim(), tinyStart: tinyStart.trim() });
                setTitle("");
                setTinyStart("");
              }}
              className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">Later: add steps checklist + KPI linking.</div>
    </div>
  );
}
