import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
export const AppLayout = () => {
    return (_jsxs("div", { className: "flex min-h-screen bg-background", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 ml-64 flex flex-col min-h-screen", children: [_jsx(TopBar, {}), _jsx("main", { className: "flex-1 p-8 overflow-x-hidden", children: _jsx(Outlet, {}) })] })] }));
};
