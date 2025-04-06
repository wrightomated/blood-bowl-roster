import type { Player, StarPlayer } from '../models/player.model';
import type { TournamentCustomisation } from './types/TournmentCustomisation.type';

export function playerIsMegaStar(
    customisation: TournamentCustomisation,
    player: Player | StarPlayer
) {
    if (customisation?.starPlayerSettings?.megaStarPlayers?.length > 0) {
        return customisation.starPlayerSettings.megaStarPlayers.includes(
            player.id
        );
    } else if ('isMegaStar' in player) {
        return player.isMegaStar;
    } else {
        return false;
    }
}
