<script lang="ts">
    import type { StarPlayer } from '../../models/player.model';

    import { roster } from '../../store/teamRoster.store';

    import MaterialButton from '../uiComponents/materialButton.svelte';

    export let index: number;
    $: rosterPlayer = $roster.players[index];

    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };

    function removePlayer() {
        const firePlayer = $roster?.leagueRosterStatus === 'commenced';
        removeTwoForOne(firePlayer) || roster.removePlayer([index], firePlayer);
    }

    function removeTwoForOne(firePlayer: boolean) {
        if (rosterPlayer.starPlayer) {
            const twoForOne = (rosterPlayer.player as StarPlayer).twoForOne;
            const tfoIndex = $roster.players.findIndex(
                (p) => p.player.id === twoForOne
            );
            if (twoForOne) {
                roster.removePlayer([index, tfoIndex], firePlayer);
                return true;
            }
        }
        return false;
    }
</script>

<div class="flex-container">
    {#if index > 0}
        <MaterialButton
            hoverText="Move player up"
            symbol="arrow_circle_up"
            clickFunction={moveUp}
        />
    {:else}
        <i class="material-icons no-op">block</i>
    {/if}
    {#if index < $roster.players.length - 1}
        <MaterialButton
            hoverText="Move player down"
            symbol="arrow_circle_down"
            clickFunction={moveDown}
        />
    {:else}
        <i class="material-icons no-op">block</i>
    {/if}
    <MaterialButton
        cyData={`player-${index}-remove`}
        hoverText="Remove player"
        symbol="delete_forever"
        clickFunction={() => removePlayer()}
    />
</div>

<style lang="scss">
    .flex-container {
        display: flex;
    }
    .no-op {
        color: #aaa;
    }
</style>
