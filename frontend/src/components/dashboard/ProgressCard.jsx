export default function ProgressCard({ title, data }) {
  const total = data.total || 0;
  const completed = data.completed || 0;
  const pending = data.pending || 0;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-purple-600"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{completed} completed</span>
        <span>{pending} pending</span>
      </div>
    </div>
  );
}
