<script lang="ts">
    export let value: number;
</script>

<label for="petty-cash">Petty Cash <em>(K)</em>: </label>
<input type="number" autocomplete="off" id="petty-cash" step="10" bind:value />
