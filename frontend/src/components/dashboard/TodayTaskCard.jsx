import { useNavigate } from "react-router-dom";

export default function TodayTaskCard({ pending }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F3EDFF] rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-purple-700">
          Today Task
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          You have {pending} pending tasks today
        </p>

        <button
          onClick={() => navigate("/planned")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Today’s schedule
        </button>
      </div>

      <div className="w-24 h-24 bg-purple-200 rounded-xl" />
    </div>
  );
}
