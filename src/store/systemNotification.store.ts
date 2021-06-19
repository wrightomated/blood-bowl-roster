import { writable } from 'svelte/store';

export const systemNotificationMessage = writable<string>('');
