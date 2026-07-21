import axios from "axios";

const API = "http://localhost:5000/api/transactions";

export const createTransaction = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getShopRates = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/shop/rates",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};