import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { TimeTracker } from './pages/TimeTracker';
import { Projects } from './pages/Projects';
import { Team } from './pages/Team';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading)
        return _jsx("div", { className: "bg-background min-h-screen" });
    return user ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/login" });
};
function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsxs(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "tracker", element: _jsx(TimeTracker, {}) }), _jsx(Route, { path: "projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "team", element: _jsx(Team, {}) }), _jsx(Route, { path: "analytics", element: _jsx(Analytics, {}) }), _jsx(Route, { path: "reports", element: _jsx(Reports, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) })] })] }));
}
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(AppRoutes, {}) }) }));
}
export default App;
