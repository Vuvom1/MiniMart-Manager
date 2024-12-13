import axios from 'axios'
import { Order } from '../../data/Entities/Order';
import { User } from '../../data/Entities/User';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/orders'

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getOrderById = async (id: string) => {   
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getOrdersSortedByStatuses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getOrdersSortedByStatuses`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const getOrdersGroupByStatusByUserId = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/getOrdersGroupedByStatusByUserId/${id}`, {
            withCredentials: true,
        });
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}

export const createOrderWithUser = async (order: Order, user: User) => {
    try {
        const response = await axios.post(`${BASE_URL}/createWithUser`, {
            order: order, user: user
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateStatus/${orderId}`, {
            status: status
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
