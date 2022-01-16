<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { showExport } from '../store/showExport.store';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { showDelete } from '../store/showDelete.store';
    import { showAllInducements } from '../store/showAllInducements.store';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import { columnControlsOpen } from '../store/columnControls.store';

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

    const printPage = () => {
        sendEventToAnalytics('Print');
        rosterViewMode.set('table');
        showAllInducements.set(false);

        // Delay for view switch in the event loop
        setTimeout(() => {
            window.print();
        }, 2);
    };

    const toggleColumnControls = () =>
        columnControlsOpen.set(!$columnControlsOpen);

    roster.subscribe((x) => {
        saved = false;
        rosterCleared = false;
    });
</script>

{#if !saved}
    <MaterialButton
        cyData="save-roster"
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
<MaterialButton
    hoverText="Print roster"
    symbol="print"
    clickFunction={printPage}
/>
{#if $rosterViewMode === 'table'}
    <MaterialButton
        hoverText="Roster Settings"
        symbol="settings"
        clickFunction={toggleColumnControls}
    />
{/if}

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
