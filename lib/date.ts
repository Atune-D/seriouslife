export function weekDays() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return labels.map((label, idx) => ({ key: `${idx}`, label }));
}
