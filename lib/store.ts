"use client";

import { create } from "zustand";
import type { Kpi, Task } from "./types";

type UIState = {
  isWhyOpen: boolean;
  openWhy: () => void;
  closeWhy: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isWhyOpen: false,
  openWhy: () => set({ isWhyOpen: true }),
  closeWhy: () => set({ isWhyOpen: false }),
}));

type AppState = {
  vision: string;
  setVision: (v: string) => void;

  kpis: Kpi[];
  addKpi: (name: string) => void;
  removeKpi: (id: string) => void;
  incKpi: (id: string) => void;
  decKpi: (id: string) => void;

  todayTasks: Task[];
  weeklyTasks: Task[];
  monthlyTasks: Task[];
  
  addTodayTask: (t: { title: string; tinyStart: string }) => void;
  addWeeklyTask: (t: { title: string; tinyStart: string }) => void;
  addMonthlyTask: (t: { title: string; tinyStart: string }) => void;
  
  updateTask: (scope: 'today' | 'weekly' | 'monthly', id: string, updates: Partial<Task>) => void;
  setTaskProgress: (scope: 'today' | 'weekly' | 'monthly', id: string, progress: number) => void;
  markTaskDone: (scope: 'today' | 'weekly' | 'monthly', id: string) => void;
  removeTask: (scope: 'today' | 'weekly' | 'monthly', id: string) => void;
  
  addSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, text: string) => void;
  toggleSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, subtaskId: string) => void;
  removeSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, subtaskId: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  vision: "Build consistent action with low friction",
  setVision: (v) => set({ vision: v }),

  kpis: [
    { id: "k1", name: "2-min start", unit: "count", value: 0 },
    { id: "k2", name: "Deep work blocks", unit: "count", value: 0 },
  ],
  addKpi: (name) =>
    set((s) => ({
      kpis: s.kpis.length >= 6 ? s.kpis : [...s.kpis, { id: crypto.randomUUID(), name, unit: "count", value: 0 }],
    })),
  removeKpi: (id) => set((s) => ({ kpis: s.kpis.filter((k) => k.id !== id) })),
  incKpi: (id) => set((s) => ({ kpis: s.kpis.map((k) => (k.id === id ? { ...k, value: k.value + 1 } : k)) })),
  decKpi: (id) =>
    set((s) => ({
      kpis: s.kpis.map((k) => (k.id === id ? { ...k, value: Math.max(0, k.value - 1) } : k)),
    })),

  todayTasks: [],
  weeklyTasks: [],
  monthlyTasks: [],

  addTodayTask: ({ title, tinyStart }) =>
    set((s) => ({
      todayTasks: [...s.todayTasks, { id: crypto.randomUUID(), title, tinyStart, progress: 0, subtasks: [] }],
    })),
  addWeeklyTask: ({ title, tinyStart }) =>
    set((s) => ({
      weeklyTasks: [...s.weeklyTasks, { id: crypto.randomUUID(), title, tinyStart, progress: 0, subtasks: [] }],
    })),
  addMonthlyTask: ({ title, tinyStart }) =>
    set((s) => ({
      monthlyTasks: [...s.monthlyTasks, { id: crypto.randomUUID(), title, tinyStart, progress: 0, subtasks: [] }],
    })),

  setTaskProgress: (scope, id, progress) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) => (t.id === id ? { ...t, progress } : t)),
    })),
  markTaskDone: (scope, id) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) => (t.id === id ? { ...t, progress: 10 } : t)),
    })),
  removeTask: (scope, id) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].filter((t: Task) => t.id !== id),
    })),

  updateTask: (scope, id, updates) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  addSubtask: (scope, taskId, text) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) =>
        t.id === taskId
          ? { ...t, subtasks: [...t.subtasks, { id: crypto.randomUUID(), text, completed: false }] }
          : t
      ),
    })),

  toggleSubtask: (scope, taskId, subtaskId) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((st) => (st.id === subtaskId ? { ...st, completed: !st.completed } : st)),
            }
          : t
      ),
    })),

  removeSubtask: (scope, taskId, subtaskId) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) =>
        t.id === taskId ? { ...t, subtasks: t.subtasks.filter((st) => st.id !== subtaskId) } : t
      ),
    })),
}));
