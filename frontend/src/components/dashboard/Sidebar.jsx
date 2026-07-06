import {
  LayoutDashboard,
  ArrowLeftRight,
  History,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardPath =
    role === "customer"
      ? "/customer/dashboard"
      : role === "shopkeeper"
      ? "/shop/dashboard"
      : "/admin/dashboard";

  return (
    <aside className="w-64 min-h-screen bg-emerald-700 text-white flex flex-col">

      <div className="text-center py-8 border-b border-emerald-600">

        <h1 className="text-3xl font-bold">
          ForexFlow
        </h1>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        <NavLink
          to={dashboardPath}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600"
        >
          <ArrowLeftRight size={20} />
          Exchange
        </NavLink>

        <NavLink
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600"
        >
          <History size={20} />
          History
        </NavLink>

        <NavLink
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600"
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-5 bg-red-600 hover:bg-red-700 transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;