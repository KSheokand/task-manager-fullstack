import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `w-10 h-10 flex items-center justify-center rounded-xl ${
      isActive ? "bg-purple-600 text-white" : "text-gray-400"
    }`;

  return (
    <aside className="w-20 bg-white flex flex-col items-center py-6 gap-6">
      <div className="w-10 h-10 bg-purple-600 rounded-full" />

      <NavLink to="/" className={linkClass}>🏠</NavLink>
      <NavLink to="/planned" replace className={linkClass}>🗓️</NavLink>
      <NavLink to="/my-tasks" className={linkClass}>📋</NavLink>
      <NavLink to="/teams" className={linkClass}>👥</NavLink>
    </aside>
  );
}
