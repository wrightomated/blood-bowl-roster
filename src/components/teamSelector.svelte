<script lang="ts">
    import { slide } from "svelte/transition";

    import type { Team } from "../models/team.model";
    import { currentTeam } from "../store/currentTeam.store";
    import { roster } from "../store/teamRoster.store";

    export let teamList: Team[];

    let showTeams: boolean = false;

    const sortedTeam = () => {
        return teamList.sort((a, b) => a.name.localeCompare(b.name));
    };

    const newTeam = (index: number) => {
        currentTeam.set(teamList.find((x) => x.id === index));
        roster.reset({
            teamId: index,
            teamType: teamList.find((x) => x.id === index).name,
        });
    };

    const toggleTeam = () => {
        showTeams = !showTeams;
    };

    const clear = () => {
        roster.reset();
        // currentTeam.set({} as Team);
    };
</script>

<style lang="scss">
    .button-container {
        // display: flex;
    }

    button {
        border-radius: 10px;
        background-color: #1a3f7f;
        color: white;
        padding: 10px;
        margin: 5px;
        // border: 2px solid #1a3f7f;
    }
</style>

<button on:click={() => toggleTeam()}>{!showTeams ? 'New Team' : 'Cancel'}
</button>
<button on:click={() => clear()}>Clear</button>

{#if showTeams}
    <div class="button-container" transition:slide>
        {#each sortedTeam() as team}
            <button on:click={() => newTeam(team.id)}>{team.name}</button>
        {/each}
    </div>
{/if}
