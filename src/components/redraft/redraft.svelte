<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    /**
     * Redraft
     * 1. R&R
     *  remove miss next game
     * 2. Raise funds
     *  Get redraft budget. Default 1000k
     *  20k per game
     *  20k per win
     *  10k per draw
     *  Optional cap
     * 3. Redraft
     * Assistant coaches, cheerleaders, apoc all can stay
     *
     *
     * Rehire cv + 20k
     * NI d6 (+1 with apoc)
     * 4+ remove NI
     *
     * TR characters
     *  d6 (+1 with apoc) for each char they have suffered
     *  4+ remove NI
     */

    import RedraftBudget from './redraftBudget.svelte';
    import RedraftTable from './redraftTable.svelte';
</script>

{#if $roster.mode === 'league'}
    <RedraftBudget />
    <RedraftTable />
{/if}
