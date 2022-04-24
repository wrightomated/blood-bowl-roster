<script lang="ts">
    import { characteristics } from '../../data/statOrder.data';

    export let characteristic: string;
    export let playerStats: number[];

    $: cIndex = characteristics.indexOf(characteristic);
    $: value = playerStats[cIndex];
</script>

{value === 0 ? '-' : cIndex > 1 ? `${value}+` : value}
