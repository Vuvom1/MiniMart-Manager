import axios from 'axios'
import { Promotion } from '../../data/Entities/Promotion';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/promotions'

export const getAllPromotions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getPromotionById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/detail`);
        
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const createPromotion = async (promotion: Promotion) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            promotion: promotion,
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add promotion failed'; 
    }
}

export const updatePromotion = async (promotion: Promotion) => {
    try {
        const response = await axios.put(`${BASE_URL}/${promotion._id}`, {
           promotion: promotion, 
        }, {
            withCredentials: true,
        });
        
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Edit promotion failed'; 
    }
}

export const getPromotionStatistics = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/statistics`, {
            withCredentials: true,
        });
        
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch statistics failed'; 
    }
}
