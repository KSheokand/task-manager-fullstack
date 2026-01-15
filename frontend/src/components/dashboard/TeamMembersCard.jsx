export default function TeamMembersCard() {
  const members = ["Ali", "Maria", "John"];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-4">Team Members</h3>

      {members.map(m => (
        <div key={m} className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-200" />
          <div>
            <p className="text-sm">{m}</p>
            <p className="text-xs text-gray-400">Designer</p>
          </div>
        </div>
      ))}

      <button className="text-purple-500 text-sm mt-2">See all</button>
    </div>
  );
}
