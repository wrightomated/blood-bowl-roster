import { playerCatalogue } from '../data/players.data';

export function playerById(id: number) {
    return playerCatalogue.players.find((x) => x.id === id);
}
