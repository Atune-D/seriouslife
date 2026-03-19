export type TaskScope = "today" | "weekly" | "monthly";

export type Task = {
  id: string;
  title: string;
  tinyStart?: string;
  done: boolean;
  scope: TaskScope;
  subtasks: { id: string; text: string; done: boolean }[];
};

export type Direction = {
  vision: string;
  antiVision: string;
  oneYearLens: string;
  constraints: string[];
};

export type Themes = {
  todayGoal: string;
  weeklyTheme: string;
  monthlyTheme: string;
};
