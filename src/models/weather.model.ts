export type WeatherType =
    | 'default'
    | 'spring'
    | 'summer'
    | 'autumn'
    | 'winter'
    | 'subterranean'
    | 'primordial'
    | 'graveyard'
    | 'desolate'
    | 'mountainous'
    | 'coastal'
    | 'desert';

/**
 * 2d6 result
 * 4 - 10 is no weather
 */
export type WeatherRollResult = Record<`${2 | 3 | 11 | 12}`, string>;

export type WeatherTable = {
    type: WeatherType;
    results: WeatherRollResult;
};
