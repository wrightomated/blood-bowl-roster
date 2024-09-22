<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../store/teamRoster.store';
    import ExtraRosterAdditionsRow from './extraRosterAdditionsRow.svelte';
    import Inducements from './inducements.svelte';
    import { extrasForTeam } from '../helpers/extrasForTeam';
    import Treasury from './treasury.svelte';
    import StarPlayerInducement from './starPlayerInducement.svelte';
    import { calculateInducementTotal } from '../helpers/totalInducementAmount';
    import {
        formatNumber,
        formatNumberInThousands,
    } from '../helpers/formatTotalToThousands';
    import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
    import { gameSettings } from '../store/gameSettings.store';
    import { currentUserStore } from '../store/currentUser.store';
    import { customisationRules } from '../customisation/customisation.store';

    export let selectedTeam: CustomTeam;

    const extras = extrasForTeam(selectedTeam.id, $roster.mode, $roster.format);

    currentUserStore.subscribe((value) => {
        if ($roster?.coachDetails?.coachName === undefined) {
            $roster.coachDetails = {
                ...$roster?.coachDetails,
                coachName: value?.displayName,
            };
        }
    });

    $: teamTotal = $roster.players
        .filter((p) => !p?.starPlayer)
        .map(
            (x) =>
                x.player.cost +
                ($roster.mode === 'exhibition'
                    ? 0
                    : x?.alterations?.valueChange || 0)
        )
        .reduce((a, b) => a + b, 0);

    $: teamExtrasTotal = extrasForTeam(
        selectedTeam.id,
        $roster.mode,
        $roster.format
    )
        .filter((e) => e.extraString !== 'dedicated_fans')
        .map((e) => $roster.extra[e.extraString] * e.cost || 0)
        .reduce((a, b) => a + b, 0);

    $: currentTotal =
        $roster.players
            .filter((p) => !p?.alterations?.tr && !p?.alterations?.mng)
            .map(
                (x) =>
                    ((x.player.id === 56 || x.player.id === 73) &&
                    $roster.mode !== 'exhibition' &&
                    $roster.format !== 'dungeon bowl'
                        ? 0
                        : x.player.cost) +
                    ($roster.mode === 'exhibition'
                        ? 0
                        : x?.alterations?.valueChange || 0)
            )
            .reduce((a, b) => a + b, 0) +
        calculateInducementTotal(
            $roster.inducements,
            $roster.teamId,
            $roster.format
        );
</script>

<div class="tables">
    <table class="tables__item">
        <tr class:no-print={!$roster?.coachDetails?.coachName}>
            <th>{$_('tables.coach')}</th>
            <td>
                <input
                    placeholder={$_('tables.coach')}
                    id="coach-name"
                    data-cy="coach-name"
                    bind:value={$roster.coachDetails.coachName}
                />
            </td>
        </tr>
        <tr class:no-print={!$roster?.coachDetails?.nafNumber}>
            <th>{$_('tables.naf')}</th>
            <td>
                <input
                    placeholder={$_('tables.naf')}
                    id="naf-number"
                    data-cy="naf-number"
                    bind:value={$roster.coachDetails.nafNumber}
                />
            </td>
        </tr>
        <tr>
            <th>{$_('tables.tv')}</th>
            <td>
                {formatNumberInThousands(teamTotal + teamExtrasTotal)}
            </td>
        </tr>
        <tr>
            <th>{$_('tables.ctv')}</th>
            <td data-cy="current-tv">
                {formatNumberInThousands(currentTotal + teamExtrasTotal)}
            </td>
        </tr>

        <tr>
            <th>{$_('tables.treasury')}</th>
            <td class="treasury-cell">
                {#if $customisationRules?.lockTreasury}
                    {formatNumberInThousands($roster.treasury)}
                {:else}
                    <Treasury />
                {/if}
            </td>
        </tr>

        {#if $roster.mode === 'league' && typeof $roster.pettyCash === 'number'}
            <tr>
                <th>{$_('common.petty')}</th>
                <td class="treasury-cell">
                    {formatNumber($roster.pettyCash)}
                </td>
            </tr>
        {/if}
    </table>
    <table class="tables__item">
        {#each extras as extra}
            <ExtraRosterAdditionsRow {extra} />
        {/each}
    </table>

    {#if $gameSettings?.starPlayersAllowance > 0}
        <StarPlayerInducement />
    {/if}

    <Inducements {selectedTeam} />
</div>

<style lang="scss">
    .tables {
        width: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 1em;
        align-items: flex-start;

        &__item {
            margin-block-end: 1em;
            margin-right: 1em;
            th {
                background-color: var(--main-colour);
                color: white;
                text-align: left;
                text-transform: uppercase;
                font-weight: normal;
                padding: 10px;
            }
            & input {
                border: none;
                text-align: center;
                padding: 0;
                font-size: 16px;
                background: transparent;
                font-style: italic;
            }
            @media print {
                & input {
                    font-size: 10px;
                    font-style: normal;
                }
            }
            tr {
                height: 40px;
            }
        }
    }

    .treasury-cell {
        border-right: 1px solid #ccc;
    }

    @media screen and (max-width: 650px) {
        .tables__item {
            margin-right: 0;
            width: 100%;

            tr {
                height: auto;
            }
        }
    }

    @media print {
        .tables {
            width: 100%;
        }
        .tables__item {
            tr {
                height: auto;
            }
        }
        .treasury-cell {
            border-right: 1px solid #333;
        }
    }
</style>
