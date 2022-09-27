<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Button from '../uiComponents/button.svelte';

    const dispatch = createEventDispatcher();

    export let faces: number;
    export let rolls: number = 1;
    export let result: number = 0;

    $: display = result > 0 ? result : `${rolls || ''}d${faces}`;

    function roll(sides: number) {
        return Math.floor(Math.random() * Math.floor(sides)) + 1;
    }

    function rollMultiple(amount: number, sides: number) {
        let total = 0;
        for (let index = 0; index < amount; index++) {
            total += roll(sides);
        }
        return total;
    }

    function rollAll() {
        result = rollMultiple(rolls, faces);
        rolled();
    }

    function rolled() {
        dispatch('rolled', {
            result,
        });
    }
</script>

{#key display}
    <Button clickFunction={rollAll}>{display}</Button>
    <!-- <button class="die" type="button" on:click={rollAll}>{display}</button> -->
{/key}
