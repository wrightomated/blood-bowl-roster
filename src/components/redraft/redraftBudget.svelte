<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../../store/teamRoster.store';
    import { formatNumber } from '../../helpers/formatTotalToThousands';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    //  *  20k per game
    //  *  20k per win
    //  *  10k per draw
    //  *  Optional cap

    $: redraftBudget =
        $roster.format === 'sevens'
            ? 600
            : $roster.format === 'gutter bowl'
              ? 750
              : 1000;
    $: budgetCap = redraftBudget + 300;

    const options = ['yes', 'no'];
    let showCap = false;

    function extraBudget() {
        const matchSummaries = $roster.matchSummary;
        if (matchSummaries?.length > 0) {
            const games = matchSummaries.length;
            const extra = matchSummaries
                .map((match) => {
                    return match.opponent.score === match.playerScores.touchdown
                        ? 10000
                        : match.opponent.score < match.playerScores.touchdown
                          ? 20000
                          : 0;
                })
                .reduce((acc, curr) => acc + curr, 0);

            return formatNumber(games * 20000 + extra);
        } else {
            return 0;
        }
    }
</script>

<label for="re-draft-budget">{$_('redraft.budget')}</label>
<input
    type="number"
    autocomplete="off"
    id="re-draft-budget"
    step="1"
    min="0"
    max="9999999"
    value={redraftBudget}
/>

<label for="re-draft-cap">{$_('redraft.cap')}</label>
<ToggleButton
    {options}
    selectedIndex={showCap ? 0 : 1}
    selected={() => (showCap = !showCap)}
/>
{#if showCap}
    <input
        type="number"
        autocomplete="off"
        id="re-draft-cap"
        step="1"
        min="0"
        max="9999999"
        value={budgetCap}
    />
{/if}

<p>
    {$_('redraft.bonus')}: {extraBudget()}
</p>
