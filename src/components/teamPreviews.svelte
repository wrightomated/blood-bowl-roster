<script lang="ts">
    import { _ } from 'svelte-i18n';
    import type { RosterPreviews } from '../models/roster.model';
    import { currentUserStore } from '../store/currentUser.store';
    import RosterPreviewCard from './uiComponents/rosterPreviewCard.svelte';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import MaterialButton from './uiComponents/materialButton.svelte';

    export let rosterPreviews: RosterPreviews;

    $: filteredString = '';
    $: previewArray = rosterPreviews ? Object.values(rosterPreviews) : [];
    $: sortedPreviews = sortPreviews(rosterPreviews, filteredString);
    $: teamTypes = [...new Set(previewArray.map((x) => x.teamType))].sort(
        (a, b) => a.localeCompare(b)
    );
    $: selectedTeamType = undefined;

    $: availableFormats = [...new Set(previewArray.map((x) => x.format))].sort(
        (a, b) => a.localeCompare(b)
    );
    $: selectedFormat = undefined;
    $: availableModes = [...new Set(previewArray.map((x) => x.mode))].sort(
        (a, b) => a.localeCompare(b)
    );
    $: selectedMode = undefined;

    function sortPreviews(
        rosterPreviews: RosterPreviews,
        filteredString: string
    ) {
        if (!rosterPreviews) return [];
        const previews = previewArray;
        if (previews.length === 0) return [];
        let filtered = previews.sort((a, b) =>
            a.teamName.localeCompare(b.teamName)
        );
        if (filteredString) {
            filtered = filtered.filter((preview) =>
                preview.teamName
                    .toLowerCase()
                    .includes(filteredString.toLowerCase())
            );
        }
        if (selectedTeamType) {
            filtered = filtered.filter(
                (preview) => preview.teamType === selectedTeamType
            );
        }
        if (selectedFormat) {
            filtered = filtered.filter(
                (preview) => preview.format === selectedFormat
            );
        }
        if (selectedMode) {
            filtered = filtered.filter(
                (preview) => preview.mode === selectedMode
            );
        }
        return filtered;
    }
</script>

<h3>
    {$_('load.coachTeams', {
        values: { coach: $currentUserStore.displayName },
    })}
</h3>
{#if previewArray.length > 5}
    <div class="filter-controls">
        <input
            aria-label="filter string"
            id="filter-string-input"
            placeholder="Team name"
            bind:value={filteredString}
            use:blurOnEscapeOrEnter
            class:activated={filteredString.length > 0}
        />
        <!-- Team type selection -->
        <select
            bind:value={selectedTeamType}
            class:activated={selectedTeamType !== undefined}
        >
            <option value={undefined}>Team type</option>
            {#each teamTypes as teamType}
                <option value={teamType}>{teamType}</option>
            {/each}
        </select>
        <!-- Format selection -->
        <select
            bind:value={selectedFormat}
            class:activated={selectedFormat !== undefined}
        >
            <option value={undefined}>Variant</option>
            {#each availableFormats as format}
                <option value={format}
                    >{format.charAt(0).toUpperCase() + format.slice(1)}</option
                >
            {/each}
        </select>
        <!-- Mode selection -->
        <select
            bind:value={selectedMode}
            class:activated={selectedMode !== undefined}
        >
            <option value={undefined}>Game type</option>
            {#each availableModes as mode}
                <option value={mode}
                    >{mode.charAt(0).toUpperCase() + mode.slice(1)}</option
                >
            {/each}
        </select>
        {#if selectedTeamType || selectedFormat || selectedMode || filteredString}
            <MaterialButton
                hoverText="Clear filters"
                symbol="search_off"
                clickFunction={() => {
                    selectedTeamType = undefined;
                    selectedFormat = undefined;
                    selectedMode = undefined;
                    filteredString = '';
                }}
            ></MaterialButton>
        {/if}
    </div>
{/if}

<div class="team-previews">
    {#each sortedPreviews as preview}
        <RosterPreviewCard {preview} />
    {/each}
</div>

<style>
    .team-previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        justify-content: center;
        margin: 16px 8px;
    }
    h3 {
        text-align: center;
    }
    .filter-controls {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 8px;
        flex-wrap: wrap;
        align-items: center;
    }
    .activated:not(:focus) {
        outline: 2px solid var(--shadow);
    }
</style>
