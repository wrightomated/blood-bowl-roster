<script lang="ts">
    import { inducementAndStarsInRoster } from '../../../store/currentInducements.store';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import MatchInducements from './matchInducements.svelte';
</script>

<div
    class="inducements"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <!-- <div class="inducements"> -->
    <div>You can safely return to your roster to edit.</div>
    <MatchInducements inducements={$inducementAndStarsInRoster} />
    <!-- </div> -->
    <!-- <button>close</button> -->
</div>

<style>
    /* button {
        margin-bottom: 16px;
    } */

    .inducements {
        margin: 16px 0;
    }
</style>
