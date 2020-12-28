<script lang="ts">
    import { starPlayers } from "../data/starPlayer.data";
    import { currentTeam } from "../store/currentTeam.store";
    import StarPlayerRow from "./starPlayerRow.svelte";

    $: filteredStarPlayers = starPlayers.starPlayers
        .filter(
            (x) =>
                x.playsFor.length === 0 ||
                x.playsFor.some((a) => $currentTeam.specialRules.includes(a))
        )
        .filter(
            (p) =>
                !p?.doesNotPlayFor ||
                p.doesNotPlayFor.every(
                    (a) => !$currentTeam.specialRules.includes(a)
                )
        );
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <td class="left-align">Name</td>
                <td>Cost</td>
                <td>MA</td>
                <td>ST</td>
                <td>AG</td>
                <td>PA</td>
                <td>AV</td>
                <td class="skills-header left-align">Skills</td>
                <td>Special Rules</td>
            </tr>
        </thead>
        <tbody>
            {#each filteredStarPlayers as starPlayer}
                <StarPlayerRow {starPlayer} />
            {/each}
        </tbody>
    </table>
</div>
