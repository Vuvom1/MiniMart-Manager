import axios from 'axios'

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/categories'    

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getSubCategoriesWithProduct = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/getSubCategoriesWithProducts`);
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}
