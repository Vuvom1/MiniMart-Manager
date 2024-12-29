import axios from 'axios'
import { Supplier } from '../../data/Entities/Supplier';
import { api } from './Api';

const BASE_URL = '/api/suppliers'

export const getAllSuppliers = async () => {
    const response = await api.get(BASE_URL);

    return response.data;
}

export const addSupplier = async (supplier: Supplier) => {
    const response = await api.post(BASE_URL, {
        supplier: supplier
    });
    return response.data;
}

export const updateSupplier = async (id: string, supplier: Supplier) => {
    const response = await api.put(`${BASE_URL}/${id}`, {
        supplier: supplier
    });
    return response.data;
   
}

export const getSuppliersStatistic = async () => {
    const response = await api.get(`${BASE_URL}/statistic`);

    return response.data;
}