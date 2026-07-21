import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  deleteTransaction,
} from "../../services/transactionService";
import toast from "react-hot-toast";

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      toast.error("Failed to load transactions.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteTransaction(id);

      toast.success(res.message);

      loadTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <DashboardLayout role="shopkeeper">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Transactions</h1>

        <p className="text-gray-500 mb-6">
          All completed currency exchange transactions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="p-3 text-left">Receipt No</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Passport No</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-right">Rate</th>
                <th className="p-3 text-right">Total NPR</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-10 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{t.receipt_number}</td>

                    <td className="p-3">{t.customer_name}</td>

                    <td className="p-3">{t.passport_number}</td>

                    <td className="p-3">{t.code}</td>

                    <td className="p-3 capitalize">{t.transaction_type}</td>

                    <td className="p-3 text-right">{t.amount}</td>

                    <td className="p-3 text-right">{t.rate}</td>

                    <td className="p-3 text-right">{t.total_npr}</td>

                    <td className="p-3">
                      {new Date(t.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/shop/receipt/${t.receipt_number}`)
                        }
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
