import { api } from './Api';

const BASE_URL = '/api/customers';

export const getAllCustomers = async () => {
    const response = await api.get(BASE_URL);

    return response.data;

}

export const updateCustomerStatus = async (id: string, status: string) => {

    const response = await api.put(`${BASE_URL}/${id}/status`, {
        status
    });

    return response.data;
}

export const getCustomerStatistic = async () => {
    const response = await api.get(`${BASE_URL}/statistic`);

    return response.data;
}