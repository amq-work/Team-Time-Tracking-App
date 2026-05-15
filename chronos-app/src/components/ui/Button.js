import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
export const Button = ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, onClick, type = 'button', }) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';
    const variants = {
        primary: 'bg-accent text-white hover:bg-accent-hover shadow-[0_0_10px_rgba(255,45,120,0.2)] hover:shadow-[0_0_15px_rgba(255,45,120,0.4)]',
        secondary: 'bg-transparent text-accent border border-accent hover:bg-accent/10',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-light',
        danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50',
    };
    const sizes = {
        sm: 'text-sm px-3 py-1.5 gap-1.5',
        md: 'text-sm px-4 py-2 gap-2',
        lg: 'text-base px-6 py-3 gap-2',
    };
    return (_jsxs("button", { type: type, className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`, disabled: disabled || isLoading, onClick: onClick, children: [isLoading && _jsx(Loader2, { className: "w-4 h-4 animate-spin" }), !isLoading && leftIcon, children, !isLoading && rightIcon] }));
};
