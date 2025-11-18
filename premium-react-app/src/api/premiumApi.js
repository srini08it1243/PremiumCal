import axios from "axios";

const API_BASE = "http://localhost:5123/api/premium";

export const getOccupations = async () => {
  const response = await axios.get(`${API_BASE}/occupations`);
  return response.data;
};

export const calculatePremium = async (payload) => {
  const response = await axios.post(`${API_BASE}/calculate`, payload);
  return response.data;
};
