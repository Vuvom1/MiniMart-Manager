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

export const addEmployeeToSchedule = async (employeeId: any) => {
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

export const addEventToSchedule = async (scheduleId: string, scheduleDetail: ScheduleDetailFormData) => {
    try {
        const response = await axios.put(`${BASE_URL}/addEvent`, {
            scheduleId, scheduleDetail
        }, {
            withCredentials: true,
        });
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const deleteEventFromSchedule = async (scheduleId: string, eventId: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/deleteEvent`, {
            scheduleId,
            eventId,
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Delete event failed';
    }
};
