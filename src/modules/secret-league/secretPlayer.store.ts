import { writable } from 'svelte/store';
import type { Player } from '../../models/player.model';

export const secretPlayers = writable<Player[]>([]);
