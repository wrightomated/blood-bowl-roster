<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { currentTeam } from '../store/currentTeam.store';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';

    let selectedId: number;

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers,
        $currentTeam,
        $roster.players.map((x) => x.player.id)
    ).map((x, _, a) => {
        let displayName = x.position;
        if (x?.twoForOne) {
            const other = a.find((p) => p.id === x?.twoForOne);
            displayName = x.position + ' & ' + other.position;
        }
        return { ...x, displayName: displayName };
    });

    const getSelected = (id) => {
        return starPlayers.starPlayers.find((x) => x.id === id);
    };

    const addStarPlayer = () => {
        const addTwo = getSelected(selectedId).twoForOne;
        if ($roster.players.length + 1 > 16) {
            return;
        }

        roster.addPlayer({
            player: getSelected(selectedId),
            playerName: getSelected(selectedId).position,
            starPlayer: true,
        });

        if (addTwo) {
            const twoForPlayer = starPlayers.starPlayers.find(
                (x) => x.id === getSelected(selectedId).twoForOne
            );
            roster.addPlayer({
                player: twoForPlayer,
                playerName: twoForPlayer.position,
                starPlayer: true,
            });
        }
        setTimeout(() => {
            // This is a hack until I work out why the binding isn't updated when the options array change
            selectedId = filteredStarPlayers?.[0]?.id;
        }, 2);
    };
</script>

<tr class="no-print">
    <td class="left-align">
        Star Player:
        {#if filteredStarPlayers.length > 0}
            <select
                aria-label="star player name"
                class="star-player-select"
                bind:value={selectedId}
            >
                {#each filteredStarPlayers as star (star.id)}
                    <option value={star.id}>{star.displayName}</option>
                {/each}
            </select>
        {/if}
    </td>
    <td
        >{$roster.players.filter((x) => x.starPlayer && !x.deleted).length} / 2</td
    >
    <td>{getSelected(selectedId)?.cost || 0},000</td>
    <td>
        {#if filteredStarPlayers.length > 0 && $roster.players.filter((x) => x.starPlayer && !x.deleted).length < 2}
            <div class="add-star">
                <MaterialButton
                    hoverText="Add star player"
                    symbol="add_circle"
                    clickFunction={addStarPlayer}
                />
            </div>
        {/if}
    </td>
</tr>

<style lang="scss">
    .star-player-select {
        font-size: 16px;
    }
    .left-align {
        text-align: left;
    }
    .add-star {
        display: flex;
    }
    @media print {
        .no-print {
            display: none;
        }
    }
</style>
