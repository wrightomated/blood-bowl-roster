import { writable } from 'svelte/store';
import type { TeamFormat } from '../types/teamFormat';

export const teamFormat = writable<TeamFormat>('elevens');
