import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getShopRates } from "../../services/transactionService";
import { createTransaction } from "../../services/transactionService";
import toast from "react-hot-toast";
const flagMap = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  AUD: "au",
  CAD: "ca",
  JPY: "jp",
  CNY: "cn",
  CHF: "ch",
  SGD: "sg",
  AED: "ae",
  SAR: "sa",
  QAR: "qa",
  THB: "th",
  MYR: "my",
  HKD: "hk",
  KWD: "kw",
  BHD: "bh",
  OMR: "om",
  SEK: "se",
  DKK: "dk",
};
function ShopDashboard() {
  const [formData, setFormData] = useState({
    customer_name: "",
    country: "",
    passport_number: "",
    phone: "",
    email: "",
    passport_photo: null,

    transaction_type: "sell",
    currency: "USD",
    amount: "",
  });
  const [rates, setRates] = useState([]);
  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    try {
      const data = await getShopRates();
      setRates(data);
    } catch (err) {
      console.log(err);
    }
  };
  const selectedRate = rates.find((r) => r.code === formData.currency);

  const currentRate =
    formData.transaction_type === "sell"
      ? Number(selectedRate?.buy_rate || 0)
      : Number(selectedRate?.sell_rate || 0);

  const amount = Math.max(0, Number(formData.amount) || 0);

  const total = (amount * currentRate).toFixed(2);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "passport_photo") {
      setFormData({
        ...formData,
        passport_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleCompleteExchange = async () => {
    try {
      const payload = {
        customer_name: formData.customer_name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        country: formData.country,
        passport_number: formData.passport_number,

        transaction_type: formData.transaction_type,

        currency_id: selectedRate.id,

        amount: Number(formData.amount),
      };

      const res = await createTransaction(payload);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Transaction failed.");
    }
  };
  return (
    <DashboardLayout role="shopkeeper">
      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">New Currency Exchange</h1>

        {/* Customer Information */}

        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            className="border rounded-lg p-3"
            value={formData.customer_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border rounded-lg p-3"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            type="text"
            name="passport_number"
            placeholder="Passport Number"
            className="border rounded-lg p-3"
            value={formData.passport_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border rounded-lg p-3"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            className="border rounded-lg p-3"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="file"
            name="passport_photo"
            className="border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* Exchange Information */}

        <h2 className="text-xl font-semibold mt-10 mb-4">Exchange Details</h2>
        {selectedRate && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-4">
            <img
              src={`https://flagcdn.com/48x36/${flagMap[selectedRate.code]}.png`}
              alt={selectedRate.code}
              className="w-12 h-9 rounded shadow"
            />

            <div className="flex-1">
              <h3 className="text-lg font-bold">{selectedRate.name}</h3>

              <p className="text-gray-600">{selectedRate.code}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Current Rate</p>

              <p className="text-2xl font-bold text-emerald-700">
                {currentRate}
              </p>
            </div>
          </div>
        )}
        <br />
        <div className="grid md:grid-cols-2 gap-5">
          <select
            name="transaction_type"
            className="border rounded-lg p-3"
            value={formData.transaction_type}
            onChange={handleChange}
          >
            <option value="sell">Sell Currency</option>
            <option value="buy">Buy Currency</option>
          </select>

          <select
            name="currency"
            className="border rounded-lg p-3"
            value={formData.currency}
            onChange={handleChange}
          >
            {rates.map((rate) => (
              <option key={rate.id} value={rate.code}>
                {rate.code} - {rate.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            min="1"
            step="0.01"
            className="border rounded-lg p-3"
            value={formData.amount}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) > 0) {
                setFormData({
                  ...formData,
                  amount: value,
                });
              }
            }}
          />

          <input
            type="text"
            value={currentRate}
            readOnly
            className="border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-5">
          <p className="text-lg">
            Current Rate:
            <span className="font-bold ml-2">{currentRate}</span>
          </p>

          <p className="text-2xl font-bold mt-3 text-emerald-700">
            Total: NPR {total}
          </p>
        </div>

        <button
          onClick={handleCompleteExchange}
          className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Complete Exchange
        </button>
      </div>
    </DashboardLayout>
  );
}

export default ShopDashboard;
