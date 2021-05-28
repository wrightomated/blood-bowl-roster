<script lang="ts">
    import type { Player } from '../models/player.model';

    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player;
    let newName: string = '';

    const addPlayer = () => {
        roster.addPlayer(
            {
                playerName: newName,
                player: { ...selected },
                alterations: { spp: 0, ni: 0 },
            },
            index,
        );
        newName = '';
    };
</script>

<tr class="add-player-row">
    <td>{index + 1 || ''}</td>
    <td class="left-align">
        <input
            aria-labelledby="name-header"
            placeholder="Player Name"
            bind:value={newName}
            class="name-input"
        />
    </td>
    <td class="left-align">
        <MaterialButton
            hoverText="Add new player"
            symbol="add_circle"
            clickFunction={addPlayer}
        />
    </td>
    <td class="position left-align">
        <select aria-labelledby="position-header" bind:value={selected}>
            {#each playerTypes as playerType}
                <option value={playerType}>
                    {playerType.position}
                </option>
            {/each}
        </select>
    </td>
    <td />
    <td />
    <td />
    <td />
    <td />
    <td />
    <td />
    <td />
    {#if $roster.mode !== 'exhibition'}
        <td />
        <td />
        <td />
    {/if}
    <td />
</tr>

<style lang="scss">
    .left-align {
        text-align: left;
    }
    input {
        border: 0;
        border-radius: 0;
        background: none;
    }
    @media print {
        .add-player-row {
            display: none;
        }
    }
</style>
