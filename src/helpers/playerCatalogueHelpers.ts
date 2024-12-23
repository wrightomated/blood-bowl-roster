import { playerCatalogue } from '../data/players.data';

/**
 *
 * @deprecated
 */
export function playerById(id: number) {
    return playerCatalogue.players.find((x) => x.id === id);
}
