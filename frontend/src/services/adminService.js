import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getPendingShops = () => {
  return axios.get(`${API}/pending-shops`);
};

export const approveShop = (id) => {
  return axios.put(`${API}/approve/${id}`);
};

export const rejectShop = (id) => {
  return axios.put(`${API}/reject/${id}`);
};

export const saveAdminRate = (currencyId, data) => {
  return axios.put(
    `${API}/rates/${currencyId}`,
    data
  );
}