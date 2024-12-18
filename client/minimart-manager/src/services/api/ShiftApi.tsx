import axios from 'axios'
import { Shift } from '../../data/Entities/Shift';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/shifts'

export const getAllShift = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
       
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Fetch data failed'; 
    }
}


export const addshift = async (shift: Shift) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, {
            shift: shift
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Add data failed'; 
    }
}

export const editShift = async (id: string ,shift: Shift) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            shift: shift
        }, {
            withCredentials: true,
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Edit shift failed'; 
    }
}

export const deleteShift = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Delete shift failed'; 
    }
}



// export const updateImport = async (id: string, importData: Import) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/${id}/edit`, {
//             importData
//         }, {
//             withCredentials: true,
//         });

//         return response.data;
//     } catch(error: any) {
//         throw error.response?.data?.message || 'Update import data failed'; 
//     }
// }

// export const getCustomerStatistic = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/statistic`);

//         return response.data;
//     } catch(error: any) {
//         throw error.response?.data?.message || 'Fecth import statistic data failed'; 
//     }
// }