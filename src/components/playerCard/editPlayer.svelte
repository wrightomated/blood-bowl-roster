<script lang="ts">
    import { advancementTitle } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import PlayerAdvancement from '../playerAdvancement/playerAdvancement.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
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

    const options = ['advancements', 'details', 'injuries'];
    function selected(option: string) {
        mainComponent = componentMap[option];
    }
</script>

{#if rosterPlayer.alterations?.advancements}
    <h4>
        {advancementTitle[rosterPlayer.alterations.advancements]} Player
    </h4>
{/if}

<ToggleButton {options} {selected} />

<div class="edit-player">
    <svelte:component this={mainComponent} {index} {rosterPlayer} />
</div>

<style lang="scss">
    .edit-player {
        margin-top: 16px;
    }
    h4 {
        margin: 4px 0;
    }
</style>
