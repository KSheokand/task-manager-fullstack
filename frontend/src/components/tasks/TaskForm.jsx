import { useEffect, useState } from "react";

export default function TaskForm({
  initialData,
  onSubmit,
  onClose,
  members = []
}) {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignedTo: []
  });

  useEffect(() => {
    if (isEdit) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Pending",
        dueDate: initialData.dueDate
          ? initialData.dueDate.split("T")[0]
          : "",
        assignedTo: initialData.assignedTo
          ? initialData.assignedTo.map(u => u._id)
          : []
      });
    }
  }, [initialData, isEdit]);

  const toggleAssign = id => {
    setForm(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(id)
        ? prev.assignedTo.filter(x => x !== id)
        : [...prev.assignedTo, id]
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form, isEdit); // 🔥 EXPLICIT MODE
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-105"
      >
        <h3 className="font-semibold mb-4">
          {isEdit ? "Edit Task" : "New Task"}
        </h3>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Title"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Description"
          value={form.description}
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* ✅ DUE DATE (CRITICAL) */}
        <input
          type="date"
          className="border p-2 w-full mb-3 rounded"
          value={form.dueDate}
          onChange={e =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        {/* TEAM ASSIGNMENT */}
        {members.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium mb-2">Assign to</p>
            <div className="flex flex-wrap gap-2">
              {members.map(m => (
                <button
                  type="button"
                  key={m._id}
                  onClick={() => toggleAssign(m._id)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    form.assignedTo.includes(m._id)
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 rounded w-full"
            value={form.priority}
            onChange={e =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            className="border p-2 rounded w-full"
            value={form.status}
            onChange={e =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400"
          >
            Cancel
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
