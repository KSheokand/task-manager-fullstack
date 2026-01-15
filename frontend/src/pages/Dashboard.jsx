import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import TodayTaskCard from "../components/dashboard/TodayTaskCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TasksCompletedChart from "../components/dashboard/TaskCompletedChart";
import TeamsCard from "../components/dashboard/TeamsCard";
import CalendarCard from "../components/dashboard/CalenderCard";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <div className="p-10">Loading…</div>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <TopBar />

        {/* Today banner */}
        <TodayTaskCard pending={data.personal.pending} />

        {/* Progress cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ProgressCard title="Personal Tasks" data={data.personal} />
          <ProgressCard title="Team Tasks" data={data.team} />
        </div>

        {/* Charts + Right column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Chart */}
          <div className="lg:col-span-2 min-h-90">
            <TasksCompletedChart
              personal={data.personal.chart}
              team={data.team.chart}
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <TeamsCard teams={data.teams} />
            <CalendarCard />
          </div>
        </div>
      </main>
    </div>
  );
}
