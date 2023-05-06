<script lang="ts">
    import { advancementTitle } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import PlayerAdvancement from '../playerAdvancement/playerAdvancement.svelte';
    import ExtendedDetails from './extendedDetails.svelte';
    import Injury from './injury.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

    let mainComponent = PlayerAdvancement;

    const componentMap = {
        advancements: PlayerAdvancement,
        records: ExtendedDetails,
        injuries: Injury,
    };
    const options = ['advancements', 'injuries', 'records'];

    let selectedOption = options[0];
    function selected(option: string) {
        selectedOption = option;
        mainComponent = componentMap[option];
    }
    const optionMap = {
        advancements: {
            title: 'Player advancements',
            icon: 'elevator',
            caption: 'Advancements',
            show: () => true,
        },
        injuries: {
            title: 'Player injuries',
            icon: 'health_and_safety',
            caption: 'Injuries',
            show: () =>
                $roster.mode === 'league' && $roster.format !== 'sevens',
        },
        records: {
            title: 'Player records',
            icon: 'receipt_long',
            caption: 'Player records',
            show: () => !!rosterPlayer?.alterations?.gameRecords,
        },
    };
</script>

<section class="edit-player-container">
    <header class="header">
        <div class="button-container">
            {#each options as option}
                {#if optionMap[option].show()}
                    <button
                        class="option-button"
                        class:option-button--selected={selectedOption ===
                            option}
                        on:click={() => selected(option)}
                    >
                        <i
                            class="material-symbols-outlined icon"
                            title={optionMap[option].title}
                            >{optionMap[option].icon}</i
                        >
                    </button>
                {/if}
            {/each}
        </div>
        <!-- <MaterialButton symbol="cancel"></MaterialButton> -->
    </header>
    <div class="player-info">
        <p>
            {#if rosterPlayer.playerName}
                {rosterPlayer.playerName}
            {:else}
                {rosterPlayer.player.position}
            {/if}
            {rosterPlayer.alterations.playerNumber}
        </p>
        <p>
            {#if rosterPlayer.alterations.advancements}
                {advancementTitle[rosterPlayer.alterations.advancements]}
                {#each Array(rosterPlayer.alterations.advancements) as _}
                    <i
                        class="material-symbols-outlined player-info__star no-transition"
                        >star</i
                    >
                {/each}
            {/if}
        </p>
    </div>

    <div class="edit-player-content">
        <h3 class="option-title">{selectedOption}</h3>
        <div class="edit-player">
            <svelte:component this={mainComponent} {index} />
        </div>
    </div>
</section>

<style lang="scss">
    .header {
        border-radius: 20px 20px 0 0;
        background-color: var(--secondary-colour);
    }
    .edit-player-container {
        border-radius: 25px;
        border: var(--secondary-border);
    }
    .edit-player-content {
        padding: 0 12px 12px 12px;
    }
    .button-container {
        display: flex;
        justify-content: center;
        gap: 12px;
        padding: 6px;
        border-bottom: 2px solid var(--secondary-colour);
    }
    .option-title {
        text-transform: capitalize;
    }
    .option-button {
        background: none;
        border: none;
        margin: 0;
        font-family: var(--display-font);
        cursor: pointer;

        .icon {
            font-size: 32px;
            color: var(--secondary-background-colour);
        }
        &--selected {
            color: var(--white);
            .icon {
                text-decoration: underline;
            }
        }
    }
    .edit-player {
        margin-top: 16px;
    }
    .player-info {
        text-align: center;
        font-size: 14px;
        font-family: var(--display-font);
        margin-top: 12px;
        &__star {
            font-size: 12px;
        }
        p {
            margin: 0;
        }
    }
</style>
