export type TeamFormat = 'sevens' | 'elevens' | 'dungeon bowl';

export const getTeamFormatShortDisplay: (tf: TeamFormat) => string = (
    tf: TeamFormat
) => {
    return {
        sevens: '7s',
        elevens: '11s',
        'dungeon bowl': 'DB',
    }[tf];
};
