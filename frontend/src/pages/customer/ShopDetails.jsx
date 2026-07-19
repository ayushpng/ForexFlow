import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";
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

function ShopDetails() {
  const { id } = useParams();

  const [shop, setShop] = useState(null);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/customer/shop/${id}`,
      );

      setShop(res.data.shop);
      setRates(res.data.rates);
    } catch (err) {
      console.log(err);
    }
  };

  if (!shop) {
    return (
      <DashboardLayout role="customer">
        <p className="text-center mt-10">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-emerald-700">
            🏪 {shop.shop_name}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-gray-500">Address</p>
              <h2 className="font-semibold">{shop.shop_address}</h2>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <h2 className="font-semibold">{shop.phone2}</h2>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h2 className="font-semibold">{shop.email}</h2>
            </div>

            <div>
              <p className="text-gray-500">License Number</p>
              <h2 className="font-semibold">{shop.license_number}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Today's Exchange Rates</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="p-4 text-left">Currency</th>
                <th className="p-4">Buy Rate</th>
                <th className="p-4">Sell Rate</th>
                <th className="p-4">Updated</th>
              </tr>
            </thead>

            <tbody>
              {rates.map((rate) => (
                <tr key={rate.code} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/48x36/${flagMap[rate.code]}.png`}
                        alt={rate.code}
                        className="w-8 h-6 rounded object-cover shadow"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                      <div>
                        <p className="font-semibold">{rate.code}</p>

                        <p className="text-sm text-gray-500">{rate.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center font-semibold text-emerald-700">
                    {rate.buy_rate}
                  </td>

                  <td className="text-center font-semibold text-red-600">
                    {rate.sell_rate}
                  </td>

                  <td className="text-center text-sm text-gray-500">
                    {new Date(rate.updated_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex justify-end">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold">
              Exchange Currency
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ShopDetails;
