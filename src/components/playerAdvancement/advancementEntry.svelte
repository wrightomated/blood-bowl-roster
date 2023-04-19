<script lang="ts">
    import { getSkill } from '../../helpers/getSkill';
    import type { SpecificAdvancement } from '../../models/roster.model';
    import MaterialButton from '../uiComponents/materialButton.svelte';

    export let advancement: SpecificAdvancement;
    export let deleteFunction: () => void;

    $: advancementValue = !isNaN(+advancement.advancementValue)
        ? getSkill(+advancement.advancementValue)
        : advancement.advancementValue;
</script>

<div>
    {advancementValue}
</div>
<div class="advancement-details">
    {advancement.type}
    {advancement.sppCost} SPP
</div>
<!-- <div> -->
<div class="advancement-controls">
    <MaterialButton
        hoverText="Remove advancement"
        symbol="delete"
        clickFunction={deleteFunction}
    />
</div>

<!-- </div> -->
<style>
    div {
        flex: 1;
    }
    .advancement-controls {
        display: flex;
        justify-content: flex-end;
    }
    .advancement-details {
        text-align: center;
    }
</style>
