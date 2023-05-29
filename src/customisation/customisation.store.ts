import { writable } from 'svelte/store';
import type { TournamentCustomisation } from './types/TournmentCustomisation.type';

export const customisationRules = writable<TournamentCustomisation>(null);
