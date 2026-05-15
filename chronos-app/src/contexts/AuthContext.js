import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within AuthProvider');
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);
    const login = async (email, password) => {
        // Mock login - accept any email/password
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find((u) => u.email === email && u.password === password);
        if (found || (email && password)) {
            const userData = { email, name: found?.name || email.split('@')[0] };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };
    const signup = async (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        const userData = { email, name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, signup, logout, isLoading }, children: children }));
};
