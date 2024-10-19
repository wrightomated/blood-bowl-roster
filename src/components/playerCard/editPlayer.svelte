<script lang="ts">
    import { advancementTitle } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import PlayerAdvancement from '../playerAdvancement/playerAdvancement.svelte';
    import HeaderModalContainer from '../uiComponents/headerModalContainer.svelte';
    import ExtendedDetails from './extendedDetails.svelte';
    import Injury from './injury.svelte';

    export let index: number;

    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

    const options = ['advancements', 'injuries', 'records'];

    const optionMap = {
        advancements: {
            title: 'Player advancements',
            icon: 'elevator',
            caption: 'Advancements',
            show: () => true,
            component: PlayerAdvancement,
            componentProps: { index },
        },
        injuries: {
            title: 'Player injuries',
            icon: 'health_and_safety',
            caption: 'Injuries',
            show: () =>
                $roster.mode === 'league' && $roster.format !== 'sevens',
            component: Injury,
            componentProps: { index },
        },
        records: {
            title: 'Player records',
            icon: 'receipt_long',
            caption: 'Player records',
            show: () => !!rosterPlayer?.alterations?.gameRecords,
            component: ExtendedDetails,
            componentProps: { index },
        },
    };
</script>

<HeaderModalContainer {options} {optionMap}>
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
                {#each Array(rosterPlayer?.alterations?.advancements) as _}
                    <i
                        class="material-symbols-outlined player-info__star no-transition"
                        >star</i
                    >
                {/each}
            {/if}
        </p>
    </div>
</HeaderModalContainer>

<style lang="scss">
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
