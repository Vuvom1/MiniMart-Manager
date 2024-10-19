import axios from 'axios'

const API_URL = 'http://localhost:8000';
const BASE_URL = API_URL + '/api/auth'
const defaultUserRole = 'STAFF'
const defaultUserImage = ''

export const loginUser = async (email: String, password: String) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email,
            password
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Login failed'; 
    }
}

export const registerUser = async (firstname: string, lastname: string, username: string, email: string, password: string, dateOfBirth: string, phone: string, address: string,) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            firstname, lastname, username, email, password, role: defaultUserRole, image: defaultUserImage, dateOfBirth, phone, address
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch(error: any) {
        throw error.response?.data?.message || 'Signup failed'; 
    }
}

export  const logoutUser = async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', 
      });
      console.log('Logged out successfully');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };