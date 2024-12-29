import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Urls from '../../constant/urls';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const setupInterceptors = (navigate: ReturnType<typeof useNavigate>) => {
    // Request interceptor
    api.interceptors.request.use(
        (config) => {
            // You can add custom headers or modify the request config here
            return config;
        },
        (error) => {
            // Handle request error here
            return Promise.reject(error);
        }
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => {
            // Handle successful response here
            return response;
        },
        (error) => {
            // Handle response error here
            if (error.response) {
                // Server responded with a status other than 2xx
                if (error.response.status === 403) {
                    // Handle 403 Forbidden or 401 Unauthorized error specifically
                    console.error('Forbidden or Unauthorized error:', error.response.data);
                    navigate(Urls.ADMIN.UNAUTHORIZED.Path);
                    return Promise.reject('You do not have permission to perform this action.');
                }
                if (error.response.status === 401) {
                    console.error('Forbidden or Unauthorized error:', error.response.data);
                    navigate(Urls.ADMIN.UNAUTHORIZED.Path);
                    return Promise.reject('You do not have permission to perform this action.');
                }
                console.error('API error:', error.response.data);
                return Promise.reject(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                // Request was made but no response was received
                console.error('No response received:', error.request);
                return Promise.reject('No response received from server');
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', error.message);
                return Promise.reject(error.message);
            }
        }
    );
};

export { api, setupInterceptors };