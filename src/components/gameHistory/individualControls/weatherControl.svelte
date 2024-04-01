<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { weatherTables } from '../../../data/weatherData.data';
    import { roster } from '../../../store/teamRoster.store';
</script>

<div class="boxed-div">
    <label for="weather-table">{$_('match.pre.weather')}</label>
    <select
        name="weather-table"
        id="weather-table"
        bind:value={$roster.matchDraft.weather.table}
    >
        {#each weatherTables as table}
            <option class="weather-type" value={table.type}
                >{$_('weather.' + table.type)}</option
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
