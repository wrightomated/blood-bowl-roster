<script lang="ts">
    import { nanoid } from 'nanoid';

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
    import type { Roster } from '../models/roster.model';

    let saved = false;
    let saving = false;
    let rosterCleared = false;

    async function saveRoster() {
        if ($currentUserStore) {
            await uploadRoster($roster);
        } else {
            savedRosterIndex.addRoster($roster);
            saved = true;
        }
    }

    async function copyRoster() {
        const duplicatedRoster: Roster = {
            ...$roster,
            rosterId: nanoid(),
            teamName: `${$roster.teamName} (copy)`,
        };
        if ($currentUserStore) {
            modalState.modalLoading('Copying roster');
            await uploadRoster(duplicatedRoster);
            try {
                roster.loadRoster(duplicatedRoster);
                rosterCache.cacheRoster(duplicatedRoster);
                modalState.modalMessage('Roster copied and loaded');
            } catch (error) {
                console.error(error);
                modalState.modalError('Something went wrong loading copy');
            }
        } else {
            savedRosterIndex.copyRoster(duplicatedRoster);
        }
    }

    async function uploadRoster(rosterToUpload: Roster) {
        saving = true;
        try {
            await import('./auth/firebaseDB.service').then((service) =>
                service.uploadRoster(rosterToUpload)
            );
            saved = true;
            rosterCache.invalidateRoster(rosterToUpload.rosterId);
            rosterCache.invalidateRosterPreviews();
        } catch (error) {
            console.error(error);
        } finally {
            saving = false;
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

{#if !saved && !saving}
    <MaterialButton
        cyData="save-roster"
        hoverText="Save team"
        symbol="save"
        clickFunction={() => saveRoster()}
    />
{:else if saving}
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
<MaterialButton
    hoverText="Copy roster"
    symbol="file_copy"
    clickFunction={copyRoster}
/>
<MaterialButton
    hoverText="Sort by column"
    symbol="sort"
    clickFunction={printPage}
/>

<!-- {#if $rosterViewMode === 'table'}
    <MaterialButton
        hoverText="Roster Settings"
        symbol="settings"
        clickFunction={toggleColumnControls}
    />
{/if} -->
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
