import axios from 'axios'
import { Import } from '../../data/Entities/ImportData';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/customers'

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const addImport = async (importData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            importData
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}

export const updateImport = async (id: string, importData: Import) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/edit`, {
            importData
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Update import data failed'; 
    }
}

export const getCustomerStatistic = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/statistic`);

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fecth import statistic data failed'; 
    }
}