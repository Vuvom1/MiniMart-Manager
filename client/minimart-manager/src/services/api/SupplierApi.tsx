import axios from 'axios'
import { Supplier } from '../../data/Entities/Supplier';

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

export const addSupplier = async (supplier: Supplier) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            supplier: supplier
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}

export const updateSupplier = async (id: string, supplier: Supplier) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            supplier: supplier
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Update supplier data failed'; 
    }
}

export const getSuppliersStatistic = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/statistic`);

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fecth supplier statistic data failed'; 
    }
}