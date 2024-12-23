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
    import { showDungeonBowl } from '../store/showDungeonBowl.store';
    import type { TeamFormat } from '../types/teamFormat';

    import SelectSpecialRule from './selectSpecialRule.svelte';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';
    import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
    import { customisationRules } from '../customisation/customisation.store';
    import { _ } from 'svelte-i18n';
    import LoadTeam from './loadTeam.svelte';
    import { secretTeams } from '../modules/secret-league/secretTeams.store';
    import { playerCatalogue } from '../store/playerCatalogue.store';
    import TeamAutoComplete from './uiComponents/autocomplete/teamAutoComplete.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { modalState } from '../store/modal.store';

    export let teamList: (Team | CustomTeam)[];

    let includeNaf: boolean = true;

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

    let sortedTeam: (Team | CustomTeam)[];
    $: sortedTeam = sortTeam()
        .filter((x) => $filteredTiers.includes(x.tier))
        .filter((x) => (!includeNaf ? !nafTeams.includes(x.id) : true))
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

    const teamUpdated = (e) => {
        if (e.detail.teamId) {
            newTeam(e.detail.teamId);
        }
    };

    const newTeam = (id: string) => {
        currentTeamId.set(id);

        console.log(id);

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

    const toggleDungeonBowl = (show: boolean) => {
        teamLoadOpen.set(false);
        teamSelectionOpen.set(!show);
        showDungeonBowl.set(show);
    };

    function changeFormat(format: any) {
        teamFormat.set(format);
        toggleDungeonBowl(format === 'dungeon bowl');
    }

    async function loadSecretTeams() {
        const modules = await Promise.all([
            import('../modules/secret-league/secretTeam.data'),
            import('../modules/secret-league/secretPlayer.data'),
        ]);
        const secretTeamsData = modules[0].secretTeamData;
        secretTeams.set(secretTeamsData);

        const secretPlayersData = modules[1].secretPlayerData;
        playerCatalogue.setSecretPlayers(secretPlayersData);
        return secretTeamsData;
    }

    async function showModeInfo() {
        modalState.modalLoading();
        const info = await import('../modules/infoBlock/rosterModeInfo.svelte');
        modalState.set({
            ...$modalState,
            componentProps: {},
            component: info.default,
            canClose: true,
        });
    }
    async function showFormatInfo() {
        modalState.modalLoading();
        const info = await import(
            '../modules/infoBlock/rosterFormatInfo.svelte'
        );
        modalState.set({
            ...$modalState,
            componentProps: {},
            component: info.default,
            canClose: true,
        });
    }

    // {#if searchTerm === 'secret'}
    //                 {#await loadSecretTeams()}
    //                     FUMBLE MAGIC
    //                 {:then secretTeams}
    //                     {#each secretTeams as st (st.id)}
    //                         <button
    //                             class="team-button rounded-button"
    //                             animate:flip={{ duration: 200 }}
    //                             transition:scale|local={{ duration: 200 }}
    //                             class:selected={$currentTeam?.id === st?.id}
    //                             on:click={() => newTeam(st.id)}
    //                             >{st.name}
    //                             <span class="display-font"
    //                                 >{tierToNumeral(st.tier)}</span
    //                             ></button
    //                         >
    //                     {/each}
    //                 {/await}
    //             {/if}
</script>

{#if !$teamLoadOpen && $showNewTeamDialogue}
    <h2 class="page-title">
        {$customisationRules?.customContent?.createTeamTitle ||
            $_('creation.title')}
    </h2>
    <div class="select-area">
        {#if rosterModes.length > 1}
            <div class="flex">
                <ToggleButton
                    options={rosterModes}
                    selectedIndex={rosterModes.indexOf($rosterMode)}
                    selected={(mode) => {
                        rosterMode.set(mode);
                    }}
                />
                <MaterialButton
                    symbol="info"
                    hoverText={'Information'}
                    clickFunction={showModeInfo}
                ></MaterialButton>
            </div>
        {/if}

        {#if teamFormats.length > 1}
            <div class="flex">
                <ToggleButton
                    options={teamFormats}
                    selectedIndex={teamFormats.indexOf($teamFormat)}
                    selected={(format) => {
                        changeFormat(format);
                    }}
                />
                <MaterialButton
                    symbol="info"
                    hoverText={'Information'}
                    clickFunction={showFormatInfo}
                ></MaterialButton>
            </div>
        {/if}

        {#if $teamSelectionOpen}
            <TeamAutoComplete
                teamList={sortedTeam}
                on:teamSelected={teamUpdated}
            />
            {#if $currentTeam?.pickSpecialRule}
                <SelectSpecialRule />
            {/if}

            {#if $currentTeam && !$currentTeamIsDungeonBowl}
                <Button
                    clickFunction={createTeam}
                    cyData="create-team"
                    disabled={!$currentTeam || $currentTeamIsDungeonBowl}
                    >{$_('creation.create') +
                        ' ' +
                        $_('teams.names.' + $currentTeam?.id)} Team</Button
                >
            {/if}
        {/if}
    </div>
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

    .select-area {
        max-width: 600px;
        margin: 0 auto;
    }
</style>
