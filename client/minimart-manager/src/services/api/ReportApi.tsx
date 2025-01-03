import axios from 'axios'
import { api } from './Api';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/reports'

export const getOverallReport = async () => {
    const response = await api.get('/api/reports/overall-reports');

    return response.data;

}

export const getShiftTimeDistribution = async () => {
    const response = await api.get('/api/reports/shift-time-distribution');

    return response.data;

}

export const getSaleDistributionByCategory = async () => {

    const response = await api.get('/api/reports/sale-distribution-by-category');

    return response.data;

}

export const getOrderSourcesDistribution = async () => {
    const response = await api.get('/api/reports/order-sources-distribution');

    return response.data;

}

export const getCurrentStockLevel = async () => {
    const response = await api.get('/api/reports/current-stock-level');
    
    return response.data;
}