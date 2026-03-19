"use client";

import { create } from "zustand";
import type { Task } from "./types";

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
  antiVision: string;
  setAntiVision: (v: string) => void;
  oneYearLens: string;
  setOneYearLens: (v: string) => void;
  constraints: string[];
  addConstraint: (text: string) => void;
  removeConstraint: (index: number) => void;
  updateConstraint: (index: number, text: string) => void;

  todayGoal: string;
  setTodayGoal: (v: string) => void;
  weeklyTheme: string;
  setWeeklyTheme: (v: string) => void;
  monthlyTheme: string;
  setMonthlyTheme: (v: string) => void;

  todayTasks: Task[];
  weeklyTasks: Task[];
  monthlyTasks: Task[];
  
  addTodayTask: (t: { title: string; tinyStart: string }) => void;
  addWeeklyTask: (t: { title: string; tinyStart: string }) => void;
  addMonthlyTask: (t: { title: string; tinyStart: string }) => void;
  
  updateTask: (scope: 'today' | 'weekly' | 'monthly', id: string, updates: Partial<Task>) => void;
  toggleTaskComplete: (scope: 'today' | 'weekly' | 'monthly', id: string) => void;
  removeTask: (scope: 'today' | 'weekly' | 'monthly', id: string) => void;
  
  addSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, text: string) => void;
  toggleSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, subtaskId: string) => void;
  removeSubtask: (scope: 'today' | 'weekly' | 'monthly', taskId: string, subtaskId: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  vision: "Build consistent action with low friction",
  setVision: (v) => set({ vision: v }),
  antiVision: "Continue avoiding hard things, wasting time, and losing trust in myself",
  setAntiVision: (v) => set({ antiVision: v }),
  oneYearLens: "A year from now, I want to look back and see consistent daily action",
  setOneYearLens: (v) => set({ oneYearLens: v }),
  constraints: ["No more than 3 daily tasks", "2-minute start rule"],
  addConstraint: (text) => set((s) => ({ constraints: [...s.constraints, text] })),
  removeConstraint: (index) => set((s) => ({ constraints: s.constraints.filter((_, i) => i !== index) })),
  updateConstraint: (index, text) => set((s) => ({ constraints: s.constraints.map((c, i) => i === index ? text : c) })),

  todayGoal: "",
  setTodayGoal: (v) => set({ todayGoal: v }),
  weeklyTheme: "",
  setWeeklyTheme: (v) => set({ weeklyTheme: v }),
  monthlyTheme: "",
  setMonthlyTheme: (v) => set({ monthlyTheme: v }),

  todayTasks: [],
  weeklyTasks: [],
  monthlyTasks: [],

  addTodayTask: ({ title, tinyStart }) =>
    set((s) => ({
      todayTasks: [...s.todayTasks, { id: crypto.randomUUID(), title, tinyStart, completed: false, subtasks: [] }],
    })),
  addWeeklyTask: ({ title, tinyStart }) =>
    set((s) => ({
      weeklyTasks: [...s.weeklyTasks, { id: crypto.randomUUID(), title, tinyStart, completed: false, subtasks: [] }],
    })),
  addMonthlyTask: ({ title, tinyStart }) =>
    set((s) => ({
      monthlyTasks: [...s.monthlyTasks, { id: crypto.randomUUID(), title, tinyStart, completed: false, subtasks: [] }],
    })),

  toggleTaskComplete: (scope, id) =>
    set((s) => ({
      [`${scope}Tasks`]: s[`${scope}Tasks`].map((t: Task) => (t.id === id ? { ...t, completed: !t.completed } : t)),
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
