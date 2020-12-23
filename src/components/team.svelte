<script lang="ts">
    import { roster } from "../store/teamRoster";
    import { playerCatalogue } from "../data/players.data";
    import { teamData } from "../data/teams.data";
    import type { Team } from "../models/team.model";
    import PlayerRow from "./player.svelte";
    import RosterRow from "./rosterPlayer.svelte";
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

<style>
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    :global(td, tr) {
        padding: 10px;
        text-align: left;
        border: 1px solid #ccc;
    }
    :global(tr:nth-of-type(even)) {
        background: #eee;
    }
    thead {
        background-color: #970f0c;
        color: white;
        text-transform: uppercase;
        /* blue #193f80 */
    }
    thead td {
        padding: 4px;
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
                        <td>Position</td>
                        <td>QTY</td>
                        <td>Cost</td>
                        <td>MA</td>
                        <td>ST</td>
                        <td>AG</td>
                        <td>PA</td>
                        <td>AV</td>
                        <td>Skills</td>
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

    <div />
    <p>Team Roster</p>
    <table>
        <thead>
            <tr>
                <td />
                <td>Name</td>
                <td>Position</td>
                <td>MA</td>
                <td>ST</td>
                <td>AG</td>
                <td>PA</td>
                <td>AV</td>
                <td>Skills</td>
                <td>Hiring Fee</td>
                <td>Unspent Spp</td>
                <td>Mng</td>
                <td>Ni</td>
                <td>TR</td>
                <td>Current Value</td>
            </tr>
        </thead>
        <tbody>
            {#each $roster.players as rosterPlayer, index}
                <RosterRow {index} player={rosterPlayer.player} />
            {/each}
            <tr />
        </tbody>
    </table>
    {#if $roster.players.length < 16}<button>Add Player</button>{/if}
    <div>
        Total value:
        {$roster.players.map((x) => x.player.cost).reduce((a, b) => a + b, 0)}
    </div>
{/if}
