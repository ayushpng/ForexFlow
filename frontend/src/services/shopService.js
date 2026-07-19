import axios from "axios";

const API = "http://localhost:5000/api/shop";

export const getShopRates = () => {
  return axios.get(`${API}/rates`);
};

export const saveShopRate = (currencyId, data) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return axios.put(`${API}/rates/${currencyId}`, {
    ...data,
    shop_id: user.id,
  });
};