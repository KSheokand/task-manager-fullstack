import { useEffect, useState } from "react";
import API from "../api/axios";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import TeamCard from "../components/teams/TeamCard";
import TeamForm from "../components/teams/TeamForm";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadTeams = async () => {
    const res = await API.get("/teams");
    setTeams(res.data);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreate = async data => {
    await API.post("/teams", data);
    setShowForm(false);
    loadTeams();
  };

  return (
    <AppLayout>
      <PageHeader
        title="Teams"
        subtitle="Manage your teams and members"
        actionLabel="+ Create Team"
        onAction={() => setShowForm(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map(team => (
          <TeamCard key={team._id} team={team} />
        ))}
      </div>

      {showForm && (
        <TeamForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
    </AppLayout>
  );
}
