<script lang="ts">
    import { menuDrawerOpen } from '../../store/menuDrawer.store';

    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../../store/teamSelectionOpen.store';
    import { currentTeam } from '../../store/currentTeam.store';

    import Button from '../uiComponents/button.svelte';
    import { teamFormat } from '../../store/teamFormat.store';

    const loadCurrentTeam = () => {
        teamSelectionOpen.set(false);
        showNewTeamDialogue.set(false);
        teamLoadOpen.set(false);
        showDungeonBowl.set(false);
        menuDrawerOpen.set(false);
        currentTeam.setCurrentTeamWithId($roster.teamId);
    };
    const newTeam = () => {
        teamSelectionOpen.set($teamFormat !== 'dungeon bowl');
        showNewTeamDialogue.set(true);
        teamLoadOpen.set(false);
        showDungeonBowl.set($teamFormat === 'dungeon bowl');
        menuDrawerOpen.set(false);
    };
    const loadTeam = () => {
        teamLoadOpen.set(true);
        showNewTeamDialogue.set(false);
        teamSelectionOpen.set(false);
        showDungeonBowl.set(false);
        menuDrawerOpen.set(false);
    };
</script>

{#if $roster.teamType}
    <Button clickFunction={loadCurrentTeam}
        >Current Team{$roster.teamName ? ': ' + $roster.teamName : ''}</Button
    >
{/if}
<Button cyData="new-team" clickFunction={newTeam}>New Team</Button>
<Button cyData="load-team" clickFunction={loadTeam}>Load Team</Button>
