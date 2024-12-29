import { api } from './Api';

const BASE_URL = '/api/schedules'

export const getAllSchedules = async () => {
    const response = await api.get(BASE_URL);

    return response.data;
}

export const addEmployeeToSchedule = async (employeeId: string) => {
    const response = await api.post(`${BASE_URL}/add`, {
        employeeId
    });

    return response.data;
}
