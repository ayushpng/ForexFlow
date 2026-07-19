import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { saveAdminRate } from "../../services/adminService";

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
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/rates"
      );

      // Put currencies in a better order
      const order = [
        "USD",
        "EUR",
        "GBP",
        "AUD",
        "CAD",
        "CHF",
        "JPY",
        "CNY",
        "SAR",
        "AED",
        "QAR",
        "SGD",
        "THB",
        "MYR",
        "HKD",
        "KWD",
        "BHD",
        "OMR",
        "SEK",
        "DKK",
      ];

      const sorted = [...res.data.data].sort(
        (a, b) => order.indexOf(a.code) - order.indexOf(b.code)
      );

      setCurrencies(sorted);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load currencies.");
    }
  };

  const handleChange = (id, field, value) => {
    setCurrencies((prev) =>
      prev.map((currency) =>
        currency.id === id
          ? {
              ...currency,
              [field]: value,
            }
          : currency
      )
    );
  };

  const validateRate = (currency) => {
    const minBuy = Number(currency.min_buy);
    const maxBuy = Number(currency.max_buy);
    const minSell = Number(currency.min_sell);
    const maxSell = Number(currency.max_sell);

    if (
      minBuy < 0 ||
      maxBuy < 0 ||
      minSell < 0 ||
      maxSell < 0
    ) {
      toast.error(`${currency.code}: Negative values are not allowed.`);
      return false;
    }

    if (minBuy > maxBuy) {
      toast.error(`${currency.code}: Min Buy cannot exceed Max Buy.`);
      return false;
    }

    if (minSell > maxSell) {
      toast.error(`${currency.code}: Min Sell cannot exceed Max Sell.`);
      return false;
    }

    return true;
  };

  const handleSave = async (currency) => {
    if (!validateRate(currency)) return;

    try {
      setLoadingId(currency.id);

      await saveAdminRate(currency.id, {
        min_buy: Number(currency.min_buy),
        max_buy: Number(currency.max_buy),
        min_sell: Number(currency.min_sell),
        max_sell: Number(currency.max_sell),
      });

      toast.success(`${currency.code} updated successfully.`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to save.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSavingAll(true);

      for (const currency of currencies) {
        if (!validateRate(currency)) {
          setSavingAll(false);
          return;
        }

        await saveAdminRate(currency.id, {
          min_buy: Number(currency.min_buy),
          max_buy: Number(currency.max_buy),
          min_sell: Number(currency.min_sell),
          max_sell: Number(currency.max_sell),
        });
      }

      toast.success("All exchange rates updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to save all rates.");
    } finally {
      setSavingAll(false);
    }
  };

  return (    <DashboardLayout role="admin">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Exchange Rates
          </h1>

          <p className="text-slate-500 mt-2">
            Set minimum and maximum exchange rates for each currency.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead className="bg-emerald-700 text-white">

              <tr>

                <th className="p-4 text-left rounded-l-xl">
                  Currency
                </th>

                <th className="p-4">
                  Min Buy
                </th>

                <th className="p-4">
                  Max Buy
                </th>

                <th className="p-4">
                  Min Sell
                </th>

                <th className="p-4">
                  Max Sell
                </th>

                <th className="p-4 rounded-r-xl">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {currencies.map((currency) => (

                <tr
                  key={currency.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={`https://flagcdn.com/48x36/${flagMap[currency.code]}.png`}
                        alt={currency.code}
                        className="w-10 h-7 rounded border shadow-sm object-cover"
                      />

                      <div>

                        <p className="font-semibold text-slate-800">
                          {currency.code}
                        </p>

                        <p className="text-sm text-slate-500">
                          {currency.name}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-2">

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={currency.min_buy ?? ""}
                      onChange={(e) =>
                        handleChange(
                          currency.id,
                          "min_buy",
                          e.target.value
                        )
                      }
                      className="w-28 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                  </td>

                  <td className="p-2">

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={currency.max_buy ?? ""}
                      onChange={(e) =>
                        handleChange(
                          currency.id,
                          "max_buy",
                          e.target.value
                        )
                      }
                      className="w-28 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                  </td>

                  <td className="p-2">

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={currency.min_sell ?? ""}
                      onChange={(e) =>
                        handleChange(
                          currency.id,
                          "min_sell",
                          e.target.value
                        )
                      }
                      className="w-28 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                  </td>

                  <td className="p-2">

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={currency.max_sell ?? ""}
                      onChange={(e) =>
                        handleChange(
                          currency.id,
                          "max_sell",
                          e.target.value
                        )
                      }
                      className="w-28 border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                  </td>

                  <td className="p-2">

                    <button
                      onClick={() => handleSave(currency)}
                      disabled={loadingId === currency.id}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                      {loadingId === currency.id
                        ? "Saving..."
                        : "Save"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
                  </div>

        {/* Sticky Bottom Buttons */}

        <div className="sticky bottom-0 bg-white border-t mt-8 pt-6 pb-2 flex justify-end gap-4">

          <button
            onClick={loadCurrencies}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveAll}
            disabled={savingAll}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-8 py-3 rounded-lg font-semibold shadow transition"
          >
            {savingAll ? "Saving All..." : "Save All Rates"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ManageRates;