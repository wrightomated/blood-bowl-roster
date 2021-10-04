<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { showExport } from '../store/showExport.store';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { showDelete } from '../store/showDelete.store';

    let saved = false;
    let rosterCleared = false;

    const saveRoster = () => {
        savedRosterIndex.addRoster($roster);
        saved = true;
    };

    // const clearRoster = () => {
    //     roster.reset();
    //     savedRosterIndex.removeRoster();
    //     rosterCleared = true;
    // };
    const toggleDelete = () => showDelete.set(!$showDelete);

    const toggleExport = () => showExport.set(!$showExport);

    roster.subscribe((x) => {
        saved = false;
        rosterCleared = false;
    });
</script>

{#if !saved}
    <MaterialButton
        hoverText="Save team"
        symbol="save"
        clickFunction={() => saveRoster()}
    />
{:else}<i class="material-icons saved">check_circle</i>{/if}
{#if !rosterCleared}
    <MaterialButton
        hoverText="Delete team forever"
        symbol="delete_forever"
        clickFunction={toggleDelete}
    />
{/if}
<MaterialButton
    hoverText="Toggle view"
    symbol={$rosterViewMode === 'grid' ? 'table_rows' : 'grid_view'}
    clickFunction={() =>
        rosterViewMode.set($rosterViewMode === 'grid' ? 'table' : 'grid')}
/>
<MaterialButton
    hoverText="Share team"
    symbol={$showExport ? 'link_off' : 'link'}
    clickFunction={toggleExport}
    cyData="share-team"
/>

<style lang="scss">
    .saved {
        color: green;
        margin-bottom: 3px;
    }

    @media print {
        :host {
            display: none;
        }
    }
</style>
