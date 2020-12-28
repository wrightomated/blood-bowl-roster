<script lang="ts">
    import { roster } from "../store/teamRoster.store";
    import { playerCatalogue } from "../data/players.data";
    import { teamData } from "../data/teams.data";
    import { currentTeam } from "../store/currentTeam.store";
    import PlayerRow from "./player.svelte";
    import Roster from "./roster.svelte";
    import RerollsTable from "./rerollsTable.svelte";
    import TeamSelector from "./teamSelector.svelte";
    import { savedRosterIndex } from "../store/saveDirectory.store";
    import MaterialButton from "./materialButton.svelte";
    import { teamSelectionOpen } from "../store/teamSelectionOpen.store";

    const teamList = teamData.teams;

    $: selectedTeam = $currentTeam;

    let showAvailablePlayers = true;

    const playerById = (id?: number) => {
        return playerCatalogue.players.find((x) => x.id === id);
    };

    const togglePlayers = () => {
        showAvailablePlayers = !showAvailablePlayers;
    };

    roster.subscribe((x) => {
        localStorage.setItem("roster", JSON.stringify(x));
    });

    currentTeam.subscribe((x) => {
        localStorage.setItem("selectedTeam", JSON.stringify(x));
    });

    savedRosterIndex.subscribe((x) => {
        localStorage.setItem("rosterIndex", JSON.stringify(x));
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
    .header-container {
        display: flex;
        align-items: center;
    }
</style>

<TeamSelector {teamList} />

{#if selectedTeam}
    <div class="header-container">
        <h2>{selectedTeam.name} Team Players</h2>
        <MaterialButton
            symbol={showAvailablePlayers ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={togglePlayers} />
    </div>
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
    {#if !$teamSelectionOpen}
        <Roster
            playerTypes={selectedTeam.players.map((x) => playerById(x.id))} />
        <RerollsTable {selectedTeam} />
    {/if}
{/if}
