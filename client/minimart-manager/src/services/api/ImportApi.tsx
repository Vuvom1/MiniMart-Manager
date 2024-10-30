import axios from 'axios'

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

export const updateImport = async (id: string, supplierData: {name:string, email:string, status: String, phone:string, address:string, description:string}) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            supplierData
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