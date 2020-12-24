<script lang="ts">
    import { roster } from "../store/teamRoster.store";
    import { playerCatalogue } from "../data/players.data";
    import { teamData } from "../data/teams.data";
    import type { Team } from "../models/team.model";
    import PlayerRow from "./player.svelte";
    import Roster from "./roster.svelte";
    import RerollsTable from "./rerollsTable.svelte";

    // import { PlayerCatalogue } from "../models/player.model";
    // const teams = teamIndex.index;
    const teamList = teamData.teams;

    let selectedTeam: Team;
    // let selectedTeamInfo: Team;
    let showAvailablePlayers = true;

    // roster.subscribe(
    //     (x) => (selectedTeam = teams.find((j) => j.id === x.teamId))
    // );

    const newTeam = (index: number) => {
        selectedTeam = teamList.find((x) => x.id === index);
        // selectedTeamInfo = teamList.find((x) => x.id === selectedTeam.id);
    };

    const playerById = (id?: number) => {
        return playerCatalogue.players.find((x) => x.id === id);
    };

    const togglePlayers = () => {
        showAvailablePlayers = !showAvailablePlayers;
    };

    roster.subscribe((x) => {
        localStorage.setItem("roster", JSON.stringify(x));
    });
</script>

<style lang="scss">
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    .skills-header {
        min-width: 100px;
    }
    .left-align {
        text-align: left;
    }
</style>

{#each teamList as team}
    <button on:click={(e) => newTeam(team.id)}>{team.name}</button>
{/each}

<button on:click={() => roster.reset()}>Clear</button>

{#if selectedTeam}
    <h2>{selectedTeam.name}</h2>
    <p>
        Available Players
        <button
            on:click={togglePlayers}>{showAvailablePlayers ? 'Hide' : 'Show'}</button>
    </p>
    {#if showAvailablePlayers}
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <td>QTY</td>
                        <td class="left-align">Position</td>
                        <td>Cost</td>
                        <td>MA</td>
                        <td>ST</td>
                        <td>AG</td>
                        <td>PA</td>
                        <td>AV</td>
                        <td class="skills-header left-align">Skills</td>
                        <td>Primary</td>
                        <td>Secondary</td>
                    </tr>
                </thead>
                <tbody>
                    {#each selectedTeam.players as teamPlayer}
                        <PlayerRow
                            max={teamPlayer.max}
                            player={playerById(teamPlayer.id)} />
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
    <Roster playerTypes={selectedTeam.players.map((x) => playerById(x.id))} />
    <div />
    <RerollsTable {selectedTeam} />
{/if}
