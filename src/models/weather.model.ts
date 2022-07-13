export type WeatherType =
    | 'weather'
    | 'spring'
    | 'summer'
    | 'autumn'
    | 'winter'
    | 'subterranean'
    | 'primordial'
    | 'graveyard'
    | 'desolate wasteland'
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
