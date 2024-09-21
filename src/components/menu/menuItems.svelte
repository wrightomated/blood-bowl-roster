<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { menuDrawerOpen } from '../../store/menuDrawer.store';

    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../../store/teamSelectionOpen.store';
    import { currentTeam, currentTeamId } from '../../store/currentTeam.store';

    import Button from '../uiComponents/button.svelte';
    import { teamFormat } from '../../store/teamFormat.store';

    const loadCurrentTeam = () => {
        teamSelectionOpen.set(false);
        showNewTeamDialogue.set(false);
        teamLoadOpen.set(false);
        showDungeonBowl.set(false);
        menuDrawerOpen.set(false);
        currentTeamId.set($roster.teamId);
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
        >{$_('menu.current')}{$roster.teamName
            ? ': ' + $roster.teamName
            : ''}</Button
    >
{/if}
<Button cyData="new-team" clickFunction={newTeam}>{$_('menu.new')}</Button>
<Button cyData="load-team" clickFunction={loadTeam}>{$_('menu.load')}</Button>
