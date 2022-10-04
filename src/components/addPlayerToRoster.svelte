<script lang="ts">
    import { dbIgnoredSkills } from '../data/dungeonBowlIgnoredSkills';
    import { characteristics } from '../data/statOrder.data';

    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    import type { Player } from '../models/player.model';
    import type { PlayerAlterations } from '../models/roster.model';
    import { filteredTableColumns } from '../store/filteredTableColumns.store';

    import { roster } from '../store/teamRoster.store';
    import Characteristic from './rosterPlayer/characteristic.svelte';
    import SkillElement from './skillElement.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { journeymenTypes } from '../store/currentTeam.store';
    import {
        journeymanPosition,
        journeymanSkills,
    } from '../helpers/journeymenHelper';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean } = playerTypes[0];
    let newName: string = '';

    $: selectedSkills = selected?.journeyman
        ? [
              ...filteredSkills(selected.skills),
              ...journeymanSkills($roster.format),
          ]
        : filteredSkills(selected.skills);

    const addPlayer = () => {
        const { journeyman, ...player } = selected;
        const extraSkills = journeyman
            ? journeymanSkills($roster.format)
            : undefined;
        let alterations: PlayerAlterations = { spp: 0, ni: 0 };

        if (journeyman) {
            alterations = { ...alterations, journeyman };
        }

        if (extraSkills) {
            alterations = { ...alterations, extraSkills };
        }

        roster.addPlayer(
            {
                playerName: newName,
                player: { ...player, skills: filteredSkills(player.skills) },
                alterations,
            },
            index
        );
        newName = '';
    };

    const filteredSkills: (skills: number[]) => number[] = (skills) => {
        return $roster.format === 'dungeon bowl'
            ? skills.filter((skillId) => !dbIgnoredSkills.includes(skillId))
            : skills;
    };
</script>

<tr class="add-player-row">
    {#each $filteredTableColumns as c}
        <td class={c.rowDetails?.tdClass}>
            {#if c.name === 'Name'}
                <input
                    aria-labelledby="name-header"
                    placeholder="Player Name"
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
                    {#each playerTypes as playerType}
                        <option value={playerType}>
                            {playerType.position}
                        </option>
                    {/each}
                    {#if $roster.mode !== 'exhibition'}
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
                    clickFunction={addPlayer}
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
    .left-align {
        text-align: left;
    }
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
</style>
