import axios from 'axios'

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/positions'

export const getAllPositions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const addPosition = async (name: string, color: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            name, color
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}
