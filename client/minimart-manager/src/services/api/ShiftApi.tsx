import { Shift } from '../../data/Entities/Shift';
import { api } from './Api';

const BASE_URL = '/api/shifts'

export const getAllShift = async () => {
    const response = await api.get(BASE_URL);
    return response.data;
}


export const addshift = async (shift: Shift) => {
        const response = await api.post(`${BASE_URL}/add`, {
            shift: shift
        });

        return response.data;
    
}

export const editShift = async (id: string ,shift: Shift) => {
    const response = await api.put(`${BASE_URL}/${id}`, {
        shift: shift
    });
    return response.data;
}

export const deleteShift = async (id: string) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
}