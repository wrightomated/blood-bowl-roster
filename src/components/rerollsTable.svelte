<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../store/teamRoster.store';
    import ExtraRosterAdditionsRow from './extraRosterAdditionsRow.svelte';
    import Inducements from './inducements.svelte';
    import { extrasForTeam } from '../helpers/extrasForTeam';
    import Treasury from './treasury.svelte';
    import StarPlayerInducement from './starPlayerInducement.svelte';
    import {
        formatNumber,
        formatNumberInThousands,
    } from '../helpers/formatTotalToThousands';
    import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
    import { gameSettings } from '../store/gameSettings.store';
    import { currentUserStore } from '../store/currentUser.store';
    import { customisationRules } from '../customisation/customisation.store';
    import { currentTeam } from '../store/currentTeam.store';
    import { currentTeamValue, teamValue } from '../helpers/teamValue';
    import { teamTotalCost } from '../helpers/validator';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { modalState } from '../store/modal.store';

    export let selectedTeam: CustomTeam;

    $: extras = extrasForTeam($roster.mode, $roster.format, $currentTeam);

    currentUserStore.subscribe((value) => {
        if ($roster?.coachDetails?.coachName === undefined) {
            $roster.coachDetails = {
                ...$roster?.coachDetails,
                coachName: value?.displayName,
            };
        }
    });

    $: teamTotal = teamValue($roster, $currentTeam);
    $: currentTotal = currentTeamValue($roster, $currentTeam);
    $: rosterTotal = teamTotalCost(
        $roster,
        $currentTeam,
        $roster.mode === 'exhibition'
    );

    async function showRosterTotalInfo() {
        const info = await import('../modules/infoBlock/rosterTotal.svelte');
        modalState.modalCustomComponent(info.default);
    }
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
                {formatNumberInThousands(teamTotal)}
            </td>
        </tr>
        {#if teamTotal !== currentTotal}
            <tr>
                <th>{$_('tables.ctv')}</th>
                <td data-cy="current-tv">
                    {formatNumberInThousands(currentTotal)}
                </td>
            </tr>
        {/if}

        <tr>
            <th>Roster Total</th>
            <td class="roster-total-cell">
                {formatNumberInThousands(rosterTotal)}
                <MaterialButton
                    symbol="info"
                    hoverText={'Information'}
                    clickFunction={showRosterTotalInfo}
                ></MaterialButton>
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
    .roster-total-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
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
