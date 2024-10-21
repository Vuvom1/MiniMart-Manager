import axios from 'axios'

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/suppliers'

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const addSupplier = async (name:string, email:string, phone:string, address:string, description:string) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            name, email, phone, address, description
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}