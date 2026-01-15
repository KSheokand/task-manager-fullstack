export function normalizeLastNDays(chartObj, days = 10) {
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const key = d.toISOString().slice(0, 10);

    result.push({
      date: key,
      value: chartObj?.[key] || 0
    });
  }

  return result;
}
