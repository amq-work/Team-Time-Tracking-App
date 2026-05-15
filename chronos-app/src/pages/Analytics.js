import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts';
import { Card } from '../components/ui/Card';
export const Analytics = () => {
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    useEffect(() => {
        const savedWork = localStorage.getItem('todayWorkSeconds');
        const savedBreak = localStorage.getItem('todayBreakSeconds');
        if (savedWork)
            setWorkSeconds(parseInt(savedWork));
        if (savedBreak)
            setBreakSeconds(parseInt(savedBreak));
    }, []);
    const totalSeconds = workSeconds + breakSeconds;
    const workPercentage = totalSeconds > 0 ? (workSeconds / totalSeconds) * 100 : 0;
    const breakPercentage = totalSeconds > 0 ? (breakSeconds / totalSeconds) * 100 : 0;
    const projectData = [
        { name: 'Chronos App', hours: Math.floor(workSeconds / 3600) },
        { name: 'Website Redesign', hours: 45 },
        { name: 'Mobile App', hours: 210 },
        { name: 'Brand Identity', hours: 85 },
    ];
    const productivityData = [
        { name: 'Work', value: workPercentage, color: '#FF2D78' },
        { name: 'Break', value: breakPercentage, color: '#2A2A35' },
    ];
    const trendData = [
        { name: 'Week 1', hours: 35 },
        { name: 'Week 2', hours: 42 },
        { name: 'Week 3', hours: 38 },
        { name: 'Week 4', hours: workSeconds / 3600 || 25 },
        { name: 'Week 5', hours: 39 },
    ];
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-text-primary mb-1", children: "Analytics Dashboard" }), _jsx("p", { className: "text-sm text-text-muted", children: "Your productivity insights at a glance" })] }), _jsxs("select", { className: "bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent", children: [_jsx("option", { children: "Last 30 Days" }), _jsx("option", { children: "This Month" }), _jsx("option", { children: "Last Month" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 flex flex-col gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold text-text-primary", children: "Time Distribution" }), _jsx("span", { className: "text-sm text-text-muted", children: "Work vs Break ratio" })] }), _jsx("div", { className: "h-64 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: productivityData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", stroke: "none", children: productivityData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' } })] }) }) }), _jsxs("div", { className: "flex justify-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-accent" }), _jsxs("span", { className: "text-sm text-text-secondary", children: ["Work (", workPercentage.toFixed(0), "%)"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-surface-light" }), _jsxs("span", { className: "text-sm text-text-secondary", children: ["Break (", breakPercentage.toFixed(0), "%)"] })] })] })] }), _jsxs(Card, { className: "p-6 flex flex-col gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold text-text-primary", children: "Time per Project" }), _jsx("span", { className: "text-sm text-text-muted", children: "Hours logged by project" })] }), _jsx("div", { className: "h-64 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: projectData, margin: { top: 20, right: 0, left: -20, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#2A2A35" }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: '#8A8A9A', fontSize: 12 }, dy: 10 }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: '#8A8A9A', fontSize: 12 } }), _jsx(Tooltip, { cursor: { fill: '#1A1A25' }, contentStyle: { backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' } }), _jsx(Bar, { dataKey: "hours", radius: [4, 4, 0, 0], fill: "#FF2D78" })] }) }) })] }), _jsxs(Card, { className: "p-6 lg:col-span-2 flex flex-col gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold text-text-primary", children: "Weekly Productivity Trend" }), _jsx("span", { className: "text-sm text-text-muted", children: "Hours logged over time" })] }), _jsx("div", { className: "h-72 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: trendData, margin: { top: 20, right: 20, left: -20, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#2A2A35" }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: '#8A8A9A', fontSize: 12 }, dy: 10 }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: '#8A8A9A', fontSize: 12 } }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' } }), _jsx(Line, { type: "monotone", dataKey: "hours", stroke: "#FF2D78", strokeWidth: 3, dot: { fill: '#12121A', stroke: '#FF2D78', strokeWidth: 2, r: 4 } })] }) }) })] })] })] }));
};
