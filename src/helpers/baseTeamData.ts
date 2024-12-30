import { dungeonBowlColleges } from '../data/dungeonBowlColleges.data';
import { teamData } from '../data/teams.data';
import { dbCollegeToTeam } from '../models/dungeonBowl.model';
import type { Team } from '../models/team.model';

export function getBaseTeamData(isDungeonBowl: boolean = false): Team[] {
    if (isDungeonBowl) {
        return dungeonBowlColleges.colleges.map((x) => dbCollegeToTeam(x));
    }
    return teamData.teams;
}
