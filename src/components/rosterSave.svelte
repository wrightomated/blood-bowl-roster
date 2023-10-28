<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { showExport } from '../store/showExport.store';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { showDelete } from '../store/showDelete.store';
    import { showAllInducements } from '../store/showAllInducements.store';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import { modalState } from '../store/modal.store';
    import ColumnControl from './columnControl.svelte';
    import { currentUserStore } from '../store/currentUser.store';
    import { rosterCache } from '../store/rosterCache.store';

    let saved = false;
    let syncing = false;
    let rosterCleared = false;

    async function saveRoster() {
        if ($currentUserStore) {
            syncing = true;
            try {
                await import('./auth/firebaseDB.service').then((service) =>
                    service.uploadRoster($roster)
                );
                saved = true;
                rosterCache.invalidateRoster($roster.rosterId);
                rosterCache.invalidateRosterPreviews();
            } catch (error) {
                console.error(error);
            } finally {
                syncing = false;
            }
        } else {
            savedRosterIndex.addRoster($roster);
            saved = true;
        }
    }

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

    const toggleColumnControls = () => {
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: ColumnControl,
        });
    };

    roster.subscribe((x) => {
        saved = false;
        rosterCleared = false;
    });
</script>

{#if !saved && !syncing}
    <MaterialButton
        cyData="save-roster"
        hoverText="Save team"
        symbol="save"
        clickFunction={() => saveRoster()}
    />
{:else if syncing}
    <i
        class="material-symbols-outlined syncing no-transition"
        title="Saving team">autorenew</i
    >
{:else}<i
        class="material-symbols-outlined saved no-transition"
        title="Team saved">check_circle</i
    >{/if}
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

    .syncing {
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @media print {
        :host {
            display: none;
        }
    }
</style>
