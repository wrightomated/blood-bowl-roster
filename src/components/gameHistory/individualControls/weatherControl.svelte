<script lang="ts">
    import { weatherTables } from '../../../data/weatherData.data';
    import type { WeatherType } from '../../../models/weather.model';
    import Die from '../../dice/die.svelte';
    let selectedTable: WeatherType = 'default';
    let perfectConditions = ['4 - 10', 'Perfect Conditions'];
    let weatherResult = perfectConditions[0];

    function capitalise(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    function weatherTable(weatherType: WeatherType) {
        const results = weatherTables.find(
            (t) => t.type === weatherType
        ).results;
        const entries = Object.entries(results);
        return [
            entries[0],
            entries[1],
            perfectConditions,
            entries[2],
            entries[3],
        ];
    }
    function updateValue(event) {
        const result = event.detail.result;
        if (result <= 3 || result >= 11) {
            weatherResult = result.toString();
        } else {
            weatherResult = perfectConditions[0];
        }
    }
</script>

<label for="weather-table">Weather</label>

<!-- <ToggleButton options={['select', 'roll']} -->
<div class="result">
    <select name="weather-table" id="weather-table" bind:value={selectedTable}>
        {#each weatherTables as table}
            <option class="weather-type" value={table.type}
                >{capitalise(table.type)}</option
            >
        {/each}
    </select>
    <select
        name="weather-result"
        id="weather-result"
        bind:value={weatherResult}
    >
        {#each weatherTable(selectedTable) as weather}
            <option value={weather[0]}>{weather[1]}</option>

            <!-- <option class="weather-type" value={table.type}
                >{capitalise(table.type)}</option
            > -->
        {/each}
    </select>
    <Die faces={6} rolls={2} on:rolled={updateValue} />
</div>

<style>
    select {
        margin-bottom: 4px;
    }
    .result {
        display: flex;
        gap: 4px;
    }
</style>
