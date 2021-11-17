import { writable } from 'svelte/store';

// export const analyticsConsent = writable<boolean>(true);
const getConsentFromLocalStorage = () => {
    const consent = localStorage.getItem('allowAnalytics');
    return consent === 'false' ? false : true;
};
const currentConsent = () => writable<boolean>(getConsentFromLocalStorage());

export const analyticsConsent = currentConsent();
