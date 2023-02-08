<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { roster } from '../../../store/teamRoster.store';

    import FanFactorCalc from './fanFactorCalc.svelte';
    import PettyCash from './pettyCash.svelte';
    import StadiaControl from './stadiaControl.svelte';
    import WeatherControl from './weatherControl.svelte';
</script>

<div
    class="pre-game"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    {#if $roster.mode === 'league'}
        <FanFactorCalc />
        <PettyCash />
    {/if}
    {#if $roster.format === 'elevens'}
        <WeatherControl />
        <StadiaControl />
    {/if}
</div>

<style lang="scss">
    .pre-game {
        margin: 16px 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;

        @media screen and (max-width: 760px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
