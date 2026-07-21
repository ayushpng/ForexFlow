import axios from "axios";

const API = "http://localhost:5000/api/transactions";

// =====================================
// Create Transaction
// =====================================
export const createTransaction = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// =====================================
// Get Shop Rates
// =====================================
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

// =====================================
// Get All Transactions
// =====================================
export const getTransactions = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

// =====================================
// Delete Transaction
// =====================================
export const deleteTransaction = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};