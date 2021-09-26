<script lang="ts">
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    import type { Player } from '../models/player.model';
    import type { Team } from '../models/team.model';
    import { currentTeam } from '../store/currentTeam.store';

    import { roster } from '../store/teamRoster.store';
    import SkillElement from './skillElement.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean } = playerTypes[0];
    let newName: string = '';

    $: selectedSkills = selected.journeyman
        ? [...selected.skills, ...journeymanSkills()]
        : selected.skills;

    const addPlayer = () => {
        const { journeyman, ...player } = selected;
        const extraSkills = journeyman ? journeymanSkills() : undefined;
        roster.addPlayer(
            {
                playerName: newName,
                player,
                alterations: { spp: 0, ni: 0, journeyman, extraSkills },
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

    const journeymanSkills: () => number[] = () =>
        $roster.format === 'elevens' ? [71] : [710];
</script>

<tr class="add-player-row">
    <td class="player-number" />
    <td class="left-align">
        <input
            aria-labelledby="name-header"
            placeholder="Player Name"
            bind:value={newName}
            class="name-input"
            use:blurOnEscapeOrEnter
        />
    </td>
    <td class="left-align">
        <MaterialButton
            hoverText="Add new player"
            symbol="add_circle"
            clickFunction={addPlayer}
        />
    </td>
    <td class="position left-align">
        <select aria-labelledby="position-header" bind:value={selected}>
            {#each playerTypes as playerType}
                <option value={playerType}>
                    {playerType.position}
                </option>
            {/each}
            {#if $roster.mode !== 'exhibition'}
                <option value={journeymanType()}> Journeyman </option>
            {/if}
        </select>
    </td>
    {#each selected.playerStats as stat, index}
        <td>{`${stat === 0 ? '-' : index > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <td class="left-align">
        <SkillElement playerSkillIds={selectedSkills} />
    </td>
    <td>{selected.cost},000</td>
    <td />
    {#if $roster.mode !== 'exhibition'}
        <td />
        <td />
        <td />
    {/if}
    <td />
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
    .player-number {
        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
    @media print {
        .add-player-row {
            display: none;
        }
    }
</style>
