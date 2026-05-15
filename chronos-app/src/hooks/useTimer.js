import { useState, useEffect, useRef } from 'react';
export const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, [isRunning]);
    const formatTime = () => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const stop = () => {
        setIsRunning(false);
        setSeconds(0);
    };
    return { seconds, formatTime, isRunning, start, pause, stop };
};
