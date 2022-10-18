<script lang="ts">
    import { weatherTables } from '../../../data/weatherData.data';
    import type { WeatherType } from '../../../models/weather.model';
    let selectedTable: WeatherType = 'default';

    function capitalise(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
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
    <!-- <i class="material-symbols-outlined symbol-empty"
        >{weatherTables.find((x) => x.type === selectedTable).icon}</i
    > -->

    <!-- <select
        name="weather-result"
        id="weather-result"
        bind:value={weatherResult}
    >
        {#each weatherTable(selectedTable) as weather}
            <option value={weather[0]}>{weather[1]}</option>
        {/each}
    </select>
    <Die faces={6} rolls={2} on:rolled={updateValue} /> -->
</div>

<style>
    label {
        margin-top: 16px;
        margin-bottom: 4px;
    }
    .result {
        display: flex;
        gap: 4px;
    }
</style>
