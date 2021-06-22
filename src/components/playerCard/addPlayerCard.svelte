<script lang="ts">
    import type { Player } from '../../models/player.model';
    import { currentTeam } from '../../store/currentTeam.store';
    import { roster } from '../../store/teamRoster.store';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player;
    let newName: string = '';
    let amount: number = 1;

    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === selected?.id || 0
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === selected?.id)?.max || 0;

    const addPlayers = () => {
        const numberOfPlayers =
            !amount || amount < 1
                ? 1
                : amount > maxOfPlayerType
                ? maxOfPlayerType
                : amount;
        for (let i = 0; i < numberOfPlayers; i++) {
            roster.addPlayer(
                {
                    playerName: newName,
                    player: { ...selected },
                    alterations: { spp: 0, ni: 0 },
                },
                numberOfPlayers === 1 ? index : undefined
            );
            newName = '';
        }
        amount = 1;
    };
</script>

<div class="player-card">
    <div class="header">
        <div class="player-number">{index + 1}</div>
        <div>
            <h3>
                <input
                    aria-label="New Player Name"
                    placeholder="New Player Name"
                    bind:value={newName}
                    class="name-input"
                />
            </h3>
        </div>

        <div class="player-details">
            <input
                aria-label="Amount"
                type="number"
                bind:value={amount}
                min="0"
                max={maxOfPlayerType - numberOfPlayerType}
            />
            x
            <select aria-label="New Player Position" bind:value={selected}>
                {#each playerTypes as playerType}
                    <option value={playerType}>
                        {playerType.position}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="player-card__content">
        <button class="add-sign" on:click={addPlayers} title="Add New Player"
            ><i class="material-icons icon">add_circle</i></button
        >
    </div>
</div>

<style lang="scss">
    @import '../../styles/colour';
    @import '../../styles/font';
    .player-card {
        border-radius: 25px;
        position: relative;
        min-width: 300px;
        max-width: 600px;
        border: 2px solid $secondary-background-colour;
        height: 100%;
        background-color: $secondary-background-colour;

        &__content {
            min-height: 100px;
        }
    }
    .header {
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border-radius: 25px;
        border-radius: 20px 20px 0 0;
        border: 2px solid $secondary-background-colour;
        background-color: $secondary-background-colour;
        h3 {
            margin: 0;
            margin-bottom: 8px;
            font-size: 16px;
            color: #333;
        }

        input {
            padding: 0;
            color: #555;
            &::placeholder {
                color: #555;
            }
        }
        select {
            margin: 6px 0;
            background-color: $secondary-colour;
            color: #333;
            font-size: 16px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23333333'><polygon points='0,0 100,0 50,50'/></svg>")
                no-repeat;
            background-size: 12px;
            background-position: 97% 72%;
            padding-right: 20px;
            background-repeat: no-repeat;
            border-color: #333;
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
    .add-sign {
        position: absolute;
        top: 50%;
        left: calc(50% - 30px);
        height: 60px;
        width: 60px;
    }
    .icon {
        font-size: 60px;
        color: #555;
    }
    .player-details {
        color: #333;
        input {
            border: 1px solid #333;
            font-size: 16px;
            width: 40px;
            height: 32px;
            text-align: center;
        }
    }
    .player-number {
        width: 25px;
        line-height: 25px;
        border-radius: 50%;
        font-family: $display-font;
        text-align: center;
        font-size: 14px;
        right: 10px;
        top: 10px;
        background-color: white;
        color: #555;
        position: absolute;
    }
</style>
