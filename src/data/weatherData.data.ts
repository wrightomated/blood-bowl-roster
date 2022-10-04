import type { WeatherTable } from '../models/weather.model';

export const weatherTables: WeatherTable[] = [
    {
        type: 'default', // partly_cloudy_day
        icon: 'sunny',
        results: {
            '2': 'Sweltering Heat', // brightness_high
            '3': 'Very Sunny', // sunny
            '11': 'Pouring Rain', // rainy
            '12': 'Blizzard', // weather_snowy
        },
    },
    {
        type: 'spring', //
        icon: 'local_florist',
        results: {
            '2': 'Morning Dew', // water_drop
            '3': 'Blossoming Flowers', // local_florist
            '11': 'Misty Morning', // foggy
            '12': 'High Winds', // air
        },
    },
    {
        type: 'summer',
        icon: 'sunny',
        results: {
            '2': 'Sweltering Heat', // brightness_high
            '3': 'Melting Astrogranite', // waves
            '11': 'Blinding Rays', // flare
            '12': 'Monsoon', // thunderstorm
        },
    },
    {
        type: 'autumn',
        icon: 'temp_preferences_eco',
        results: {
            '2': 'Leaf-strewn Pitch', // temp_preferences_eco
            '3': 'Autumnal Chill', // ac_unit
            '11': 'Pouring Rain', // rainy
            '12': 'Strong Winds', // air
        },
    },
    {
        type: 'winter',
        icon: 'ac_unit',
        results: {
            '2': 'Cold Winds', // air
            '3': 'Freezing', //severe_cold
            '11': 'Heavy Snow', // snowing
            '12': 'Blizzard', // weather_snowy
        },
    },
    {
        type: 'subterranean',
        icon: 'bubble_chart',
        results: {
            '2': 'Bubbling up from Below', // bubble_chart
            '3': 'Gloomy', // cloud
            '11': 'Thermal Geysers', // sprinkler
            '12': 'Seismic Activity', // crisis_alert
        },
    },
    {
        type: 'primordial',
        icon: 'forest',
        results: {
            '2': 'Praise the Sun Gods', // wb_twilight
            '3': 'Heat Wave', // waves
            '11': 'Jungle Showers', // rainy
            '12': 'Tropical Monsoon', // thunderstorm
        },
    },
    {
        type: 'graveyard',
        icon: 'foggy',
        results: {
            '2': 'Angry Locals', // sentiment_very_dissatisfied
            '3': 'Fog', // foggy
            '11': 'Pouring Rain', // rainy
            '12': 'Lightning', // bolt
        },
    },
    {
        type: 'desolate',
        icon: 'volcano',
        results: {
            '2': 'Tremors', // crisis_alert
            '3': 'Pouring Rain', // rainy
            '11': 'Lava Bombs', // volcano
            '12': 'Strong Winds', //air
        },
    },
    {
        type: 'mountainous',
        icon: 'landscape',
        results: {
            '2': 'Gale Force Winds', // air
            '3': 'Very Sunny', // sunny
            '11': 'Blizzard',
            '12': 'Ice Storm', // severe_cold
        },
    },
    {
        type: 'coastal',
        icon: 'tsunami',
        results: {
            '2': 'Gale Force Winds',
            '3': 'Strong Winds',
            '11': 'Torrential Rain',
            '12': 'Blizzard',
        },
    },
    {
        type: 'desert',
        icon: 'wallpaper',
        results: {
            '2': 'Sweltering Heat',
            '3': 'Very Sunny',
            '11': 'Strong Winds',
            '12': 'Sandstorm',
        },
    },
];

export const weatherSymbol: Record<string, string> = {
    'Perfect Conditions': 'sunny',
    'Sweltering Heat': 'brightness_high',
    'Very Sunny': 'brightness_low',
    'Pouring Rain': 'rainy',
    Blizzard: 'weather_snowy',
    'Morning Dew': 'water_drop',
    'Blossoming Flowers': 'local_florist',
    'Misty Morning': 'foggy',
    'High Winds': 'air',
    'Melting Astrogranite': 'water',
    'Blinding Rays': 'flare',
    Monsoon: 'thunderstorm',
    'Leaf-strewn Pitch': 'temp_preferences_eco',
    'Autumnal Chill': 'ac_unit',
    'Strong Winds': 'air',
    'Ice Storm': 'severe_cold',
    'Gale Force Winds': 'cyclone',
    'Torrential Rain': 'flood',
    Sandstorm: 'snowing',
};
