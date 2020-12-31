<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { currentTeam } from '../store/currentTeam.store';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import type { StarPlayer } from '../models/player.model';

    let selected: StarPlayer;

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers,
        $currentTeam,
        $roster.players.map((x) => x.player.id),
    ).map((x, _, a) => {
        let displayName = x.position;
        if (x?.twoForOne) {
            const other = a.find((p) => p.id === x?.twoForOne);
            displayName = x.position + ' & ' + other.position;
        }
        return { ...x, displayName: displayName };
    });

    const addStarPlayer = () => {
        roster.addPlayer({
            player: selected,
            playerName: selected.position,
            starPlayer: true,
        });
        if (selected.twoForOne) {
            const twoForPlayer = starPlayers.starPlayers.find(
                (x) => x.id === selected.twoForOne,
            );
            roster.addPlayer({
                player: twoForPlayer,
                playerName: twoForPlayer.position,
                starPlayer: true,
            });
        }
    };
</script>

<style lang="scss">
    .left-align {
        text-align: left;
    }
</style>

<tr>
    <td class="left-align">
        Star Player:
        <select aria-label="star player name" bind:value={selected}>
            {#each filteredStarPlayers as star}
                <option value={star}>{star.displayName}</option>
            {/each}
        </select>
    </td>
    <td>0 / 2</td>
    <td>{selected?.cost || 0},000</td>
    <td>
        <MaterialButton symbol="add_circle" clickFunction={addStarPlayer} />
    </td>
</tr>
