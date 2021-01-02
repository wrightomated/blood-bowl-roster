<script lang="ts">
    import { slide } from 'svelte/transition';

    import type { Team } from '../models/team.model';
    import { currentTeam } from '../store/currentTeam.store';
    import { roster } from '../store/teamRoster.store';
    import { teamSelectionOpen } from '../store/teamSelectionOpen.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import type { Roster } from '../models/roster.model';
    import { teamLoadOpen } from '../store/teamLoadOpen.store';
    export let teamList: Team[];

    $: showTeams = $teamSelectionOpen;

    const sortedTeam = () => {
        return teamList.sort((a, b) => a.name.localeCompare(b.name));
    };

    const newTeam = (index: number) => {
        currentTeam.set(teamList.find((x) => x.id === index));
    };

    const toggleTeam = () => {
        teamSelectionOpen.set(!showTeams);
    };

    const toggleLoad = () => {
        teamLoadOpen.set(!$teamLoadOpen);
    };

    const createTeam = () => {
        savedRosterIndex.newId();
        roster.reset({
            teamId: $currentTeam.id,
            teamType: $currentTeam.name,
        });
        teamSelectionOpen.set(false);
    };

    const loadTeam = (savedRoster) => {
        const loadedRoster: Roster = JSON.parse(
            localStorage.getItem(`savedRoster${savedRoster.id}`),
        );
        currentTeam.set(teamList.find((t) => t.id === loadedRoster.teamId));
        roster.loadRoster(`savedRoster${savedRoster.id}`);
        savedRosterIndex.updateCurrentIndex(savedRoster.id);
        toggleLoad();
    };
</script>

<style lang="scss">
    @import '../styles/colour';
    button {
        border-radius: 10px;
        background-color: white;
        color: $secondary-colour;
        padding: 10px;
        margin: 5px;
        border: 2px solid $secondary-colour;

        &.selected {
            background-color: $secondary-colour;
            color: white;
            border-color: $secondary-colour;
        }

        &.cancel {
            color: $main-colour;
            border-color: $main-colour;
        }
    }

    .button-container {
        border-radius: 10px;
        background: $secondary-background-colour;
        padding: 10px;
    }
</style>

{#if !$teamLoadOpen}
    <button
        class:cancel={showTeams}
        class="new-team"
        on:click={() => toggleTeam()}>{!showTeams ? 'New Team' : 'Cancel'}
    </button>
{/if}

{#if $savedRosterIndex.index.length > 0 && !showTeams}
    <button
        class="load-team-button"
        class:cancel={$teamLoadOpen}
        on:click={() => toggleLoad()}>{!$teamLoadOpen ? 'Load Team' : 'Cancel'}</button>
{/if}

{#if showTeams && !$teamLoadOpen}
    <div class="button-container" transition:slide>
        {#each sortedTeam() as team}
            <button
                class="team-button"
                class:selected={$currentTeam.id === team.id}
                on:click={() => newTeam(team.id)}>{team.name}</button>
        {/each}
    </div>
    <button
        class="create-team"
        transition:slide
        on:click={() => createTeam()}>Create</button>
{/if}

{#if $teamLoadOpen}
    <div class="button-container" transition:slide>
        {#each $savedRosterIndex.index as savedRoster}
            <button
                class="saved-team-button"
                on:click={() => loadTeam(savedRoster)}>{savedRoster.name}</button>
        {/each}
    </div>
{/if}
