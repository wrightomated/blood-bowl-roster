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

export type WeatherResult = {
    [key: string]: string;
};

export type WeatherTable = {
    type: WeatherType;
    results: WeatherResult;
};
