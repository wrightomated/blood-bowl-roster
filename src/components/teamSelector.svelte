<script lang="ts">
    import type { Team, TeamTier } from '../models/team.model';
    import {
        currentTeam,
        currentTeamIsDungeonBowl,
    } from '../store/currentTeam.store';
    import { roster } from '../store/teamRoster.store';
    import {
        teamSelectionOpen,
        showNewTeamDialogue,
    } from '../store/teamSelectionOpen.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
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
    import type { RosterMode } from '../store/rosterMode.store';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import Button from './uiComponents/button.svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';
    import { showDungeonBowl } from '../store/showDungeonBowl.store';
    import type { TeamFormat } from '../types/teamFormat';
    import { currentUserStore } from '../store/currentUser.store';
    import FootballSpinner from './uiComponents/footballSpinner.svelte';
    import RosterPreviewCard from './uiComponents/rosterPreviewCard.svelte';
    import { getSavedRosterFromLocalStorage } from '../helpers/localStorageHelper';
    import { rosterCache } from '../store/rosterCache.store';
    import type { RosterPreviews } from '../models/roster.model';
    import SelectSpecialRule from './selectSpecialRule.svelte';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';

    export let teamList: Team[];

    let rosterCode: string;
    let includeNaf: boolean = true;
    let includeRetired: boolean = false;

    const nafTeams = [28, 29];
    const rosterModes: RosterMode[] = ['league', 'exhibition'];
    const teamFormats: TeamFormat[] = ['elevens', 'sevens', 'dungeon bowl'];

    $: searchTerm = '';

    $: sortedTeam = sortTeam()
        .filter((x) => $filteredTiers.includes(x.tier))
        .filter((x) => (!includeNaf ? !nafTeams.includes(x.id) : true))
        .filter((x) => !x?.retired || (x.retired && includeRetired))
        .filter((x) =>
            searchTerm
                ? x.name.toLowerCase().includes(searchTerm.toLowerCase())
                : x
        );

    // This should be in a service of some type
    async function getRosterPreviews() {
        if ($rosterCache.rosterPreviews.valid) {
            return $rosterCache.rosterPreviews.cachedItem;
        }
        try {
            const dbService = await import('./auth/firebaseDB.service');
            const rosterPreviewDocument = await dbService.gerRosterPreviews();
            const rosterPreviews = rosterPreviewDocument.data();
            rosterCache.cacheRosterPreviews(rosterPreviews);
            return rosterPreviews;
        } catch {
            throw new Error('');
        }
    }
    const sortTeam = () => {
        return teamList.sort((a, b) => a.name.localeCompare(b.name));
    };

    const newTeam = (index: number) => {
        currentTeam.setCurrentTeamWithId(index);

        teamSelectionSpecialRule.set(
            $currentTeam?.pickSpecialRule
                ? $currentTeam?.pickSpecialRule[0]
                : undefined
        );
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
            specialRule: $teamSelectionSpecialRule,
        });

        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);
        showNewTeamDialogue.set(false);

        sendEventToAnalytics('new-team-created', {
            teamType: $currentTeam.name,
            rosterMode: $rosterMode,
            format: $teamFormat,
        });

        document.body.scrollIntoView();
    };

    const loadTeam = (savedRoster: { id: number; name?: string }) => {
        savedRosterIndex.updateCurrentIndex(savedRoster.id);
        const retrievedRoster = getSavedRosterFromLocalStorage(savedRoster.id);
        if (!retrievedRoster) {
            savedRosterIndex.removeIdFromIndex(savedRoster.id);
            return;
        }

        roster.loadRoster(retrievedRoster);
        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);
        showNewTeamDialogue.set(false);
        teamLoadOpen.set(false);
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

    const toggleRetired = () => {
        includeRetired = !includeRetired;
    };

    const toggleDungeonBowl = (show: boolean) => {
        teamLoadOpen.set(false);
        teamSelectionOpen.set(!show);
        showDungeonBowl.set(show);
    };

    function changeFormat(format: any) {
        teamFormat.set(format);
        toggleDungeonBowl(format === 'dungeon bowl');
    }

    function sortedPreviews(rosterPreviews: RosterPreviews) {
        if (!rosterPreviews) return [];
        const previews = Object.values(rosterPreviews);
        if (previews.length === 0) return [];
        return previews.sort((a, b) => a.teamName.localeCompare(b.teamName));
    }
</script>

{#if !$teamLoadOpen && $showNewTeamDialogue}
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
            changeFormat(format);
        }}
    />
    {#if $teamSelectionOpen}
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
                <button
                    on:click={toggleRetired}
                    title="Filter superseded teams"
                    class:selected={includeRetired}
                    class="filter__button">S</button
                >
            </div>
            <label class="filter__search">
                Search: <input
                    bind:value={searchTerm}
                    placeholder="Team type"
                />
            </label>
            <br />
            <div>
                {#each sortedTeam as team (team.id)}
                    <button
                        class="team-button rounded-button"
                        animate:flip={{ duration: 200 }}
                        transition:scale|local={{ duration: 200 }}
                        class:selected={$currentTeam.id === team.id}
                        on:click={() => newTeam(team.id)}
                        >{team.name}
                        <span class="display-font"
                            >{tierToNumeral(team.tier)}</span
                        >{#if nafTeams.includes(team.id)}<span
                                class="display-font">&nbsp;N</span
                            >{/if}</button
                    >
                {/each}
                {#if sortedTeam.length === 0}
                    <p class="no-matches">No matches</p>
                {/if}
            </div>
            {#if $currentTeam?.pickSpecialRule}
                <SelectSpecialRule />
            {/if}
        </div>

        <div />
        <Button
            clickFunction={createTeam}
            cyData="create-team"
            disabled={!$currentTeam || $currentTeamIsDungeonBowl}>Create</Button
        >
    {/if}
{/if}

{#if $teamLoadOpen}
    <h2 class="page-title">Load Team</h2>
    <div class="button-container" data-cy="load-team-box">
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
        {#if $currentUserStore}
            {#await getRosterPreviews()}
                <FootballSpinner />
            {:then rosterPreviews}
                <h3 class="signed-in-heading">
                    Teams of {$currentUserStore.displayName}
                </h3>
                <div class="team-previews">
                    {#each sortedPreviews(rosterPreviews) as preview}
                        <RosterPreviewCard {preview} />
                    {/each}
                </div>
            {:catch}
                <p style="color: red">Something went wrong.</p>
            {/await}
        {:else}
            <h3>Locally stored teams</h3>
            {#each $savedRosterIndex.index as savedRoster, i}
                <Button clickFunction={() => loadTeam(savedRoster)}
                    >{savedRoster.name || 'Saved Roster ' + (i + 1)}</Button
                >
            {/each}
        {/if}
    </div>
    <!-- Refactor to it's own component -->
{/if}

<style lang="scss">
    .page-title {
        color: var(--main-colour);
        text-align: center;
        font-size: 32px;
        margin-block-start: 16px;
        margin-block-end: 24px;
    }

    .button-container {
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 12px;
        background: var(--secondary-background-colour);
        padding: 8px;
    }
    .display-font {
        font-family: var(--display-font);
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
            font-family: var(--display-font);
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
            border: var(--secondary-border);

            &:hover {
                box-shadow: 0 4px 12px #4b7d9e inset;
                background: var(--secondary-colour);
                color: white;
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
    .team-previews {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin: 16px 8px;
    }
    .signed-in-heading {
        text-align: center;
    }
</style>
