import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from './Card';
export const StatsCard = ({ title, value, icon: Icon, trend }) => {
    return (_jsxs(Card, { className: "p-5 flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-text-secondary", children: title }), _jsx("div", { className: "w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center", children: _jsx(Icon, { className: "w-4 h-4 text-accent" }) })] }), _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("span", { className: "font-pixel text-xl text-text-primary tracking-tighter", children: value }), trend && (_jsxs("span", { className: `text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`, children: [trend.isPositive ? '+' : '-', trend.value] }))] })] }));
};
