import { createContext, useState } from 'react';
import api from '../utils/axios';

// 1. Create and export the context directly here
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check if we have user data saved in local storage on initial load
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};