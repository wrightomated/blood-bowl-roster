<script lang="ts">
    import type { Team } from '../models/team.model';
    import {
        currentTeam,
        currentTeamId,
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
    import { rosterMode } from '../store/rosterMode.store';
    import ToggleButton from './uiComponents/toggleButton.svelte';
    import { teamFormat } from '../store/teamFormat.store';
    import type { RosterMode } from '../store/rosterMode.store';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import Button from './uiComponents/button.svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';
    import { showDungeonBowl } from '../store/showDungeonBowl.store';
    import type { TeamFormat } from '../types/teamFormat';

    import SelectSpecialRule from './selectSpecialRule.svelte';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';
    import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
    import { customisationRules } from '../customisation/customisation.store';
    import { _ } from 'svelte-i18n';
    import LoadTeam from './loadTeam.svelte';

    export let teamList: (Team | CustomTeam)[];

    let includeNaf: boolean = true;
    let includeRetired: boolean = false;

    const nafTeams = ['28', '29'];
    let rosterModes: RosterMode[] = ['league', 'exhibition'];
    let teamFormats: TeamFormat[] = [
        'elevens',
        'sevens',
        'dungeon bowl',
        'gutter bowl',
    ];

    $: searchTerm = '';
    customisationRules.subscribe((rules) => {
        if (!rules) {
            return;
        }
        if (rules?.tiers) {
            toggledTiers.setTiers(rules.tiers);
        }
        if (rules?.format) {
            teamFormats = [rules.format];
            teamFormat.set(rules.format);
        }
        if (rules?.mode) {
            rosterModes = [rules.mode];
            rosterMode.set(rules.mode);
        }
    });

    // let tiers: number[];
    // $: tiers = [...new Set(teamList.map((x) => x.tier))].sort((a, b) => a - b);

    let sortedTeam: (Team | CustomTeam)[];
    $: sortedTeam = sortTeam()
        .filter((x) => $filteredTiers.includes(x.tier))
        .filter((x) => (!includeNaf ? !nafTeams.includes(x.id) : true))
        .filter((x) => !x?.retired || (x.retired && includeRetired))
        .filter((x) =>
            searchTerm
                ? $_('teams.names.' + x.id)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                : x
        );

    // This should be in a service of some type

    const sortTeam = () => {
        return teamList.sort((a, b) => a.name.localeCompare(b.name));
    };

    const newTeam = (id: string) => {
        currentTeamId.set(id);

        teamSelectionSpecialRule.set(
            $currentTeam?.pickSpecialRule
                ? $currentTeam?.pickSpecialRule[0]
                : undefined
        );
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
            startingTreasury: $customisationRules?.treasury,
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

    const tierToNumeral = (tier: number) => {
        const lookup = {
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        };
        let num = tier;
        let roman = '';
        let i;
        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
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
</script>

{#if !$teamLoadOpen && $showNewTeamDialogue}
    <h2 class="page-title">
        {$customisationRules?.customContent?.createTeamTitle ||
            $_('creation.title')}
    </h2>
    {#if rosterModes.length > 1}
        <ToggleButton
            options={rosterModes}
            selectedIndex={rosterModes.indexOf($rosterMode)}
            selected={(mode) => {
                rosterMode.set(mode);
            }}
        />
    {/if}

    {#if teamFormats.length > 1}
        <ToggleButton
            options={teamFormats}
            selectedIndex={teamFormats.indexOf($teamFormat)}
            selected={(format) => {
                changeFormat(format);
            }}
        />
    {/if}

    {#if $teamSelectionOpen}
        <div class="button-container">
            <div class="filter__tier">
                Filter:
                {#each $toggledTiers as _tier, i}
                    <button
                        on:click={() => toggledTiers.toggleTier(i + 1)}
                        class:selected={$filteredTiers.includes(i + 1)}
                        class="filter__button"
                        title={$_('creation.tier', { values: { tier: i + 1 } })}
                        >{tierToNumeral(i + 1)}</button
                    >
                {/each}
                <button
                    on:click={toggleNaf}
                    title={$_('creation.naf')}
                    class:selected={includeNaf}
                    class="filter__button">N</button
                >
                <button
                    on:click={toggleRetired}
                    title={$_('creation.s')}
                    class:selected={includeRetired}
                    class="filter__button">S</button
                >
            </div>
            <label class="filter__search">
                {$_('common.search')}
                <input
                    bind:value={searchTerm}
                    placeholder={$_('creation.type')}
                />
            </label>
            <br />
            <div>
                {#each sortedTeam as team (team.id)}
                    <button
                        class="team-button rounded-button"
                        animate:flip={{ duration: 200 }}
                        transition:scale|local={{ duration: 200 }}
                        class:selected={$currentTeam?.id === team?.id}
                        on:click={() => newTeam(team.id)}
                        >{$_('teams.names.' + team.id)}
                        <span class="display-font"
                            >{tierToNumeral(team.tier)}</span
                        >{#if nafTeams.includes(team.id)}<span
                                class="display-font">&nbsp;N</span
                            >{/if}</button
                    >
                {/each}
                {#if sortedTeam.length === 0}
                    <p class="no-matches">No teams match your filter</p>
                {/if}
            </div>
            {#if $currentTeam?.pickSpecialRule}
                <SelectSpecialRule />
            {/if}
        </div>

        <Button
            clickFunction={createTeam}
            cyData="create-team"
            disabled={!$currentTeam || $currentTeamIsDungeonBowl}
            >{$_('creation.create')}</Button
        >
    {/if}
{/if}

{#if $teamLoadOpen}
    <LoadTeam />
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
            background-color: var(--secondary-compliment);
            color: var(--secondary-colour);
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 0px;
            text-align: center;
            margin: 0 auto;
            border: var(--secondary-border);
            margin-right: 4px;

            &:hover {
                box-shadow: 0 4px 12px var(--button-shadow) inset;
                background: var(--secondary-colour);
                color: var(--secondary-compliment);
            }
            &.selected {
                background-color: var(--secondary-colour);
                color: var(--secondary-compliment);
                border-color: var(--secondary-colour);
            }
        }
        &__search {
            display: inline-block;
            margin: 0 4px 1rem 4px;
        }
    }
</style>
