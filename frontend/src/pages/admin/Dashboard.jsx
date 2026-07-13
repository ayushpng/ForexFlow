import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, Building2, Clock3, CircleDollarSign } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

import {
  getPendingShops,
  approveShop,
  rejectShop,
} from "../../services/adminService";

function AdminDashboard() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPendingShops = async () => {
    try {
      const res = await getPendingShops();
      setShops(res.data.data);
    } catch (error) {
      toast.error("Failed to load pending shops.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingShops();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveShop(id);
      toast.success("Shop Approved");
      loadPendingShops();
    } catch {
      toast.error("Approval Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectShop(id);
      toast.success("Shop Rejected");
      loadPendingShops();
    } catch {
      toast.error("Reject Failed");
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>

        <p className="text-slate-500 mt-2">
          Monitor ForexFlow activities and manage exchange shops.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Customers"
          value="124"
          icon={<Users size={30} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Approved Shops"
          value="18"
          icon={<Building2 size={30} />}
          color="bg-green-600"
        />

        <StatCard
          title="Pending Shops"
          value={shops.length}
          icon={<Clock3 size={30} />}
          color="bg-orange-500"
        />

        <StatCard
          title="Currencies"
          value="20"
          icon={<CircleDollarSign size={30} />}
          color="bg-purple-600"
        />
      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pending Shops */}

        <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Pending Shop Registrations</h2>

          {loading ? (
            <p>Loading...</p>
          ) : shops.length === 0 ? (
            <p className="text-slate-500">No pending registrations.</p>
          ) : (
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-slate-500">
                  <th className="pb-4">Owner</th>
                  <th className="pb-4">Shop</th>
                  <th className="pb-4">Phone</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {shops.map((shop) => (
                  <tr key={shop.id} className="border-b hover:bg-slate-50">
                    <td className="py-4">{shop.full_name}</td>

                    <td>{shop.shop_name}</td>

                    <td>{shop.phone}</td>

                    <td className="space-x-2">
                      <button
                        onClick={() => handleApprove(shop.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(shop.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

          <div className="space-y-4">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">
              Add Currency
            </button>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              Manage Shops
            </button>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold">
              View Reports
            </button>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
              Manage Customers
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
