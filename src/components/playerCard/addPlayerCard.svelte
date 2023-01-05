<script lang="ts">
    import { dbIgnoredSkills } from '../../data/dungeonBowlIgnoredSkills';
    import { characteristics } from '../../data/statOrder.data';

    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import {
        journeymanPosition,
        journeymanSkills,
    } from '../../helpers/journeymenHelper';
    import type { Player } from '../../models/player.model';
    import type {
        PlayerAlterations,
        RosterPlayerRecord,
    } from '../../models/roster.model';
    import type { Team } from '../../models/team.model';
    import {
        currentTeam,
        journeymenTypes,
    } from '../../store/currentTeam.store';
    import { roster } from '../../store/teamRoster.store';
    import SkillElement from '../skillElement.svelte';
    import StatBlock from './statBlock.svelte';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean } = playerTypes[0];
    let newName: string = '';
    let amount: number = 1;

    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === selected?.id || 0
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === selected?.id)?.max || 0;

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
    };
</script>

<div class="player-card">
    <div class="header">
        <div>
            <h3>
                <input
                    aria-label="New Player Name"
                    placeholder="New Player Name"
                    bind:value={newName}
                    class="name-input"
                    use:blurOnEscapeOrEnter
                />
            </h3>
        </div>

        <div class="player-details">
            <input
                aria-label="Amount"
                class="multiplier"
                type="number"
                bind:value={amount}
                min="1"
                max={maxOfPlayerType - numberOfPlayerType}
                use:blurOnEscapeOrEnter
            />
            x
            <select aria-label="New Player Position" bind:value={selected}>
                {#each playerTypes as playerType}
                    <option value={playerType}>
                        {playerType.position}
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
        </div>
        <button class="add-sign" on:click={addPlayers} title="Add New Player"
            ><i class="material-symbols-outlined icon">add_circle</i></button
        >
    </div>
    <div class="player-characteristics">
        {#each selected.playerStats as stat, i}
            <StatBlock
                char={characteristics[i]}
                value={'' + stat}
                change={0}
                variant="neutral"
            />
        {/each}
    </div>
    <div class="player-card__content">
        <div class="skills">
            <p class="mini-title">SKILLS:</p>
            {#if selected && selected.skills.length > 0}
                <SkillElement playerSkillIds={selected.skills} />
            {:else}
                None
            {/if}
        </div>
        <p>
            <span class="mini-title">Hiring Fee:</span>
            {!selected?.journeyman
                ? `${formatNumberInThousands(selected.cost)}`
                : '-'}
        </p>
    </div>
</div>

<style lang="scss">
    @import '../../styles/font';
    .player-card {
        border-radius: 25px;
        position: relative;
        min-width: 300px;
        max-width: 600px;
        border: 2px solid var(--secondary-background-colour);
        height: 100%;
        background-color: var(--secondary-background-colour);
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);

        &__content {
            min-height: 100px;
            padding: 10px;
        }
    }
    .header {
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border-radius: 25px;
        border-radius: 20px 20px 0 0;
        border: 2px solid var(--secondary-background-colour);
        margin-bottom: 6px;
        h3 {
            margin: 0;
            margin-bottom: 8px;
            font-size: 16px;
            color: #333;
        }

        .name-input {
            padding: 0;
            color: #555;
            border: 0;
            border-radius: 0;
            background: none;
            &::placeholder {
                color: #555;
            }
        }
    }
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
    }
    .add-sign {
        position: absolute;
        top: 6px;
        right: 6px;
    }
    .icon {
        font-size: 32px;
        color: #555;
    }
    .player-details {
        color: #333;
        .multiplier {
            font-size: 12px;
            height: 30px;
            background: none;

            @media screen and (max-width: 783px) {
                font-size: 16px;
            }
        }
    }
    .player-characteristics {
        display: flex;
        position: relative;
        left: -2px;
    }
    .mini-title {
        font-family: $display-font;
        margin: 0;
    }
    .skills {
        margin-bottom: 10px;
    }
</style>
