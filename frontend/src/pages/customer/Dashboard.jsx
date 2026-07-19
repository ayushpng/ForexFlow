import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { DollarSign, ArrowLeftRight, History, Wallet } from "lucide-react";

function CustomerDashboard() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customer/shops");

      setShops(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout role="customer">
      <h1 className="text-3xl font-bold mb-8">Customer Dashboard</h1>

      {/* Top Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Wallet Balance"
          value="Rs. 125,000"
          icon={<Wallet size={30} className="text-white" />}
          color="bg-emerald-600"
        />

        <StatCard
          title="Exchange Requests"
          value="14"
          icon={<ArrowLeftRight size={30} className="text-white" />}
          color="bg-blue-600"
        />

        <StatCard
          title="Transactions"
          value="38"
          icon={<History size={30} className="text-white" />}
          color="bg-orange-500"
        />

        <StatCard
          title="Current USD Rate"
          value="Rs. 138.45"
          icon={<DollarSign size={30} className="text-white" />}
          color="bg-purple-600"
        />
      </div>

      {/* Shop List */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Available Exchange Shops</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-xl shadow-md border p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-emerald-700">
                🏪 {shop.shop_name}
              </h3>

              <p className="text-gray-500 mt-2">📍 {shop.shop_address}</p>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>USD Buy :</strong> {shop.buy_rate}
                </p>

                <p>
                  <strong>USD Sell :</strong> {shop.sell_rate}
                </p>

                <p className="text-sm text-gray-400">
                  Updated : {new Date(shop.updated_at).toLocaleString()}
                </p>
              </div>

              <Link
                to={`/customer/shop/${shop.id}`}
                className="inline-block mt-5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
              >
                View Shop
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`${color} p-4 rounded-full`}>{icon}</div>
    </div>
  );
}

export default CustomerDashboard;
