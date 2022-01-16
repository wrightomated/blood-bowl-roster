<script lang="ts">
    import { dbIgnoredSkills } from '../data/dungeonBowlIgnoredSkills';
    import { characteristics } from '../data/statOrder.data';

    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    import type { Player } from '../models/player.model';
    import type { PlayerAlterations } from '../models/roster.model';
    import type { Team } from '../models/team.model';
    import { currentTeam } from '../store/currentTeam.store';
    import { filteredTableColumns } from '../store/filteredTableColumns.store';

    import { roster } from '../store/teamRoster.store';
    import SkillElement from './skillElement.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean } = playerTypes[0];
    let newName: string = '';

    $: selectedSkills = selected?.journeyman
        ? [...filteredSkills(selected.skills), ...journeymanSkills()]
        : filteredSkills(selected.skills);

    const addPlayer = () => {
        const { journeyman, ...player } = selected;
        const extraSkills = journeyman ? journeymanSkills() : undefined;
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

    const journeymanType: () => Player & { journeyman: boolean } = () => {
        const journeymanId = ($currentTeam as Team).players.find(
            (p) => p.max === 16 || p.max === 12
        ).id;
        const journeymanPlayer = playerTypes.find((p) => p.id === journeymanId);
        return {
            ...journeymanPlayer,
            journeyman: true,
        };
    };

    const filteredSkills: (skills: number[]) => number[] = (skills) => {
        return $roster.format === 'dungeon bowl'
            ? skills.filter((skillId) => !dbIgnoredSkills.includes(skillId))
            : skills;
    };

    const journeymanSkills: () => number[] = () =>
        $roster.format === 'sevens' ? [710] : [71];

    const getCharacteristic: (c: string) => string = (c) => {
        const cIndex = characteristics.indexOf(c);
        const stat = selected.playerStats[cIndex];
        return `${stat === 0 ? '-' : cIndex > 1 ? `${stat}+` : stat}`;
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
                        <option value={journeymanType()}> Journeyman </option>
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
                {getCharacteristic(c.name)}
            {:else if c.name === 'Skills'}
                <SkillElement playerSkillIds={selectedSkills} />
            {:else if c.name === 'Hiring Fee'}
                {!selected?.journeyman ? `${selected.cost},000` : '-'}
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
    select {
        margin: 0;
        color: #333;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23333333'><polygon points='0,0 100,0 50,50'/></svg>")
            no-repeat;
        background-size: 12px;
        background-position: 97% 72%;
        padding-right: 20px;
        background-repeat: no-repeat;
        border-color: #333;
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
