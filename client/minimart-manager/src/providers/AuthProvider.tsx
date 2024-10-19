import React, { createContext, useContext, useState, ReactNode } from 'react';
import {registerUser ,loginUser, logoutUser } from '../services/api/AuthApi';

interface AuthContextProps {
    user: any;
    signup: (firstname: string, lastname: string, username: string, email: string, password: string, dateOfBirth: string, phone: string, address: string) => void;
    login: (user: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    const signup = async ( firstname: string, lastname: string, username: string, email: string, password: string, dateOfBirth: string, phone: string, address: string) => {
        try {
            const userData = await registerUser( firstname, lastname, username, email, password, dateOfBirth, phone, address)

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch(error: any) {
            throw error;
        }
       
    };

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginUser(email, password);

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch(error: any) {
            throw error;
        }
       
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
