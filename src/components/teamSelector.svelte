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
    import { sendEventToAnalytics } from '../analytics/plausible';
    import Button from './uiComponents/button.svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';

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

        sendEventToAnalytics('new-team-created', {
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

{#if showTeams && !$teamLoadOpen}
    <h2 class="page-title">Create New Team</h2>
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
            Search: <input bind:value={searchTerm} placeholder="Team type" />
        </label>
        <br />
        <div>
            {#each sortedTeam as team (team.id)}
                <button
                    class="team-buton"
                    animate:flip={{ duration: 200 }}
                    transition:scale|local={{ duration: 200 }}
                    class:selected={$currentTeam.id === team.id}
                    on:click={() => newTeam(team.id)}
                    >{team.name}
                    <span class="display-font">{tierToNumeral(team.tier)}</span
                    >{#if nafTeams.includes(team.id)}<span class="display-font"
                            >&nbsp;N</span
                        >{/if}</button
                >
            {/each}
            {#if sortedTeam.length === 0}
                <p class="no-matches">No matches</p>
            {/if}
        </div>
    </div>
    <Button
        clickFunction={createTeam}
        cyData="create-team"
        disabled={!$currentTeam}>Create</Button
    >
{/if}

{#if $teamLoadOpen}
    <h2 class="page-title">Load Team</h2>
    <div class="button-container" data-cy="load-team-box">
        {#each $savedRosterIndex.index as savedRoster, i}
            <Button clickFunction={() => loadTeam(savedRoster)}
                >{savedRoster.name || 'Saved Roster ' + (i + 1)}</Button
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
    @use "../styles/mixins/roundedButton";
    @import '../styles/font';

    .page-title {
        color: var(--main-colour);
        text-align: center;
        font-size: 32px;
        margin-top: 32px;
    }

    .button-container {
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 10px;
        background: var(--secondary-background-colour);
        padding: 8px;
    }
    .display-font {
        font-family: $display-font;
    }
    .no-matches {
        margin-left: 4px;
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
            color: var(--secondary-colour);
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 0px;
            text-align: center;
            margin: 0 auto;
            border: 2px solid var(--secondary-colour);

            &:hover {
                border-color: var(--secondary-background-colour);
            }
            &.selected {
                background-color: var(--secondary-colour);
                color: white;
                border-color: var(--secondary-colour);
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
    .team-buton {
        @include roundedButton.rounded-button;
    }
</style>
