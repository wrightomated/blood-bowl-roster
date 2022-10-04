<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import type { Extra } from '../models/extra.model';
    import type { LeagueRosterStatus } from '../models/roster.model';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';

    export let extra: Extra;

    $: extraAmount = $roster?.extra[extra.extraString] || extra?.min || 0;
    $: extraMax = alterExtraMax(extra, $roster.leagueRosterStatus);
    $: extraCost = alterExtraCost(
        extra,
        $roster.leagueRosterStatus,
        $roster.format === 'sevens'
    );

    function addExtra() {
        roster.addExtra(extra.extraString, extraCost);
    }
    function removeExtra() {
        roster.removeExtra(
            extra.extraString,
            $roster?.leagueRosterStatus === 'commenced' ? 0 : extraCost
        );
    }
    function alterExtraCost(
        extra: Extra,
        status: LeagueRosterStatus,
        is7: boolean
    ): number {
        if (status === 'commenced') {
            if (extra.extraString === 'rerolls' && !is7) return extra.cost * 2;
            if (extra.extraString === 'dedicated_fans') return 0;
        }
        return extra.cost;
    }

    function alterExtraMax(extra: Extra, status: LeagueRosterStatus) {
        if (extra.extraString !== 'dedicated_fans' || status === 'commenced') {
            return extra.max;
        }
        return extra.max - 1;
    }
</script>

<tr>
    <th>{extra.extraString.replace('_', ' ')}</th>
    <td class="qty">{extraAmount} / {extraMax}</td>
    <td>{formatNumberInThousands(extraCost)}</td>
    <td class="control">
        <div class="flex-container">
            {#if extraAmount < extraMax && !(extra.extraString === 'rerolls' && $roster.leagueRosterStatus === 'commenced' && $roster.format === 'sevens')}
                <MaterialButton
                    cyData={'add-' + extra.extraString.replace('_', '-')}
                    hoverText="Add extra"
                    symbol="add_circle"
                    clickFunction={addExtra}
                />
            {/if}
            {#if extraAmount > (extra.min || 0)}
                <MaterialButton
                    hoverText="Remove extra"
                    symbol="remove_circle"
                    clickFunction={removeExtra}
                />
            {/if}
        </div>
    </td>
</tr>

<style lang="scss">
    th {
        background-color: var(--main-colour);
        color: white;
        text-align: left;
        text-transform: uppercase;
        font-weight: normal;
        padding: 10px;
    }
    .qty {
        min-width: 44px;
    }
    .flex-container {
        display: flex;
    }

    @media print {
        .control {
            display: none;
        }
        th {
            background-color: #333;
        }
    }
</style>
