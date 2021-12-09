<script lang="ts">
    import { dbIgnoredSkills } from '../../data/dungeonBowlIgnoredSkills';

    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import type { Player } from '../../models/player.model';
    import type {
        PlayerAlterations,
        RosterPlayerRecord,
    } from '../../models/roster.model';
    import type { Team } from '../../models/team.model';
    import { currentTeam } from '../../store/currentTeam.store';
    import { roster } from '../../store/teamRoster.store';

    export let playerTypes: Player[];
    export let index: number;
    let selected: Player & { journeyman?: boolean };
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
                ? $roster.format === 'sevens'
                    ? [710]
                    : [71]
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
        amount = 1;
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
</script>

<div class="player-card">
    <div class="header">
        <div class="player-number" />
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
                {#if $roster.mode !== 'exhibition'}
                    <option value={journeymanType()}> Journeyman </option>
                {/if}
            </select>
        </div>
    </div>

    <div class="player-card__content">
        <button class="add-sign" on:click={addPlayers} title="Add New Player"
            ><i class="material-icons icon">add_circle</i></button
        >
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

        &__content {
            min-height: 100px;
        }
    }
    .header {
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border-radius: 25px;
        border-radius: 20px 20px 0 0;
        border: 2px solid var(--secondary-background-colour);
        background-color: var(--secondary-background-colour);
        h3 {
            margin: 0;
            margin-bottom: 8px;
            font-size: 16px;
            color: #333;
        }

        input {
            padding: 0;
            color: #555;
            border: 0;
            border-radius: 0;
            background: none;
            &::placeholder {
                color: #555;
            }
        }
        select {
            margin: 6px 0;
            background-color: var(--secondary-colour);
            color: #333;
            font-size: 16px;
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
        top: 50%;
        left: calc(50% - 30px);
        height: 60px;
        width: 60px;
    }
    .icon {
        font-size: 60px;
        color: #555;
    }
    .player-details {
        color: #333;
        input {
            border: 1px solid #333;
            font-size: 16px;
            width: 40px;
            height: 32px;
            text-align: center;
        }
    }
    .player-number {
        width: 25px;
        line-height: 25px;
        border-radius: 50%;
        font-family: $display-font;
        text-align: center;
        font-size: 16px;
        right: 10px;
        top: 10px;
        background-color: white;
        color: #555;
        position: absolute;
    }
</style>
