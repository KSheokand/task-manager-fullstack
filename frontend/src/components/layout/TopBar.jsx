import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex justify-end items-center mb-6">
      <span className="text-sm text-gray-600 mr-4">
        {user.name}
      </span>

      <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
