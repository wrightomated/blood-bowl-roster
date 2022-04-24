<script lang="ts">
    import type { LeagueRosterStatus } from '../models/roster.model';
    import { roster } from '../store/teamRoster.store';
    import ToggleButton from './uiComponents/toggleButton.svelte';
    const leagueStatus: LeagueRosterStatus[] = ['draft', 'commenced'];
</script>

{#if $roster.leagueRosterStatus}
    <ToggleButton
        options={leagueStatus}
        selectedIndex={leagueStatus.indexOf($roster.leagueRosterStatus)}
        selected={(status) => {
            roster.changeLeagueRosterStatus(status);
        }}
    />
{/if}
