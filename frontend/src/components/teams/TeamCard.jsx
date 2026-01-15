import { useNavigate } from "react-router-dom";

export default function TeamCard({ team }) {
  const navigate = useNavigate();
  const members = team.members || []; // ✅ safety guard

  return (
    <div
      onClick={() => navigate(`/teams/${team._id}`)}
      className="bg-white rounded-2xl p-5 shadow-sm card-hover cursor-pointer"
    >
      <h3 className="font-semibold">{team.name}</h3>

      <p className="text-sm text-gray-400 mt-1">
        {members.length} members
      </p>

      <div className="flex -space-x-2 mt-4">
        {members.slice(0, 3).map(m => (
          <div
            key={m._id}
            className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-semibold"
          >
            {m.name?.[0]}
          </div>
        ))}

        {members.length > 3 && (
          <span className="text-xs text-gray-400 ml-3">
            +{members.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}
