<script lang="ts">
    import { gameSettings } from '../../store/gameSettings.store';
    import { modalState } from '../../store/modal.store';

    import { roster } from '../../store/teamRoster.store';

    import MaterialButton from '../uiComponents/materialButton.svelte';
    import DeletePlayerWarning from './deletePlayerWarning.svelte';

    export let index: number;
    $: rosterPlayer = $roster.players[index];

    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };

    function removePlayer() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: DeletePlayerWarning,
            componentProps: {
                index,
                rosterPlayer,
            },
        });
    }
    function duplicatePlayer() {
        roster.duplicatePlayer(index);
    }
</script>

<div class="flex-container no-print">
    {#if index > 0}
        <MaterialButton
            hoverText="Move player up"
            symbol="arrow_circle_up"
            clickFunction={moveUp}
        />
    {:else if $roster.players.length > 1}
        <i class="material-symbols-outlined no-op no-transition no-print"
            >block</i
        >
    {/if}
    {#if index < $roster.players.length - 1}
        <MaterialButton
            hoverText="Move player down"
            symbol="arrow_circle_down"
            clickFunction={moveDown}
        />
    {:else if $roster.players.length > 1}
        <i class="material-symbols-outlined no-op no-transition no-print"
            >block</i
        >
    {/if}
    <MaterialButton
        cyData={`player-${index}-remove`}
        hoverText="Remove player"
        symbol="delete_forever"
        clickFunction={removePlayer}
    />
    {#if !rosterPlayer.starPlayer && $roster.players.length < $gameSettings.maxPlayers}
        <MaterialButton
            hoverText="Duplicate player"
            symbol="group_add"
            clickFunction={duplicatePlayer}
        />{/if}
</div>

<style lang="scss">
    .flex-container {
        display: flex;
    }
    .no-op {
        color: #aaa;
    }
</style>
