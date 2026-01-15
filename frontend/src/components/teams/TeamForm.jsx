import { useState } from "react";

export default function TeamForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-96"
      >
        <h3 className="font-semibold mb-4">Create Team</h3>

        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Team name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
