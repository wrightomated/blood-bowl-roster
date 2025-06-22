<script lang="ts">
    import { dbIgnoredSkills } from '../data/dungeonBowlIgnoredSkills';
    import { characteristics } from '../data/statOrder.data';

    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    import type { Player } from '../models/player.model';
    import type {
        PlayerAlterations,
        RosterPlayerRecord,
    } from '../models/roster.model';
    import { filteredTableColumns } from '../store/filteredTableColumns.store';

    import { roster } from '../store/teamRoster.store';
    import Characteristic from './rosterPlayer/characteristic.svelte';
    import SkillElement from './skillElement.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { currentTeam, journeymenTypes } from '../store/currentTeam.store';
    import {
        journeymanPosition,
        journeymanSkills,
    } from '../helpers/journeymenHelper';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';
    import { _ } from 'svelte-i18n';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean } = playerTypes[0];
    let newName: string = '';
    let amount: number = 1;

    $: selectedSkills = selected?.journeyman
        ? [
              ...filteredSkills(selected.skills),
              ...journeymanSkills($roster.format),
          ]
        : filteredSkills(selected?.skills);
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === selected?.id || 0
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === selected?.id)?.max || 0;

    $: playerTypeCounts = playerTypes.map((x) => {
        return {
            id: x.id,
            max: $currentTeam.players.find((p) => p.id === x.id)?.max || 0,
            current: $roster.players.filter((p) => p.player.id === x.id).length,
        };
    });

    const addPlayers = () => {
        const numberOfPlayers =
            !amount || amount < 1
                ? 1
                : amount > maxOfPlayerType
                  ? maxOfPlayerType
                  : amount;
        for (let i = 0; i < numberOfPlayers; i++) {
            const { journeyman, ...player } = selected;
            let alterations: PlayerAlterations = { spp: 0, ni: 0 };
            let skills: number[] = player.skills;
            const extraSkills = journeyman
                ? journeymanSkills($roster.format)
                : undefined;

            if (journeyman) {
                alterations = { ...alterations, journeyman };
            }

            if (extraSkills) {
                alterations = { ...alterations, extraSkills };
            }

            if ($roster.format === 'dungeon bowl') {
                skills = skills.filter(
                    (skillId) => !dbIgnoredSkills.includes(skillId)
                );
            }

            let newPlayer: RosterPlayerRecord = {
                playerName: newName,
                player: { ...player, skills },
                alterations,
            };

            roster.addPlayer(
                newPlayer,
                numberOfPlayers === 1 ? index : undefined
            );
            newName = '';
        }
        // Reset amount for next player selection
        amount = 1;
        if (numberOfPlayerType >= maxOfPlayerType - numberOfPlayers) {
            // first id that isn't at max
            const nextId = playerTypeCounts.findIndex(
                (x) => x.current + 1 < x.max
            );
            if (nextId !== -1) {
                selected = playerTypes[nextId];
            }
        }
    };

    const filteredSkills: (skills: number[]) => number[] = (skills) => {
        return $roster.format === 'dungeon bowl'
            ? skills.filter((skillId) => !dbIgnoredSkills.includes(skillId))
            : skills;
    };
</script>

<tr class="add-player-row">
    {#each $filteredTableColumns as c (c.id)}
        <td class={c.rowDetails?.tdClass}>
            {#if c.name === 'Name'}
                <input
                    aria-labelledby="name-header"
                    placeholder={$_('players.name')}
                    bind:value={newName}
                    class="name-input"
                    data-cy="new-player-name-input"
                    use:blurOnEscapeOrEnter
                />
            {:else if c.name === 'Position'}
                <select
                    aria-labelledby="position-header"
                    bind:value={selected}
                    data-cy="new-player-position-select"
                >
                    {#each playerTypes as playerType, i}
                        <option
                            value={playerType}
                            disabled={playerTypeCounts[i]?.current >=
                                playerTypeCounts[i]?.max}
                        >
                            {$_('players.' + playerType.id, {
                                default: playerType.position,
                            })}
                            {playerTypeCounts[i]?.current}/{playerTypeCounts[i]
                                ?.max}
                        </option>
                    {/each}
                    {#if $roster.mode !== 'exhibition' && $roster.leagueRosterStatus === 'commenced'}
                        {#each $journeymenTypes as journeymanType}
                            <option value={journeymanType}>
                                {journeymanPosition(journeymanType.position)}
                            </option>
                        {/each}
                    {/if}
                </select>
            {:else if c.name === 'Controls'}
                <MaterialButton
                    hoverText="Add new player"
                    cyData="add-player"
                    symbol="add_circle"
                    clickFunction={addPlayers}
                />
                x
                <input
                    aria-label="Amount"
                    class="multiplier"
                    type="number"
                    bind:value={amount}
                    min="1"
                    max={maxOfPlayerType - numberOfPlayerType}
                    use:blurOnEscapeOrEnter
                />
            {:else if characteristics.includes(c.name)}
                <Characteristic
                    characteristic={c.name}
                    playerStats={selected.playerStats}
                />
            {:else if c.name === 'Skills'}
                <SkillElement playerSkillIds={selectedSkills} />
            {:else if c.name === 'Hiring Fee'}
                {!selected?.journeyman
                    ? `${formatNumberInThousands(selected.cost)}`
                    : '-'}
            {/if}
        </td>
    {/each}
</tr>

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .position {
        padding: calc(1em / 2);
    }
    @media print {
        .add-player-row {
            display: none;
        }
    }
    .controls {
        display: flex;
        align-items: center;
        gap: 8px;
        input {
            font-style: italic;
        }
    }
</style>
