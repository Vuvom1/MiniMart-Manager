import {api} from './Api';

const BASE_URL = '/api/positions'

export const getAllPositions = async () => {
    const response = await api.get(BASE_URL);   
    return response.data;
}

export const addPosition = async (name: string, color: string) => {
    const response = await api.post(BASE_URL, {
        name: name,
        color: color
    });
    return response.data;
}
