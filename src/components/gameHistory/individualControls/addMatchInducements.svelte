<script lang="ts">
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
    <MatchInducements />
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
