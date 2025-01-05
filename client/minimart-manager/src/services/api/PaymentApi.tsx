import axios from 'axios';
import crypto from 'crypto-js';
import { api } from './Api';

const API_URL = 'https://api-merchant.payos.vn';

export const createPayment = async (paymentData: any) => {
    try {
        const checksumKey = 'e1e508ffa2cdfc858eb1a15a0c3d1ff08c20ab91764f1de7f7011250704edf65';
        const { amount, cancelUrl, description, orderCode, returnUrl } = paymentData;
        const dataString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
        const signature = crypto.HmacSHA256(dataString, checksumKey).toString(crypto.enc.Hex);
        paymentData.signature  = signature;
        paymentData.expiredAt = Math.floor((Date.now() + 3600000) / 1000);

        const response = await axios.post(`${API_URL}/v2/payment-requests`, paymentData, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`,
            'x-client-id': '014e1c5c-283f-4b73-bb6d-1cb7be4ec94d',
            'x-api-key': 'f47a24a2-2bdb-4455-9a7d-8e2ac004e06b'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const getPayment = async (paymentId: string) => {
    try {
        const response = await axios.get(`${API_URL}/v2/payment-requests/${paymentId}`, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching payment:', error);
        throw error;
    }
};

export const confirmWebhook = async (webhookData: any) => {
    try {
        const response = await axios.post(`${API_URL}/v2/webhook/confirm`, webhookData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error confirming webhook:', error);
        throw error;
    }
};

export const updatePayment = async (paymentId: string, updateData: any) => {
    try {
        const response = await axios.put(`${API_URL}/${paymentId}`, updateData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error;
    }
};

export const checkPaymentStatus = async (orderId: string) => {
    try {
        const response = await api.get(`api/payments/${orderId}/status`, {

        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking payment status:', error);
        throw error;
    }
}

export const deletePayment = async (paymentId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/v2/payment-requests/${paymentId}/cancel`, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error;
    }
};