<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { inducementAndStarsInRoster } from '../../store/currentInducements.store';
    import Pill from '../uiComponents/pill.svelte';

    // $: formattedInducements = $inducementAndStarsInRoster
    //     .map((x) => `${x[0]}${x[1] ? ` ${x[1]}` : ''}`)
    //     .join(',');
</script>

<div class="body" transition:slide={{ duration: 200, easing: quintOut }}>
    <!-- <div>League Match</div> -->

    <div>Petty Cash: 30k</div>
    <div>League Points: 6</div>
    <div>Fan factor: 2</div>
    <!-- TODO: Make inducement component -->
    <div>Inducements:</div>
    {#each $inducementAndStarsInRoster as i}
        <div>{i[0]}</div>
    {/each}
</div>