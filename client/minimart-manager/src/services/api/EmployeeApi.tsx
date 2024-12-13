import axios from "axios";

const API_URL = "http://localhost:8000";
const BASE_URL = API_URL + "/api/employees";
const USER_URL = API_URL + "/api/users";
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${USER_URL}`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
