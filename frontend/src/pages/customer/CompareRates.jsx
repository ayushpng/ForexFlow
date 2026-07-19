import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/customer";

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

function CompareRates() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("sell");
  const [rates, setRates] = useState([]);
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${API}/search?currency=${currency}&type=${type}`,
      );

      setRates(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch rates.");
    }
  };
  return (
    <DashboardLayout role="customer">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Compare Exchange Rates</h1>

        <p className="text-slate-500 mb-8">
          Find the best exchange rate from approved shops.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Currency */}
          <div>
            <label className="block mb-2 font-medium">Currency</label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="CHF">CHF</option>
              <option value="SGD">SGD</option>
              <option value="AED">AED</option>
              <option value="SAR">SAR</option>
              <option value="QAR">QAR</option>
              <option value="THB">THB</option>
              <option value="MYR">MYR</option>
              <option value="HKD">HKD</option>
              <option value="KWD">KWD</option>
              <option value="BHD">BHD</option>
              <option value="OMR">OMR</option>
              <option value="SEK">SEK</option>
              <option value="DKK">DKK</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-medium">Amount</label>

            <input
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full"
            />
          </div>

          {/* Transaction */}
          <div>
            <label className="block mb-2 font-medium">Transaction</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full"
            >
              <option value="sell">Sell Currency</option>

              <option value="buy">Buy Currency</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full"
            >
              Search
            </button>
          </div>
        </div>

        {rates.length > 0 && (
          <div className="grid gap-6">
            {rates.map((shop, index) => (
              <div
                key={shop.id}
                className={`rounded-xl border p-6 shadow ${
                  index === 0
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://flagcdn.com/48x36/${flagMap[shop.code]}.png`}
                      alt={shop.code}
                      className="w-10 h-7 rounded"
                    />

                    <div>
                      <h2 className="text-xl font-bold">
                        {index === 0 ? "⭐ Best Rate" : `#${index + 1}`}
                      </h2>

                      <p className="text-lg font-semibold">{shop.shop_name}</p>

                      <p className="text-gray-500">
                        {shop.code} - {shop.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {type === "sell" ? "Buy Rate" : "Sell Rate"}
                    </p>

                    <p className="text-3xl font-bold text-emerald-700">
                      {type === "sell" ? shop.buy_rate : shop.sell_rate}
                    </p>

                    {amount && (
                      <p className="mt-2 font-semibold">
                        Total: NPR{" "}
                        {(
                          amount *
                          (type === "sell" ? shop.buy_rate : shop.sell_rate)
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompareRates;
