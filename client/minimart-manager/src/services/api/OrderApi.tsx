import axios from 'axios'
import { Order } from '../../data/Entities/Order';
import { User } from '../../data/Entities/User';
import {api} from './Api';

const BASE_URL = '/api/orders'

export const getAllOrders = async () => {
    const response = await api.get(BASE_URL);
    return response.data;
}

export const getOrderById = async (id: string) => {   
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
}

export const getOrdersSortedByStatuses = async () => {
    const response = await api.get(`${BASE_URL}/getOrdersSortedByStatuses`);
    return response.data;
}

export const getOrdersGroupByStatusByUserId = async (id: string) => {
    const response = await api.get(`${BASE_URL}/getOrdersGroupByStatusByUserId/${id}`);
    return response.data;
}

export const createOrderWithUser = async (order: Order, user: User) => {
  
        const response = await api.post(`${BASE_URL}/createWithUser`, {
            order: order, user: user
        });

        return response.data;
    
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await api.put(`${BASE_URL}/updateStatus/${orderId}`, {
        status: status
    });
    return response.data;
}
