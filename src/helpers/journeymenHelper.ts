import type { TeamFormat } from '../types/teamFormat';

export function journeymanPosition(playerPosition: string) {
    return playerPosition.replace(/(Line(wo)*man)|(Marauder)/, 'Journeyman');
}

export function journeymanSkills(rosterFormat?: TeamFormat) {
    return rosterFormat === 'sevens' ? [710] : [71];
}
