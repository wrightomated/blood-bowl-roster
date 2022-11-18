<script lang="ts">
    import { weatherTables } from '../../../data/weatherData.data';
    import type { WeatherType } from '../../../models/weather.model';
    let selectedTable: WeatherType = 'default';

    function capitalise(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
</script>

<!-- <ToggleButton options={['select', 'roll']} -->
<div class="boxed-div">
    <label for="weather-table">Weather</label>
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
    .boxed-div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    label {
        margin-bottom: 4px;
    }
</style>
