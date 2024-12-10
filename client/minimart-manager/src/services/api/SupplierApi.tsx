import axios from 'axios'
import { SupplierStatus } from '../../constant/enum';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/suppliers'
const DEFAULT_STAUS = SupplierStatus.ACTIVE;

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
            name, email, status: DEFAULT_STAUS, phone, address, description
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}

export const updateSupplier = async (id: string, supplierData: {name:string, email:string, status: String, phone:string, address:string, description:string}) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/edit`, {
            supplierData
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