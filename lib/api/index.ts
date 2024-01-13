import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://659dc02447ae28b0bd34d1b6.mockapi.io";

const api = axios.create({
  baseURL: API_URL,
});

export const getProduct = async (id: string) => {
  // Call only id=1 to get coorect data schema from mockapi
  const response = await api.get("/products/1");
  return response.data;
};
