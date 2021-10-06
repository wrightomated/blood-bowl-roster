import type { TeamName } from '../models/team.model';

// export const sendEventToPlausible = async (data: any) => {
//     plausible();
//     const url = 'https://plausible.io/api/event';
//     await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
// };

export const sendNewTeamNameToPlausible = (teamName: TeamName) => {
    (window as any).plausible('team-name', { teamName });
};
