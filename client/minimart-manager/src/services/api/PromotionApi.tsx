import { Promotion } from '../../data/Entities/Promotion';
import { api } from './Api';


const BASE_URL = '/api/promotions'

export const getAllPromotions = async () => {
   const response = await api.get(BASE_URL);

   return response.data;
}

export const getUsablePromotionsByUserId = async (id: string) => {
   const response = await api.get(`${BASE_URL}/usableByUserId/${id}`);

   return response.data;
}

export const getPromotionById = async (id: string) => {
    const response = await api.get(`${BASE_URL}/${id}/detail`);

    return response.data;
}

export const createPromotion = async (promotion: Promotion) => {
    const response = await api.post(`${BASE_URL}/add`, {promotion: promotion});

    return response.data;
}

export const updatePromotion = async (id: string ,promotion: Promotion) => {
    
    const response = await api.put(`${BASE_URL}/${id}`, {promotion: promotion});

    return response.data;
}

export const getPromotionStatistics = async () => {
    const response = await api.get(`${BASE_URL}/statistics`);

    return response.data;
}
