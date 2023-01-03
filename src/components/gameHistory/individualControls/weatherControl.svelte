<script lang="ts">
    import { weatherTables } from '../../../data/weatherData.data';
    import type { WeatherType } from '../../../models/weather.model';
    import { roster } from '../../../store/teamRoster.store';
    let selectedTable: WeatherType = 'default';

    function capitalise(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
</script>

<div class="boxed-div">
    <label for="weather-table">Weather</label>
    <select
        name="weather-table"
        id="weather-table"
        bind:value={$roster.matchDraft.weather.table}
    >
        {#each weatherTables as table}
            <option class="weather-type" value={table.type}
                >{capitalise(table.type)}</option
            >
        {/each}
    </select>
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
    select {
        background-color: white;
    }
</style>
