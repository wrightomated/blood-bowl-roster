<script lang="ts">
    import { advancementTitle } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import PlayerAdvancement from '../playerAdvancement/playerAdvancement.svelte';
    import Button from '../uiComponents/button.svelte';
    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import ExtendedDetails from './extendedDetails.svelte';
    import Injury from './injury.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    let mainComponent = PlayerAdvancement;

    const componentMap = {
        advancements: PlayerAdvancement,
        details: ExtendedDetails,
        injuries: Injury,
    };

    let options = ['advancements', 'details'];
    if ($roster.format !== 'sevens' && $roster.mode === 'league') {
        options.push('injuries');
    }
    let selectedOption = options[0];
    function selected(option: string) {
        selectedOption = option;
        mainComponent = componentMap[option];
    }
    const optionMap = {
        advancements: {
            title: 'Advancements',
            icon: 'self_improvement',
            caption: 'Advancements',
        },
        details: {
            title: 'Player details',
            icon: 'info',
            caption: 'Info',
        },
        injuries: {
            title: 'Injuries',
            icon: 'health_and_safety',
            caption: 'Injuries',
        },
    };
</script>

<div class="button-container">
    {#each options as option}
        <!-- <button on:click={() => selected(option)}> -->
        <button
            class="option-button"
            class:option-button--selected={selectedOption === option}
            on:click={() => selected(option)}
        >
            <IconWithCaption {...optionMap[option]} />
        </button>

        <!-- </button> -->
    {/each}
</div>

{#if rosterPlayer.alterations?.advancements}
    <h4>
        {advancementTitle[rosterPlayer.alterations.advancements]} Player
    </h4>
{/if}

<div class="edit-player">
    <svelte:component this={mainComponent} {index} {rosterPlayer} />
</div>

<style lang="scss">
    .button-container {
        // center the toggle buttons
        display: flex;
        justify-content: center;
        // button {
        //     flex: 1;

        // }
    }
    .option-button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
    }
    .edit-player {
        margin-top: 16px;
    }
    h4 {
        margin: 4px 0;
    }
</style>
