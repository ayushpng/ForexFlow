import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back, {user?.full_name}
        </p>

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="text-slate-600"
          size={24}
        />

        <div className="text-right">

          <p className="font-semibold">
            {user?.full_name}
          </p>

          <p className="text-sm text-slate-500 capitalize">
            {user?.role}
          </p>

        </div>

      </div>

    </header>
  );
}

export default Topbar;