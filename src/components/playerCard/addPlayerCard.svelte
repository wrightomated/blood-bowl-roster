<script lang="ts">
    import type { Player } from '../../models/player.model';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../materialButton.svelte';

    export let playerTypes: Player[];
    let selected: Player;
    let newName: string = '';

    const addPlayer = () => {
        roster.addPlayer({
            playerName: newName,
            player: { ...selected },
            alterations: { spp: 0, ni: 0 },
        });
        newName = '';
    };
</script>

<div class="player-card">
    <div class="header">
        <div class="left-align">
            <h3>
                <input
                    aria-label="New Player Name"
                    placeholder="New Player Name"
                    bind:value={newName}
                    class="name-input"
                />
            </h3>
        </div>

        <div class="position left-align">
            <select aria-label="New Player Position" bind:value={selected}>
                {#each playerTypes as playerType}
                    <option value={playerType}>
                        {playerType.position}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <div class="add-sign-container">
        <button class="add-sign" on:click={addPlayer} title="Add New Player"
            ><i class="material-icons icon">add_circle</i></button
        >
    </div>
</div>

<style lang="scss">
    @import '../../styles/colour';
    .player-card {
        border-radius: 25px;
        position: relative;
        min-width: 300px;
        max-width: 600px;
        border: 2px solid $main-colour;
    }
    .header {
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border-radius: 25px;
        border-radius: 20px 20px 0 0;
        border: 2px solid $main-colour;
        background-color: $main-colour;
        h3 {
            margin: 0;
            font-size: 16px;
            color: white;
        }

        input {
            padding: 0;
            color: white;
            &::placeholder {
                color: #ddd;
            }
        }
        select {
            margin: 6px 0;
            background-color: $main-colour;
            color: white;
            font-size: 16px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23FFFFFF'><polygon points='0,0 100,0 50,50'/></svg>")
                no-repeat;
            background-size: 12px;
            background-position: 97% 72%;
            padding-right: 20px;
            background-repeat: no-repeat;
        }
    }
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
    }
    input {
        border: 0;
        border-radius: 0;
        background: none;
    }
    .icon {
        font-size: 60px;
    }
    .add-sign-container {
        text-align: center;
        margin: 20px 0;
    }
</style>
