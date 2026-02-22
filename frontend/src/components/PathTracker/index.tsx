import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function PathTracker() {
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const storedCurrentPath = localStorage.getItem('currentPath');

        if (
            storedCurrentPath !== currentPath 
            // && !haveCommonSubstring(storedCurrentPath, currentPath, '/flow')
        ) {
            localStorage.setItem('prevPath', storedCurrentPath || '');
            localStorage.setItem('currentPath', currentPath);
        }
    }, [location.pathname]);

    return null;
} 