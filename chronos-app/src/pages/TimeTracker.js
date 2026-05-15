import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Play, Square, Coffee, Sun, Moon, Flag, Folder, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useDayTimer } from '../hooks/useDayTimer';
export const TimeTracker = () => {
    const { mode, isRunning, dayStarted, dayEnded, formatWorkTime, formatBreakTime, formatTotalTime, startDay, endDay, startBreak, endBreak, pause, resume, resetDay } = useDayTimer();
    const [taskName, setTaskName] = useState('');
    const [selectedProject, setSelectedProject] = useState('Chronos App');
    const [isBillable, setIsBillable] = useState(true);
    const [currentTaskStarted, setCurrentTaskStarted] = useState(null);
    const [entries, setEntries] = useState([]);
    const handleStartTask = () => {
        if (!taskName) {
            alert('Please enter a task name');
            return;
        }
        setCurrentTaskStarted(new Date());
        if (!dayStarted) {
            startDay();
        }
        else {
            resume();
        }
    };
    const handleStopTask = () => {
        if (currentTaskStarted) {
            const endTime = new Date();
            const durationMs = endTime.getTime() - currentTaskStarted.getTime();
            const durationSeconds = Math.floor(durationMs / 1000);
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const secs = durationSeconds % 60;
            const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            const newEntry = {
                id: Date.now(),
                task: taskName,
                project: selectedProject,
                duration,
                startTime: currentTaskStarted.toLocaleTimeString(),
                endTime: endTime.toLocaleTimeString(),
                billable: isBillable
            };
            setEntries([newEntry, ...entries]);
            setTaskName('');
            setCurrentTaskStarted(null);
            pause();
        }
    };
    const handleStartBreak = () => {
        if (currentTaskStarted) {
            handleStopTask();
        }
        startBreak();
    };
    const handleEndBreak = () => {
        endBreak();
    };
    const handleEndDay = () => {
        if (currentTaskStarted) {
            handleStopTask();
        }
        endDay();
    };
    // If day hasn't started or day has ended, show start/end screen
    if (!dayStarted || dayEnded) {
        return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-8", children: _jsxs(Card, { className: "p-12 text-center max-w-md", children: [_jsx(Sun, { className: "w-16 h-16 text-accent mx-auto mb-6" }), _jsx("h2", { className: "text-2xl font-bold text-text-primary mb-4", children: !dayStarted ? 'Start Your Work Day' : 'Day Completed!' }), _jsx("p", { className: "text-text-secondary mb-8", children: !dayStarted
                            ? 'Track your time, take breaks, and maximize productivity'
                            : `Total time today: ${formatTotalTime()}` }), !dayStarted ? (_jsx(Button, { size: "lg", onClick: startDay, leftIcon: _jsx(Sun, { className: "w-5 h-5" }), children: "Start Day" })) : (_jsx(Button, { size: "lg", onClick: resetDay, leftIcon: _jsx(Flag, { className: "w-5 h-5" }), children: "New Day" }))] }) }));
    }
    return (_jsxs("div", { className: "flex flex-col gap-6 max-w-6xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { className: "p-6 text-center", children: [_jsx("p", { className: "text-text-secondary text-sm mb-2", children: "Work Time" }), _jsx("p", { className: "font-pixel text-3xl text-accent", children: formatWorkTime() }), mode === 'work' && isRunning && _jsx("p", { className: "text-xs text-green-500 mt-2 animate-pulse", children: "\u25CF Working" })] }), _jsxs(Card, { className: "p-6 text-center", children: [_jsx("p", { className: "text-text-secondary text-sm mb-2", children: "Break Time" }), _jsx("p", { className: "font-pixel text-3xl text-blue-500", children: formatBreakTime() }), mode === 'break' && isRunning && _jsx("p", { className: "text-xs text-blue-500 mt-2 animate-pulse", children: "\u25CF On Break" })] }), _jsxs(Card, { className: "p-6 text-center", children: [_jsx("p", { className: "text-text-secondary text-sm mb-2", children: "Total Today" }), _jsx("p", { className: "font-pixel text-3xl text-text-primary", children: formatTotalTime() })] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "What are you working on?", value: taskName, onChange: (e) => setTaskName(e.target.value), className: "text-lg py-3", disabled: !!currentTaskStarted }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("select", { className: "bg-surface-light border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent", value: selectedProject, onChange: (e) => setSelectedProject(e.target.value), disabled: !!currentTaskStarted, children: [_jsx("option", { children: "Chronos App" }), _jsx("option", { children: "Website Redesign" }), _jsx("option", { children: "Mobile App" }), _jsx("option", { children: "Internal" })] }), _jsx("button", { onClick: () => setIsBillable(!isBillable), className: `flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${isBillable ? 'text-accent bg-accent/10' : 'text-text-muted hover:bg-surface-light'}`, title: "Toggle Billable", children: _jsx(DollarSign, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { className: "flex flex-wrap justify-center gap-3 mt-6", children: [!currentTaskStarted ? (_jsx(Button, { onClick: handleStartTask, leftIcon: _jsx(Play, { className: "w-4 h-4" }), children: "Start Task" })) : (_jsx(Button, { variant: "danger", onClick: handleStopTask, leftIcon: _jsx(Square, { className: "w-4 h-4" }), children: "Stop Task" })), mode === 'work' && !currentTaskStarted && dayStarted && !dayEnded && (_jsx(Button, { variant: "secondary", onClick: handleStartBreak, leftIcon: _jsx(Coffee, { className: "w-4 h-4" }), children: "Take Break" })), mode === 'break' && (_jsx(Button, { variant: "primary", onClick: handleEndBreak, leftIcon: _jsx(Play, { className: "w-4 h-4" }), children: "End Break" })), _jsx(Button, { variant: "ghost", onClick: pause, disabled: !isRunning, children: "Pause" }), _jsx(Button, { variant: "ghost", onClick: resume, disabled: isRunning, children: "Resume" }), _jsx(Button, { variant: "secondary", onClick: handleEndDay, leftIcon: _jsx(Moon, { className: "w-4 h-4" }), children: "End Day" })] })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-text-primary", children: "Today's Tasks" }), _jsxs("span", { className: "text-sm text-text-secondary", children: ["Total: ", _jsx("span", { className: "font-pixel text-xs ml-2 text-accent", children: formatTotalTime() })] })] }), _jsx("div", { className: "flex flex-col gap-2 max-h-96 overflow-y-auto", children: entries.length === 0 ? (_jsx(Card, { className: "p-8 text-center", children: _jsx("p", { className: "text-text-secondary", children: "No tasks yet. Start your first task!" }) })) : (entries.map((entry) => (_jsxs(Card, { className: "p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-accent/50 transition-colors", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-base font-medium text-text-primary", children: entry.task }), entry.billable && _jsx("span", { className: "text-xs text-accent px-2 py-0.5 rounded bg-accent/10", children: "Billable" })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-text-muted", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Folder, { className: "w-3 h-3" }), entry.project] }), _jsxs("span", { children: [entry.startTime, " - ", entry.endTime] })] })] }), _jsx("div", { className: "font-pixel text-sm text-text-primary", children: entry.duration })] }, entry.id)))) })] })] }));
};
