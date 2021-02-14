import { writable } from 'svelte/store';

const newViewMode = () => {
    const isMobile =
        Math.min(window.screen.width, window.screen.height) < 768 ||
        navigator.userAgent.indexOf('Mobi') > -1;
    return isMobile ? 'grid' : 'table';
};

const getViewMode = () => {
    return (
        (localStorage.getItem('rosterViewMode') as RosterViewMode) ||
        newViewMode()
    );
};

type RosterViewMode = 'grid' | 'table';

export const rosterViewMode = writable<RosterViewMode>(getViewMode());
