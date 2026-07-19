import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";

import { getShopRates, saveShopRate } from "../../services/shopService";
const flagMap = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",
  CNY: "cn",
  JPY: "jp",
  SAR: "sa",
  SGD: "sg",
  QAR: "qa",
  THB: "th",
  AED: "ae",
  MYR: "my",
  BHD: "bh",
  KWD: "kw",
  HKD: "hk",
  SEK: "se",
  DKK: "dk",
  OMR: "om",
};

function ManageRates() {
  const [currencies, setCurrencies] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [savingAll, setSavingAll] = useState(false);
  useEffect(() => {
    loadRates();
  }, []);

  // Load all rates
  const loadRates = async () => {
    try {
      const res = await getShopRates();
      setCurrencies(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Update input values
  const handleChange = (id, field, value) => {
    setCurrencies((prev) =>
      prev.map((currency) =>
        currency.id === id
          ? {
              ...currency,
              [field]: value,
            }
          : currency,
      ),
    );
  };

  // Save one currency
  const handleSave = async (currency) => {
    try {
      setLoadingId(currency.id);

      await saveShopRate(currency.id, {
        buy_rate: Number(currency.buy_rate),
        sell_rate: Number(currency.sell_rate),
      });

      toast.success(`${currency.code} updated successfully`);

      // Reload latest data
      loadRates();
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to save.");
    } finally {
      setLoadingId(null);
    }
  };
  const handleSaveAll = async () => {
    try {
      setSavingAll(true);

      for (const currency of currencies) {
        await saveShopRate(currency.id, {
          buy_rate: Number(currency.buy_rate),
          sell_rate: Number(currency.sell_rate),
        });
      }

      toast.success("All rates updated successfully.");

      loadRates();
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to save all rates.");
    } finally {
      setSavingAll(false);
    }
  };

  return (
    <DashboardLayout role="shopkeeper">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">My Exchange Rates</h1>

        <p className="text-slate-500 mb-8">
          Set your exchange rates within the admin limits.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="p-4 text-left">Currency</th>

                <th className="p-4">Admin Buy Range</th>

                <th className="p-4">Admin Sell Range</th>

                <th className="p-4">Your Buy</th>

                <th className="p-4">Your Sell</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/48x36/${flagMap[currency.code]}.png`}
                        alt={currency.code}
                        className="w-8 h-6 rounded object-cover shadow"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div>
                        <p className="font-semibold">{currency.code}</p>

                        <p className="text-sm text-gray-500">{currency.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    {currency.min_buy} - {currency.max_buy}
                  </td>

                  <td className="text-center">
                    {currency.min_sell} - {currency.max_sell}
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={currency.buy_rate ?? ""}
                      onChange={(e) =>
                        handleChange(currency.id, "buy_rate", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 w-28"
                    />
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={currency.sell_rate ?? ""}
                      onChange={(e) =>
                        handleChange(currency.id, "sell_rate", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 w-28"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleSave(currency)}
                      disabled={loadingId === currency.id}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-5 py-2 rounded-lg"
                    >
                      {loadingId === currency.id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={loadRates}
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            Refresh
          </button>

          <button
            onClick={handleSaveAll}
            disabled={savingAll}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-8 py-3 rounded-lg"
          >
            {savingAll ? "Saving All..." : "Save All Rates"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageRates;
