import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
const routeTitles = {
    '/': 'Dashboard',
    '/tracker': 'Time Tracker',
    '/projects': 'Projects',
    '/team': 'Team',
    '/analytics': 'Analytics',
    '/reports': 'Reports',
    '/settings': 'Settings'
};
export const TopBar = () => {
    const location = useLocation();
    const title = routeTitles[location.pathname] || 'Chronos';
    return (_jsxs("header", { className: "h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8", children: [_jsx("h1", { className: "text-lg font-semibold text-text-primary", children: title }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative hidden md:block", children: [_jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" }), _jsx("input", { type: "text", placeholder: "Search anything...", className: "bg-surface border border-border rounded-full pl-9 pr-4 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-64 transition-all" })] }), _jsxs("button", { className: "relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-surface-light", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full shadow-[0_0_5px_rgba(255,45,120,0.8)]" })] })] })] }));
};
