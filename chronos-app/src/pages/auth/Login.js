import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Timer, Mail, Lock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
        else {
            setError('Invalid credentials');
        }
        setIsLoading(false);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx("div", { className: "w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center mb-4", children: _jsx(Timer, { className: "w-6 h-6 text-accent" }) }), _jsx("h1", { className: "font-pixel text-sm tracking-widest text-text-primary mb-2", children: "CHRONOS" }), _jsx("p", { className: "text-text-secondary text-sm", children: "Sign in to your workspace" })] }), _jsxs(Card, { className: "p-6 md:p-8", children: [_jsxs("form", { onSubmit: handleLogin, className: "flex flex-col gap-5", children: [_jsx(Input, { label: "Email Address", type: "email", placeholder: "name@company.com", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(Input, { label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), value: password, onChange: (e) => setPassword(e.target.value), required: true }), error && _jsx("p", { className: "text-red-500 text-sm", children: error }), _jsx(Button, { type: "submit", className: "w-full mt-2", isLoading: isLoading, children: "Sign In" })] }), _jsxs("div", { className: "mt-6 text-center text-sm text-text-secondary", children: ["Don't have an account? ", _jsx(Link, { to: "/signup", className: "text-accent hover:text-accent-hover font-medium", children: "Create workspace" })] })] })] }) }));
};
