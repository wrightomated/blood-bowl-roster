import type { WeatherTable } from '../models/weather.model';

export const weatherTables: WeatherTable[] = [
    {
        type: 'default',
        results: {
            '2': 'Sweltering Heat',
            '3': 'Very Sunny',
            '11': 'Pouring Rain',
            '12': 'Blizzard',
        },
    },
    {
        type: 'spring',
        results: {
            '2': 'Morning Dew',
            '3': 'Blossoming Flowers',
            '11': 'Misty Morning',
            '12': 'High Winds',
        },
    },
    {
        type: 'summer',
        results: {
            '2': 'Sweltering Heat',
            '3': 'Melting Astrogranite',
            '11': 'Blinding Rays',
            '12': 'Monsoon',
        },
    },
    {
        type: 'autumn',
        results: {
            '2': 'Leaf-strewn Pitch',
            '3': 'Autumnal Chill',
            '11': 'Pouring Rain',
            '12': 'Strong Winds',
        },
    },
    {
        type: 'winter',
        results: {
            '2': 'Cold Winds',
            '3': 'Freezing',
            '11': 'Heavy Snow',
            '12': 'Blizzard',
        },
    },
    {
        type: 'subterranean',
        results: {
            '2': 'Bubbling up from Below',
            '3': 'Gloomy',
            '11': 'Thermal Geysers',
            '12': 'Seismic Activity',
        },
    },
    {
        type: 'primordial',
        results: {
            '2': 'Praise the Sun Gods',
            '3': 'Heat Wave',
            '11': 'Jungle Showers',
            '12': 'Tropical Monsoon',
        },
    },
    {
        type: 'graveyard',
        results: {
            '2': 'Angry Locals',
            '3': 'Fog',
            '11': 'Pouring Rain',
            '12': 'Lightning',
        },
    },
    {
        type: 'desolate',
        results: {
            '2': 'Tremors',
            '3': 'Pouring Rain',
            '11': 'Lava Bombs',
            '12': 'Strong Winds',
        },
    },
    {
        type: 'mountainous',
        results: {
            '2': 'Gale Force Winds',
            '3': 'Very Sunny',
            '11': 'Blizzard',
            '12': 'Ice Storm',
        },
    },
    {
        type: 'coastal',
        results: {
            '2': 'Gale Force Winds',
            '3': 'Strong Winds',
            '11': 'Torrential Rain',
            '12': 'Blizzard',
        },
    },
    {
        type: 'desert',
        results: {
            '2': 'Sweltering Heat',
            '3': 'Very Sunny',
            '11': 'Strong Winds',
            '12': 'Sandstorm',
        },
    },
];
