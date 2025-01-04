import axios from 'axios'
import { Import } from '../../data/Entities/Import'
import { api } from './Api';

const BASE_URL = '/api/imports'

export const getAllImports = async () => {
    const response = await api.get(BASE_URL);
    return response.data;   
}

export const getImportById = async (id: string) => {
    const response = await api.get(`${BASE_URL}/getById/${id}`);
    return response.data;
};

export const addImport = async (importData: Import) => {
    const response = await api.post(`${BASE_URL}`, {  importData: importData });
    return response.data;
}

export const updateImport = async (id: string ,importData: Import) => {
    const response = await api.put(`${BASE_URL}/${id}`, {  importData: importData });
    return response.data;
}

export const getImportStatistic = async () => {
    const response = await api.get(`${BASE_URL}/statistic`);
    return response.data;
}