export type Kpi = {
  id: string;
  name: string;
  unit: string;
  value: number;
};

export type Subtask = {
  id: string;
  text: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  tinyStart: string;
  progress: number;
  subtasks: Subtask[];
};
