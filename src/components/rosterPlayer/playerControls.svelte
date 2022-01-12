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
    const removePlayer = (firePlayer: boolean) => {
        removeTwoForOne(firePlayer) || roster.removePlayer([index], firePlayer);
    };
    const removeTwoForOne = (firePlayer: boolean) => {
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
    };
</script>

<div class="flex-container">
    {#if index > 0}
        <MaterialButton
            hoverText="Move player up"
            symbol="arrow_circle_up"
            clickFunction={moveUp}
        />
    {/if}
    {#if index < $roster.players.length - 1}
        <MaterialButton
            hoverText="Move player down"
            symbol="arrow_circle_down"
            clickFunction={moveDown}
        />
    {/if}
    <MaterialButton
        hoverText="Remove player"
        symbol="delete_forever"
        clickFunction={() => removePlayer(false)}
    />
    {#if $roster.mode === 'league'}
        <MaterialButton
            hoverText="Fire player (no refund)"
            symbol="local_fire_department"
            clickFunction={() => removePlayer(true)}
        />
    {/if}
</div>

<style lang="scss">
    .flex-container {
        display: flex;
    }
</style>
