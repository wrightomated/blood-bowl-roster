import { playerCatalogue } from '../../store/playerCatalogue.store';
import { secretTeams } from './secretTeams.store';

export async function loadSecretData() {
    try {
        const modules = await Promise.all([
            import('./secretTeam.data'),
            import('./secretPlayer.data'),
        ]);
        secretTeams.set(modules[0].secretTeamData);
        playerCatalogue.setSecretPlayers(modules[1].secretPlayerData);
        return {
            secretTeams: modules[0].secretTeamData,
            secretPlayers: modules[1].secretPlayerData,
        };
    } catch (error) {
        return {
            secretTeams: [],
            secretPlayers: [],
        };
    }
}
