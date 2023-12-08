import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export const registerLocales = (savedLocale?: string) => {
    register('en', () => import('./en.json'));
    register('fr', () => import('./fr.json'));

    init({
        fallbackLocale: 'en',
        initialLocale: savedLocale,
    });
};
export const localeStorageKey = 'user-locale';
export const availableLocales = ['en', 'fr'];
