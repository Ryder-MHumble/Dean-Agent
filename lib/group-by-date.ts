/**
 * Groups items by date into 今天 (Today), 本周 (This Week), 更早 (Earlier).
 * Items must have a `date` field as an ISO date string (YYYY-MM-DD).
 * "本周" uses a rolling 7-day window (past 7 days excluding today).
 * Empty groups are filtered out — only groups with items are returned.
 */
export function groupByDate<T extends { date: string }>(
  items: T[],
): { label: string; items: T[] }[] {
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().slice(0, 10);

  return [
    { label: "今天", items: items.filter((i) => i.date === today) },
    {
      label: "本周",
      items: items.filter((i) => i.date < today && i.date >= sevenDaysAgoStr),
    },
    { label: "更早", items: items.filter((i) => i.date < sevenDaysAgoStr) },
  ].filter((g) => g.items.length > 0);
}
