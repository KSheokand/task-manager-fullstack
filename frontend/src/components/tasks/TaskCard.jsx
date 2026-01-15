import { memo } from "react";

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm card-hover">
      <h3 className="font-semibold">{task.title}</h3>

      {task.description && (
        <p className="text-sm text-gray-500 mt-1">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">
          {task.priority}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            task.status === "Completed"
              ? "bg-green-100 text-green-600"
              : task.status === "In Progress"
              ? "bg-blue-100 text-blue-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex gap-3 mt-4 text-sm">
        <button
          onClick={() => onEdit(task)}
          className="text-purple-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(TaskCard);