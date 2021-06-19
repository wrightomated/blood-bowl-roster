<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { showExport } from '../store/showExport.store';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { showDelete } from '../store/showDelete.store';

    const saveRoster = () => {
        savedRosterIndex.addRoster($roster);
        roster.setSaved();
    };

    const toggleDelete = () => showDelete.set(!$showDelete);

    const toggleExport = () => showExport.set(!$showExport);
</script>

{#if !$roster.saved}
    <MaterialButton
        hoverText="Save team"
        symbol="save"
        clickFunction={() => saveRoster()}
    />
{:else}<i class="material-icons saved">check_circle</i>{/if}

<MaterialButton
    hoverText="Delete team forever"
    symbol="delete_forever"
    clickFunction={toggleDelete}
/>

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
