import { Bell, Search, CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white h-20 shadow-sm border-b border-slate-200 flex items-center justify-between px-8">
      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-slate-500 mt-1">
          Welcome back,
          <span className="font-semibold text-emerald-700 ml-1">
            {user?.full_name}
          </span>
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* Search */}

        <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2">
          <Search size={18} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-3 text-sm"
          />
        </div>

        {/* Date */}

        <div className="hidden md:flex items-center gap-2 text-slate-600">
          <CalendarDays size={20} />

          <span className="text-sm">{today}</span>
        </div>

        {/* Notification */}

        <button className="relative bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition">
          <Bell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-lg">
            {user?.full_name?.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-slate-800">{user?.full_name}</p>

            <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
