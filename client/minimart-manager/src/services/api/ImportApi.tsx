import axios from 'axios'
import { Import } from '../../data/Entities/Import';
import { ImportStatus } from '../../constant/enum';
import { ImportDetail } from '../../data/Entities/ImportDetail';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/imports'

export const getAllImports = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getImportById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/detail`); 
        
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Fetch data failed';
    }
};



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

export const updateImport = async (id: string, supplierId: string, invoiceNumber: string, deliveryMan: string, status: ImportStatus, description: string, importDetails: ImportDetail[]) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/edit`, {
            supplierId, invoiceNumber, deliveryMan, status, description, importDetails
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Update import data failed'; 
    }
}

export const getImportStatistic = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/statistic`);

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fecth import statistic data failed'; 
    }
}