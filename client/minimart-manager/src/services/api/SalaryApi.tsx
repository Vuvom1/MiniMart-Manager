import axios from "axios";

const API_URL = "http://localhost:8000";
const BASE_URL = API_URL + "/api/salaries";

export const getAllSalaries = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};
export const getSalaryByEmployee = async (employee: any) => {
  const response = await axios.get(
    `${BASE_URL}/getbyemployee?employee=${employee}`
  );
  return response.data;
};

export const updateSalaries = async (data: any, _id: string) => {
  if (!_id) return;
  const response = await axios.put(`${BASE_URL}/${_id}`, data);
  return response.data;
};
