import axios from 'axios'
import { ScheduleDetailFormData } from '../../data/FormData/ScheduleDetailFormData';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/schedules'

export const getAllSchedules = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const addEmployeeToSchedule = async (employeeId: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            employeeId
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}
