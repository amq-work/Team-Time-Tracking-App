import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Timer, FolderKanban, Users, BarChart3, FileText, Settings } from 'lucide-react';
const navItems = [
    { path: '/tracker', label: 'Time Tracker', icon: Timer }, // Moved to first
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
];
export const Sidebar = () => {
    return (_jsxs("aside", { className: "fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col z-20", children: [_jsx("div", { className: "h-16 flex items-center px-6 border-b border-border", children: _jsxs("div", { className: "flex items-center gap-2 text-accent", children: [_jsx(Timer, { className: "w-6 h-6" }), _jsx("span", { className: "font-pixel text-[10px] tracking-widest mt-1", children: "CHRONOS" })] }) }), _jsx("nav", { className: "flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1", children: navItems.map((item) => (_jsx(NavLink, { to: item.path, className: ({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive ? 'text-accent bg-accent/10' : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'}
            `, children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx(item.icon, { className: `w-5 h-5 ${isActive ? 'text-accent' : 'text-text-muted'}` }), item.label] })) }, item.path))) }), _jsx("div", { className: "p-4 border-t border-border", children: _jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-light border border-border", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-medium text-xs", children: "JD" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-text-primary", children: "John Doe" }), _jsx("span", { className: "text-xs text-text-muted", children: "Pro Plan" })] })] }) })] }));
};
