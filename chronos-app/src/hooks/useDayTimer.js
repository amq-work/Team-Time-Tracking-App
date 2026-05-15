import { useState, useEffect, useRef } from 'react';
export const useDayTimer = () => {
    const [mode, setMode] = useState('work');
    const [isRunning, setIsRunning] = useState(false);
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const intervalRef = useRef(null);
    const [dayStarted, setDayStarted] = useState(false);
    const [dayEnded, setDayEnded] = useState(false);
    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedWork = localStorage.getItem('todayWorkSeconds');
        const savedBreak = localStorage.getItem('todayBreakSeconds');
        const savedDayStarted = localStorage.getItem('dayStarted');
        const savedDayEnded = localStorage.getItem('dayEnded');
        if (savedWork)
            setWorkSeconds(parseInt(savedWork));
        if (savedBreak)
            setBreakSeconds(parseInt(savedBreak));
        if (savedDayStarted === 'true')
            setDayStarted(true);
        if (savedDayEnded === 'true')
            setDayEnded(true);
    }, []);
    // Timer interval
    useEffect(() => {
        if (isRunning && dayStarted && !dayEnded) {
            intervalRef.current = setInterval(() => {
                if (mode === 'work') {
                    setWorkSeconds(prev => prev + 1);
                }
                else {
                    setBreakSeconds(prev => prev + 1);
                }
            }, 1000);
        }
        else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, [isRunning, mode, dayStarted, dayEnded]);
    // Save work seconds to localStorage
    useEffect(() => {
        if (workSeconds > 0) {
            localStorage.setItem('todayWorkSeconds', workSeconds.toString());
        }
    }, [workSeconds]);
    // Save break seconds to localStorage
    useEffect(() => {
        if (breakSeconds > 0) {
            localStorage.setItem('todayBreakSeconds', breakSeconds.toString());
        }
    }, [breakSeconds]);
    // Save day started state
    useEffect(() => {
        localStorage.setItem('dayStarted', dayStarted.toString());
    }, [dayStarted]);
    // Save day ended state
    useEffect(() => {
        localStorage.setItem('dayEnded', dayEnded.toString());
    }, [dayEnded]);
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const startDay = () => {
        setDayStarted(true);
        setDayEnded(false);
        setIsRunning(true);
        setMode('work');
    };
    const endDay = () => {
        setIsRunning(false);
        setDayEnded(true);
    };
    const startBreak = () => {
        setIsRunning(false);
        setMode('break');
        setIsRunning(true);
    };
    const endBreak = () => {
        setIsRunning(false);
        setMode('work');
        setIsRunning(true);
    };
    const pause = () => {
        setIsRunning(false);
    };
    const resume = () => {
        if (dayStarted && !dayEnded) {
            setIsRunning(true);
        }
    };
    const resetDay = () => {
        setWorkSeconds(0);
        setBreakSeconds(0);
        setDayStarted(false);
        setDayEnded(false);
        setIsRunning(false);
        setMode('work');
        localStorage.removeItem('todayWorkSeconds');
        localStorage.removeItem('todayBreakSeconds');
        localStorage.removeItem('dayStarted');
        localStorage.removeItem('dayEnded');
    };
    return {
        mode,
        isRunning,
        workSeconds,
        breakSeconds,
        dayStarted,
        dayEnded,
        formatWorkTime: () => formatTime(workSeconds),
        formatBreakTime: () => formatTime(breakSeconds),
        startDay,
        endDay,
        startBreak,
        endBreak,
        pause,
        resume,
        resetDay,
        totalSeconds: workSeconds + breakSeconds,
        formatTotalTime: () => formatTime(workSeconds + breakSeconds)
    };
};
