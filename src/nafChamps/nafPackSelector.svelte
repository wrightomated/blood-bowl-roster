<script lang="ts">
    import ToggleButton from '../components/uiComponents/toggleButton.svelte';
    import { currentTeam } from '../store/currentTeam.store';
    import { nafStoreOption, optionMap } from './naf.store';

    let options = ['Option A', 'Option B'];
</script>

<span class="no-print">
    <ToggleButton
        {options}
        selectedIndex={options.indexOf($nafStoreOption)}
        selected={(option) => {
            nafStoreOption.set(option);
        }}
    />

    {#if $nafStoreOption}
        <div>
            <span
                ><strong>Primary:</strong>
                {optionMap[$currentTeam.tier][$nafStoreOption].primary}</span
            >
            <span
                ><strong>Secondary</strong>: {optionMap[$currentTeam.tier][
                    $nafStoreOption
                ].secondary}</span
            >
            <span
                ><strong>Star Players</strong>: {optionMap[$currentTeam.tier][
                    $nafStoreOption
                ].starPlayers}</span
            >
        </div>
    {/if}
</span>

<style>
    div {
        display: flex;
        gap: 8px;
        margin-bottom: 1rem;
    }
</style>
