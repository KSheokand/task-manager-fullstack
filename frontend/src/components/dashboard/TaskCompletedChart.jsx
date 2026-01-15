import { useState, memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { normalizeLastNDays } from "../../utils/chartUtils";

function TasksCompletedChart({ personal, team }) {
  const [active, setActive] = useState(0);

  const charts = [
    {
      label: "Personal",
      data: normalizeLastNDays(personal),
      color: "#7C3AED"
    },
    {
      label: "Team",
      data: normalizeLastNDays(team),
      color: "#2563EB"
    }
  ];

  const activeChart = charts[active];

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          Tasks Completed (Last 10 Days)
        </h3>
        <span className="text-sm text-gray-400">
          {activeChart.label}
        </span>
      </div>

      {/* CHART AREA — FLEX GROW */}
      <div className="flex-1 min-h-70">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activeChart.data}>
            <XAxis
              dataKey="date"
              tickFormatter={d => d.slice(8)}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={activeChart.color}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DOT NAVIGATION */}
      <div className="flex justify-center gap-2 mt-4">
        {charts.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              active === i ? "bg-purple-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(TasksCompletedChart);
