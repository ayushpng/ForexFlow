import axios from "axios";

const API = "http://localhost:5000/api/shop";

const getToken = () => localStorage.getItem("token");

export const getShopRates = () => {
  return axios.get(`${API}/rates`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const saveShopRate = (currencyId, data) => {
  return axios.put(`${API}/rates/${currencyId}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/shop/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};