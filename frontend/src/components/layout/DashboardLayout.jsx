import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

function DashboardLayout({
  role,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar role={role} />

      <div className="flex-1">

        <Topbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;