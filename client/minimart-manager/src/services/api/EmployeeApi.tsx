import axios from "axios";

const API_URL = "http://localhost:8000";
const BASE_URL = API_URL + "/api/employees";
const USER_URL = API_URL + "/api/users";
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.message || "Add employee failed");
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
export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.data;
  } catch (error: any) {
    console.log(error.response?.data?.message || "Add employee failed");
  }
};
export const AddEmployees = async () => {
  try {
    const response = await axios.post(`${{ BASE_URL }}/add`);
    return response.data.message;
  } catch (error: any) {
    console.log(error.response?.data?.message || "Add employee failed");
  }
};
export const EditEmployee = async (data?: any) => {
  if (!data) {
    return;
  }
  try {
    const response = await axios.put(`${BASE_URL}/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error: any) {
    console.log(error.response?.data?.message || "Update employee failed");
  }
};

export const getUnscheduledEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/unscheduled`);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Fetch data failed";
  }
};
