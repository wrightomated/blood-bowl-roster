import { derived, writable } from 'svelte/store';
import type { Player } from '../models/player.model';
import { playerCatalogue as playerData } from '../data/players.data';

export const playerCatalogue = (() => {
    const _initialPlayers = writable<Player[]>(playerData.players);
    const _secretPlayers = writable<Player[]>([]);
    const _allPlayerData = derived(
        [_initialPlayers, _secretPlayers],
        ([$initialPlayers, $secretPlayers]) => {
            return [...$initialPlayers, ...$secretPlayers];
        }
    );
    const _findById = derived(_allPlayerData, ($allPlayerData) => {
        return (id: number) => $allPlayerData.find((x) => x.id === id);
    });

    return {
        initialPlayers: _initialPlayers,
        secretPlayers: _secretPlayers,
        allPlayerData: _allPlayerData,
        findById: _findById,
        setSecretPlayers: _secretPlayers.set,
        ..._allPlayerData,
    };
})();
