<script lang="ts">
    import type { LeagueRosterStatus } from '../models/roster.model';
    import { modalState } from '../store/modal.store';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import ToggleButton from './uiComponents/toggleButton.svelte';
    const leagueStatus: LeagueRosterStatus[] = ['draft', 'commenced'];

    async function showRosterTotalInfo() {
        const info = await import('../modules/infoBlock/draftInfo.svelte');
        modalState.modalCustomComponent(info.default);
    }
</script>

{#if $roster.leagueRosterStatus}
    <div>
        <ToggleButton
            options={leagueStatus}
            selectedIndex={leagueStatus.indexOf($roster.leagueRosterStatus)}
            selected={(status) => {
                roster.changeLeagueRosterStatus(status);
            }}
        />
        <MaterialButton
            symbol="info"
            hoverText={'Information'}
            clickFunction={showRosterTotalInfo}
        ></MaterialButton>
    </div>
{/if}

<style>
    div {
        margin-top: 12px;
    }
</style>
