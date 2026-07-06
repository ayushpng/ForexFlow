import DashboardLayout from "../../components/layout/DashboardLayout";

import StatCard from "../../components/dashboard/StatCard";

import {
  DollarSign,
  ArrowLeftRight,
  History,
  Wallet,
} from "lucide-react";

function CustomerDashboard() {
  return (
    <DashboardLayout role="customer">

      <h1 className="text-3xl font-bold mb-8">
        Customer Dashboard
      </h1>

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

    </DashboardLayout>
  );
}

export default CustomerDashboard;