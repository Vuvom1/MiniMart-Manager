import axios from 'axios'

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

export const addPromotion = async (promotion: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            name: promotion.name, 
            code: promotion.code,
            startTime: promotion.startTime,
            endTime: promotion.endTime,
            status: promotion.status,
            maxUsage: promotion.maxUsage,
            description: promotion.description,
            type: promotion.promotionType,
            discountType: promotion.discountType,
            discountPercentage: promotion.discountPercentage,
            maxDiscountAmount: promotion.maxDiscountAmount,
            applpiedProducts: promotion.products,
            applicableOrderAmount: promotion.requireOrderAmount,
            giftItems: promotion.gifts,
            requiredQuantity: promotion.requireQuantity,
            rewardQuantity: promotion.rewardQuantity,
            requireCustomerPoint: promotion.requireCustomerPoint, 
        }, {
            withCredentials: true,
        });
        
        
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add promotion failed'; 
    }
}

export const editPromotion = async (promotion: any) => {
    try {
        const response = await axios.put(`${BASE_URL}/${promotion.id}/edit`, {
            name: promotion.name, 
            code: promotion.code,
            startTime: promotion.startTime,
            endTime: promotion.endTime,
            status: promotion.status,
            maxUsage: promotion.maxUsage,
            description: promotion.description,
            type: promotion.promotionType,
            discountType: promotion.discountType,
            discountPercentage: promotion.discountPercentage,
            maxDiscountAmount: promotion.maxDiscountAmount,
            fixedAmount: promotion.fixedAmount,
            applpiedProducts: promotion.products,
            applicableOrderAmount: promotion.requireOrderAmount,
            giftItems: promotion.gifts,
            requiredQuantity: promotion.requireQuantity,
            rewardQuantity: promotion.rewardQuantity,
            requireCustomerPoint: promotion.requireCustomerPoint, 
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
