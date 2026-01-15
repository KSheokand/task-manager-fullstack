import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import TaskCard from "../components/tasks/TaskCard";

const sameDay = (d1, d2) =>
  new Date(d1).toDateString() === new Date(d2).toDateString();

export default function Planned() {
  const [searchParams] = useSearchParams();
  const selectedDate =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const [personalRes, teamsRes] = await Promise.all([
        API.get("/tasks/personal"),
        API.get("/teams")
      ]);

      const teamRequests = teamsRes.data.map(team =>
        API.get(`/tasks/team?teamId=${team._id}`)
      );

      const teamResponses = await Promise.all(teamRequests);
      const teamTasks = teamResponses.flatMap(r => r.data);

      const filtered = [...personalRes.data, ...teamTasks].filter(
        task =>
          task.dueDate &&
          sameDay(task.dueDate, selectedDate) &&
          task.status !== "Completed"
      );

      setTasks(filtered);
    } catch (err) {
        console.error(err);
      }
  };


  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

  return (
    <AppLayout>
      <PageHeader
        title="Planned Tasks"
        subtitle={`Tasks for ${selectedDate}`}
      />

      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          🎉 No tasks planned for this day
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
