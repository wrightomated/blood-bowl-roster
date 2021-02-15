import { writable } from 'svelte/store';

export const showSkillButtons = writable<boolean[]>(Array(16).fill(false));
