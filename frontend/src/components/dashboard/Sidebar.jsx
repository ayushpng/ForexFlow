import {
  LayoutDashboard,
  Users,
  Building2,
  BadgeDollarSign,
  BanknoteArrowDown,
  ArrowLeftRight,
  History,
  User,
  FileBarChart2,
  Settings,
  LogOut,
  CircleDollarSign,
  Coins,
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

  const menus = {
    admin: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/admin/dashboard",
      },
      {
        title: "Pending Shops",
        icon: <Building2 size={20} />,
        path: "/admin/dashboard",
      },
      {
        title: "Manage Rates",
        icon: <Coins size={20} />,
        path: "/admin/rates",
      },
      {
        title: "Currencies",
        icon: <CircleDollarSign size={20} />,
        path: "#",
      },
      {
        title: "Rate Limits",
        icon: <BadgeDollarSign size={20} />,
        path: "#",
      },
      {
        title: "Customers",
        icon: <Users size={20} />,
        path: "#",
      },
      {
        title: "Reports",
        icon: <FileBarChart2 size={20} />,
        path: "#",
      },
      {
        title: "Settings",
        icon: <Settings size={20} />,
        path: "#",
      },
    ],

    shopkeeper: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/shop/dashboard",
      },
      {
        title: "Today's Rates",
        icon: <BadgeDollarSign size={20} />,
        path: "/shop/rates",
      },
      ,
      {
        title: "Transactions",
        icon: <History size={20} />,
        path: "/shop/transactions",
      },
      {
        title: "Profile",
        icon: <User size={20} />,
        path: "/shop/profile",
      },
    ],

    customer: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/customer/dashboard",
      },
      {
        title: "Compare Rates",
        icon: <BadgeDollarSign size={20} />,
        path: "/customer/compare-rates",
      },
      {
        title: "Exchange Currency",
        icon: <ArrowLeftRight size={20} />,
        path: "#",
      },
      {
        title: "History",
        icon: <History size={20} />,
        path: "#",
      },
      {
        title: "Profile",
        icon: <User size={20} />,
        path: "#",
      },
    ],
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-bg from-emerald-800 to-emerald-600 text-white flex flex-col shadow-2xl">
      <div className="py-8 text-center border-b border-emerald-500">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-wide">
          ForexFlow
        </h1>

        <p className="text-sm text-emerald-600 font-medium mt-2 capitalize">
          {role} Panel
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menus[role]?.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 font-semibold shadow"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-xl py-3 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
