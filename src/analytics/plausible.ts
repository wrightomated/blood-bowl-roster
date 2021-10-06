import type { TeamName } from '../models/team.model';

export const sendNewTeamNameToPlausible = (teamName: TeamName) => {
    (window as any).plausible('team-name', { props: { teamName } });
};
