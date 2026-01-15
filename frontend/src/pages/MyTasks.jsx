import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import AppLayout from "../components/layout/AppLayout";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const loadTasks = async () => {
    const res = await API.get("/tasks/personal");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔍 FILTER LOGIC
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status ? task.status === status : true;
      const matchesPriority = priority ? task.priority === priority : true;
      const matchesCategory = category
        ? task.category?.toLowerCase().includes(category.toLowerCase())
        : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [tasks, search, status, priority, category]);

  const handleCreate = async data => {
    await API.post("/tasks/personal", data);
    setShowForm(false);
    loadTasks();
  };

  const handleUpdate = async data => {
    await API.put(`/tasks/${editing._id}`, data);
    setEditing(null);
    setShowForm(false);
    loadTasks();
  };

  const handleDelete = async id => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <AppLayout>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* 🔍 FILTERS */}
      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
      />

      {/* TASK LIST */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={t => {
                setEditing(t);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* TASK FORM */}
      {showForm && (
        <TaskForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          onClose={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}
    </AppLayout>
  );
}
