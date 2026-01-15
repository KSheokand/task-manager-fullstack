export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full md:w-1/4"
      />

      {/* STATUS */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* PRIORITY */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* CATEGORY */}
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      />
    </div>
  );
}
