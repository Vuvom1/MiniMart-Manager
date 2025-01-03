import axios from 'axios'
import { User } from '../../data/Entities/User';

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/users'

export const updateUserProfile = async (id: string ,user: User) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/profile`, {user}, {
            withCredentials: true,
        });
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Update user profile failed'; 
    }   
}