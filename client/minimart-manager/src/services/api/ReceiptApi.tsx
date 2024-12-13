import axios from 'axios'
import { User } from '../../data/Entities/User';
import { Receipt } from '../../data/Entities/Receipt';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/receipts'

export const createReceiptWithUser = async (receipt: Receipt, user: User) => {
    try {
        const response = await axios.post(`${BASE_URL}/addWithUser`, {
            receipt: receipt, user: user
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({receipt, user}); 
        throw error;
    }
}