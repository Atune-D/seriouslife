// API Client utilities for making requests to the backend

export async function fetchTodayData(date?: string) {
  const url = date ? `/api/today?date=${date}` : '/api/today';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch today data');
  return response.json();
}

export async function incrementKPI(kpiId: string, date: string, delta: number) {
  const response = await fetch('/api/kpi-entries/increment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kpi_id: kpiId, date, delta }),
  });
  if (!response.ok) throw new Error('Failed to increment KPI');
  return response.json();
}

export async function createTask(data: {
  title: string;
  tiny_start: string;
  date: string;
  resistance?: string;
}) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(
  taskId: string,
  data: {
    status?: string;
    resistance?: string;
    progress_score?: number;
  }
) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(taskId: string) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
}

export async function createTaskStep(taskId: string, title: string) {
  const response = await fetch(`/api/tasks/${taskId}/steps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Failed to create step');
  return response.json();
}

export async function updateTaskStep(
  taskId: string,
  stepId: string,
  data: { is_done?: boolean; title?: string }
) {
  const response = await fetch(`/api/tasks/${taskId}/steps/${stepId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update step');
  return response.json();
}

export async function deleteTaskStep(taskId: string, stepId: string) {
  const response = await fetch(`/api/tasks/${taskId}/steps/${stepId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete step');
  return response.json();
}

export async function saveReflection(data: {
  date: string;
  energy: string;
  mood?: string;
  did?: string;
  blocked?: string;
}) {
  const response = await fetch('/api/reflections', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save reflection');
  return response.json();
}

export async function createQuarterTheme(data: {
  title: string;
  why?: string;
  start_date: string;
  end_date: string;
}) {
  const response = await fetch('/api/quarter-themes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create quarter theme');
  return response.json();
}

export async function fetchQuarterThemes() {
  const response = await fetch('/api/quarter-themes');
  if (!response.ok) throw new Error('Failed to fetch quarter themes');
  return response.json();
}

export async function createKPI(data: {
  quarter_theme_id: string;
  name: string;
  unit?: string;
  cadence?: string;
  target?: number;
  action_template?: string;
}) {
  const response = await fetch('/api/kpis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create KPI');
  return response.json();
}

export async function fetchKPIs(quarterThemeId?: string) {
  const url = quarterThemeId
    ? `/api/kpis?quarter_theme_id=${quarterThemeId}`
    : '/api/kpis';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch KPIs');
  return response.json();
}


