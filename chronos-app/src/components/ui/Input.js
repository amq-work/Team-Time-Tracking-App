import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ className = '', label, error, leftIcon, ...props }) => {
    return (_jsxs("div", { className: "w-full flex flex-col gap-1.5", children: [label && (_jsx("label", { className: "text-sm font-medium text-text-secondary", children: label })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-text-muted", children: leftIcon })), _jsx("input", { className: `
            w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary
            placeholder:text-text-muted transition-all
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `, ...props })] }), error && _jsx("span", { className: "text-xs text-red-500 mt-0.5", children: error })] }));
};
