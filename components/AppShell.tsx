"use client";

import { useMemo, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import DirectionPanel from "./DirectionPanel";
import TaskList from "./TaskList";
import type { Direction, Task, TaskScope } from "./types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function AppShell({ initialScope }: { initialScope: TaskScope }) {
  const [scope, setScope] = useState<TaskScope>(initialScope);
  const [directionOpen, setDirectionOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize state with localStorage or defaults
  const [weeklyTheme, setWeeklyTheme] = useState("");
  const [monthlyTheme, setMonthlyTheme] = useState("");
  const [direction, setDirection] = useState<Direction>({
    vision: "",
    antiVision: "",
    oneYearLens: "",
    constraints: [],
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedWeeklyTheme = localStorage.getItem("weeklyTheme");
    const savedMonthlyTheme = localStorage.getItem("monthlyTheme");
    const savedDirection = localStorage.getItem("direction");
    const savedTasks = localStorage.getItem("tasks");

    if (savedWeeklyTheme) setWeeklyTheme(savedWeeklyTheme);
    else setWeeklyTheme("Consistent action with low friction");

    if (savedMonthlyTheme) setMonthlyTheme(savedMonthlyTheme);
    else setMonthlyTheme("Build routines that survive stress");

    if (savedDirection) {
      setDirection(JSON.parse(savedDirection));
    } else {
      setDirection({
        vision: "Build consistent action with low friction.",
        antiVision: "I tolerate avoidance, drift, and wasted time until opportunities close.",
        oneYearLens: "In one year, I reliably start and finish important work weekly.",
        constraints: ["Sleep ≥ 7 hours", "No all-nighters for fake productivity"],
      });
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([
        {
          id: uid(),
          title: "Open project and run dev server",
          tinyStart: "Run `npm run dev`",
          done: false,
          scope: "today",
          subtasks: [
            { id: uid(), text: "Open terminal", done: true },
            { id: uid(), text: "Run dev command", done: false },
          ],
        },
        {
          id: uid(),
          title: "Define 3 tasks for the week",
          tinyStart: "Write 1 weekly task",
          done: false,
          scope: "weekly",
          subtasks: [],
        },
        {
          id: uid(),
          title: "Reduce avoidance triggers",
          tinyStart: "List 1 trigger",
          done: false,
          scope: "monthly",
          subtasks: [],
        },
      ]);
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("weeklyTheme", weeklyTheme);
    }
  }, [weeklyTheme, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("monthlyTheme", monthlyTheme);
    }
  }, [monthlyTheme, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("direction", JSON.stringify(direction));
    }
  }, [direction, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const filteredTasks = useMemo(
    () => tasks.filter((t) => t.scope === scope),
    [tasks, scope]
  );

  // Auto "week at a glance" (very simple placeholder):
  // mark day active if any task is done in that scope (you'll replace with real DB + date later)
  const weekActive = useMemo(() => {
    const doneCount = tasks.filter((t) => t.done).length;
    return Array.from({ length: 7 }, (_, i) => (doneCount > i ? "active" : "idle"));
  }, [tasks]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 px-4 py-8">
        {/* Left */}
        <div className="col-span-12 md:col-span-3">
          <Sidebar
            direction={direction}
            onOpenDirection={() => setDirectionOpen(true)}
          />
        </div>

        {/* Center */}
        <div className="col-span-12 md:col-span-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            {/* Task Scope Selector */}
            <div className="mb-5 flex gap-2">
              <button
                onClick={() => setScope("today")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold",
                  scope === "today"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                ].join(" ")}
              >
                Today
              </button>
              <button
                onClick={() => setScope("weekly")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold",
                  scope === "weekly"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                ].join(" ")}
              >
                Weekly
              </button>
              <button
                onClick={() => setScope("monthly")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold",
                  scope === "monthly"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                ].join(" ")}
              >
                Monthly
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  {scope === "today" ? "Today" : scope === "weekly" ? "Weekly" : "Monthly"}
                </h1>
                <p className="text-sm text-neutral-500">
                  {scope === "today"
                    ? "Your daily priorities"
                    : scope === "weekly"
                    ? "What must happen this week"
                    : "What matters this month"}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <TaskList tasks={filteredTasks} allTasks={tasks} setTasks={setTasks} scope={scope} />
            </div>

            {/* Compare & Adjust (light) */}
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-sm font-semibold">Compare & Adjust</div>
              <div className="text-xs text-neutral-500">
                Keep this light. The goal is iteration, not perfection.
              </div>
              <div className="mt-3 space-y-2">
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="What worked today? (optional)"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="What should change tomorrow? (optional)"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Tomorrow's smallest lever (optional)"
                />
              </div>
            </div>

            {/* Night Reflection */}
            <details className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
              <summary className="cursor-pointer list-none select-none text-sm font-semibold">
                Night Reflection
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  (optional, 1–2 minutes)
                </span>
              </summary>

              <div className="mt-3 grid gap-2">
                <select className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200">
                  <option>Energy: low</option>
                  <option>Energy: medium</option>
                  <option>Energy: high</option>
                </select>
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Why did I get stuck? (optional)"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="One change for tomorrow (optional)"
                />
              </div>
            </details>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 md:col-span-3">
          <RightPanel 
            weeklyTheme={weeklyTheme}
            monthlyTheme={monthlyTheme}
            onWeeklyChange={setWeeklyTheme}
            onMonthlyChange={setMonthlyTheme}
            onOpenDirection={() => setDirectionOpen(true)} 
            weekActive={weekActive} 
          />
        </div>
      </div>

      <DirectionPanel
        open={directionOpen}
        onClose={() => setDirectionOpen(false)}
        direction={direction}
        setDirection={setDirection}
      />
    </div>
  );
}
