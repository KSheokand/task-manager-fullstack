import { useNavigate } from "react-router-dom";

export default function TeamsCard({ teams }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold mb-4">My Teams</h3>

      {teams.length === 0 ? (
        <p className="text-sm text-gray-400">No teams yet</p>
      ) : (
        <div className="space-y-3">
          {teams.map(team => (
            <div
              key={team._id}
              onClick={() => navigate(`/teams/${team._id}`)}
              className="cursor-pointer p-3 rounded-xl hover:bg-purple-50 transition"
            >
              <p className="font-medium">{team.name}</p>
              <p className="text-xs text-gray-400">
                {team.members.length} members
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
