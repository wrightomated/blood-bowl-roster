<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

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
    <FanFactorCalc />

    <PettyCash />

    <WeatherControl />

    <StadiaControl />
</div>

<style>
    .pre-game {
        padding: 16px 0;
    }
</style>
