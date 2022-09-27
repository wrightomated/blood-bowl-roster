<script lang="ts">
    import ToggleButton from '../../uiComponents/toggleButton.svelte';

    let stadiaTypes: 'standard' | 'deathzone' = 'standard';

    function selectStadia(type: 'standard' | 'deathzone') {
        stadiaTypes = type;
    }
</script>

<ToggleButton options={['standard', 'deathzone']} selected={selectStadia} />

{#if stadiaTypes === 'standard'}{/if}
