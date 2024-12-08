import axios from 'axios'

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/products'

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getAllProductByCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getByCategories`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getPopularProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/popular`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getTop10DiscountProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/top10Discount`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getProductsAndPromotionsBySubCategory = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/getBySubCategoryWithPromotions/${id}`);
        
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getProductDetailsWithPromotion = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/getDetailsWithPromotions`);

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getSimilarProductsWithPromotions = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/getSimilarProductsWithPromotions`);

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}