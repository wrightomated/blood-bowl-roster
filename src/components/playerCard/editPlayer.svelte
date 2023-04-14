<script lang="ts">
    import { advancementTitle } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import PlayerAdvancement from '../playerAdvancement/playerAdvancement.svelte';
    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import ExtendedDetails from './extendedDetails.svelte';
    import Injury from './injury.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    let mainComponent = ExtendedDetails;

    const componentMap = {
        details: ExtendedDetails,
        advancements: PlayerAdvancement,
        injuries: Injury,
    };

    const options = ['details', 'advancements', 'injuries'];
    function selected(option: string) {
        mainComponent = componentMap[option];
    }
</script>

{#if rosterPlayer.alterations?.advancements}
    <h4>
        Blood Bowl {advancementTitle[rosterPlayer.alterations.advancements]}
    </h4>
{/if}

<ToggleButton {options} {selected} />
<!-- <span class="material-symbols-outlined"> info </span> -->
<!-- <button><IconWithCaption icon="info" caption="details" /></button> -->

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
