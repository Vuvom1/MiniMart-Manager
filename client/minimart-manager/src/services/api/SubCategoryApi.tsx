import axios from "axios";

const API_URL = "http://localhost:8000";
const BASE_URL = API_URL + "/api/subcategories";
export const getAllSubcategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch subcategories failed";
  }
};
