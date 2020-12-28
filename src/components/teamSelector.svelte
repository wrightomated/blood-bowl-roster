<script lang="ts">
    import { slide } from "svelte/transition";

    import type { Team } from "../models/team.model";
    import { currentTeam } from "../store/currentTeam.store";
    import { roster } from "../store/teamRoster.store";
    import { teamSelectionOpen } from "../store/teamSelectionOpen.store";
    import { savedRosterIndex } from "../store/saveDirectory.store";
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

    const createTeam = () => {
        savedRosterIndex.newId();
        roster.reset({
            teamId: $currentTeam.id,
            teamType: $currentTeam.name,
        });
        teamSelectionOpen.set(false);
    };
</script>

<style lang="scss">
    @import "../styles/colour";
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

<button
    class={showTeams ? 'cancel' : ''}
    on:click={() => toggleTeam()}>{!showTeams ? 'New Team' : 'Cancel'}
</button>

{#if showTeams}
    <div class="button-container" transition:slide>
        {#each sortedTeam() as team}
            <button
                class:selected={$currentTeam.id === team.id}
                on:click={() => newTeam(team.id)}>{team.name}</button>
        {/each}
    </div>
    <button transition:slide on:click={() => createTeam()}>Create</button>
{/if}
