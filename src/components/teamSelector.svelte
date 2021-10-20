<script lang="ts">
    import type { Team, TeamTier } from '../models/team.model';
    import { currentTeam } from '../store/currentTeam.store';
    import { roster } from '../store/teamRoster.store';
    import { teamSelectionOpen } from '../store/teamSelectionOpen.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import type { Roster } from '../models/roster.model';
    import { teamLoadOpen } from '../store/teamLoadOpen.store';
    import { filteredTiers, toggledTiers } from '../store/filterTier.store';
    import {
        showAvailablePlayers,
        showAvailableStarPlayers,
    } from '../store/showPlayerList.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { rosterMode } from '../store/rosterMode.store';
    import ToggleButton from './uiComponents/toggleButton.svelte';
    import { teamFormat } from '../store/teamFormat.store';
    import type { TeamFormat } from '../store/teamFormat.store';
    import type { RosterMode } from '../store/rosterMode.store';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { sendEventToPlausible } from '../analytics/plausible';

    export let teamList: Team[];

    let rosterCode: string;
    let includeNaf: boolean = true;

    const nafTeams = [28, 29];
    const rosterModes: RosterMode[] = ['league', 'exhibition'];
    const teamFormats: TeamFormat[] = ['elevens', 'sevens'];

    $: searchTerm = '';

    $: showTeams = $teamSelectionOpen;

    $: sortedTeam = sortTeam()
        .filter((x) => $filteredTiers.includes(x.tier))
        .filter((x) => (!includeNaf ? !nafTeams.includes(x.id) : true))
        .filter((x) =>
            searchTerm
                ? x.name.toLowerCase().includes(searchTerm.toLowerCase())
                : x
        );

    const sortTeam = () => {
        return teamList.sort((a, b) => a.name.localeCompare(b.name));
    };

    const newTeam = (index: number) => {
        currentTeam.set(teamList.find((x) => x.id === index));
    };

    const toggleTeam = () => {
        if (showTeams && $roster.teamId) {
            currentTeam.set(teamList.find((x) => x.id === $roster.teamId));
        }
        teamSelectionOpen.set(!showTeams);
    };

    const toggleLoad = () => {
        teamLoadOpen.set(!$teamLoadOpen);
    };

    const createTeam = () => {
        savedRosterIndex.newId();
        roster.reset({
            teamId: $currentTeam.id,
            teamType: $currentTeam.name,
            mode: $rosterMode,
            fans: $rosterMode === 'exhibition' ? 0 : 1,
            format: $teamFormat,
        });

        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);

        sendEventToPlausible('new-team-created', {
            teamType: $currentTeam.name,
            rosterMode: $rosterMode,
            format: $teamFormat,
        });
    };

    const loadTeam = (savedRoster: { id: any; name?: string }) => {
        const loadedRoster: Roster = JSON.parse(
            localStorage.getItem(`savedRoster${savedRoster.id}`)
        );
        currentTeam.set(teamList.find((t) => t.id === loadedRoster.teamId));
        roster.loadRoster(`savedRoster${savedRoster.id}`);
        savedRosterIndex.updateCurrentIndex(savedRoster.id);
        toggleLoad();
    };

    const tierToNumeral = (tier: TeamTier) => {
        switch (tier) {
            case 1:
                return 'I';
            case 2:
                return 'II';
            case 3:
                return 'III';
            default:
                break;
        }
    };

    const inputCode = () => {
        roster.codeToRoster(rosterCode);
        toggleLoad();
    };

    const toggleNaf = () => {
        includeNaf = !includeNaf;
    };
</script>

{#if !$teamLoadOpen}
    <button
        class:cancel={showTeams}
        class="new-team"
        data-cy="new-team"
        on:click={() => toggleTeam()}
        >{!showTeams ? 'New Team' : 'Cancel'}
    </button>
{/if}

{#if !showTeams}
    <button
        class="load-team-button"
        data-cy="load-team"
        class:cancel={$teamLoadOpen}
        on:click={() => toggleLoad()}
        >{!$teamLoadOpen ? 'Load Team' : 'Cancel'}</button
    >
{/if}

{#if showTeams && !$teamLoadOpen}
    <ToggleButton
        options={rosterModes}
        selectedIndex={rosterModes.indexOf($rosterMode)}
        selected={(mode) => {
            rosterMode.set(mode);
        }}
    />

    <ToggleButton
        options={teamFormats}
        selectedIndex={teamFormats.indexOf($teamFormat)}
        selected={(format) => {
            teamFormat.set(format);
        }}
    />
    <div class="button-container">
        <div class="filter__tier">
            Filter:
            <button
                on:click={() => toggledTiers.toggleTier(1)}
                class:selected={$filteredTiers.includes(1)}
                class="filter__button">I</button
            >
            <button
                on:click={() => toggledTiers.toggleTier(2)}
                class:selected={$filteredTiers.includes(2)}
                class="filter__button">II</button
            >
            <button
                on:click={() => toggledTiers.toggleTier(3)}
                class:selected={$filteredTiers.includes(3)}
                class="filter__button">III</button
            >
            <button
                on:click={toggleNaf}
                title="Filter NAF teams"
                class:selected={includeNaf}
                class="filter__button">N</button
            >
        </div>
        <label class="filter__search">
            Search: <input bind:value={searchTerm} placeholder="Query" />
        </label>
        <br />
        <div>
            {#each sortedTeam as team}
                <button
                    class="team-button"
                    class:selected={$currentTeam.id === team.id}
                    on:click={() => newTeam(team.id)}
                    >{team.name}
                    <span>{tierToNumeral(team.tier)}</span
                    >{#if nafTeams.includes(team.id)}<span>&nbsp;N</span
                        >{/if}</button
                >
            {/each}
        </div>
    </div>
    <button
        class="create-team"
        disabled={!$currentTeam}
        data-cy="create-team"
        on:click={() => createTeam()}>Create</button
    >
{/if}

{#if $teamLoadOpen}
    <div class="button-container">
        {#each $savedRosterIndex.index as savedRoster, i}
            <button
                class="saved-team-button"
                on:click={() => loadTeam(savedRoster)}
                >{savedRoster.name || 'Saved Roster ' + (i + 1)}</button
            >
        {/each}
        <div class="code-box">
            <input
                aria-label="Input code"
                id="code-input"
                placeholder="Input Code"
                bind:value={rosterCode}
                use:blurOnEscapeOrEnter
            />
            <MaterialButton
                hoverText="Enter code"
                symbol="input"
                clickFunction={inputCode}
            />
        </div>
    </div>
{/if}

<style lang="scss">
    @import '../styles/colour';
    @import '../styles/font';
    button {
        border-radius: 10px;
        background-color: white;
        color: $secondary-colour;
        padding: 10px;
        margin: 4px;
        border: 2px solid $secondary-colour;

        &:hover,
        &.selected {
            background-color: $secondary-colour;
            color: white;
            border-color: $secondary-colour;
        }

        &.cancel {
            color: $main-colour;
            border-color: $main-colour;

            &:hover {
                color: white;
                background-color: $main-colour;
            }
        }
    }

    .button-container {
        border-radius: 10px;
        background: $secondary-background-colour;
        padding: 10px;
    }
    .team-button {
        // display: block;
        span {
            font-family: $display-font;
        }
    }
    .filter {
        &__tier {
            display: inline-block;
            margin: 1em 4px 1em 4px;
        }
        &__button {
            font-family: $display-font;
            border-radius: 50%;
            font-size: 0.75em;
            background-color: white;
            color: $secondary-colour;
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 0px;
            text-align: center;
            margin: 0 auto;
            border: 2px solid $secondary-colour;

            &:hover {
                border-color: $secondary-background-colour;
            }
        }
        &__search {
            display: inline-block;
            margin: 0 4px 1rem 4px;
        }
    }

    .code-box {
        display: flex;
        padding: 10px;
        align-items: center;

        input {
            margin-right: 8px;
            font-size: 16px;
        }
    }
    .create-team {
        &:disabled {
            display: none;
        }
    }
</style>
