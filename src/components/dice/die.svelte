<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let faces: number;
    export let defaultDisplay = undefined;
    export let rolls: number = 1;
    export let result: number = 0;
    let dice;

    $: display =
        result > 0 ? result : defaultDisplay || `${rolls || ''}d${faces}`;

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
        dice.addEventListener('animationend', removeRoll);

        result = rollMultiple(rolls, faces);
        dice.classList.add('roll');
        rolled();
    }

    function rolled() {
        dispatch('rolled', {
            result,
        });
    }

    function removeRoll() {
        dice.classList.remove('roll');
    }
</script>

<button class="rounded-button" type="button" on:click={rollAll} bind:this={dice}
    >{display}</button
>
