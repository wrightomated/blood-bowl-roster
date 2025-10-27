<script lang="ts">
    import { dungeonBowlColleges } from '../../data/dungeonBowlColleges.data';
    import {
        currentTeam,
        currentTeamId,
        currentTeamIsDungeonBowl,
    } from '../../store/currentTeam.store';
    import { rosterMode } from '../../store/rosterMode.store';
    import { savedRosterIndex } from '../../store/saveDirectory.store';

    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import {
        showAvailablePlayers,
        showAvailableStarPlayers,
    } from '../../store/showPlayerList.store';
    import { teamFormat } from '../../store/teamFormat.store';
    import { roster } from '../../store/teamRoster.store';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../../store/teamSelectionOpen.store';
    import DungeonBowlCollegeCard from './dungeonBowlCollegeCard.svelte';
    import Button from '../uiComponents/button.svelte';
    import { sendEventToAnalytics } from '../../analytics/plausible';
    import { _ } from 'svelte-i18n';

    const selectCollege = (college) => {
        setCurrentTeam(college);
    };
    const newTeam = () => {
        savedRosterIndex.newId();
        if ($currentTeamIsDungeonBowl) {
            roster.reset({
                teamId: $currentTeam?.id,
                teamType: $currentTeam.name,
                mode: $rosterMode,
                fans: 0,
                format: $teamFormat,
            });
        }

        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);
        showDungeonBowl.set(false);
        showNewTeamDialogue.set(false);
        sendEventToAnalytics('new-team-created', {
            teamType: $currentTeam.name,
            rosterMode: $rosterMode,
            format: $teamFormat,
        });
    };
    const setCurrentTeam = (college) => {
        currentTeamId.set(college.id);
    };
</script>

{#if $showDungeonBowl}
    <div>
        <h3>{$_('colleges.title')}</h3>
        <div class="college-buttons">
            {#each dungeonBowlColleges.colleges as college}
                <button
                    class="college-button college-button--{college.name.toLowerCase()} rounded-button"
                    class:selected={$currentTeam?.id === college.id}
                    on:click={() => selectCollege(college)}
                    >{$_('colleges.' + college.name)}</button
                >
            {/each}
        </div>
    </div>

    {#if $currentTeamIsDungeonBowl}
        <DungeonBowlCollegeCard
            college={dungeonBowlColleges.colleges.find(
                (x) => x.id === $currentTeam.id
            ) || dungeonBowlColleges.colleges[0]}
        />
    {/if}

    <Button clickFunction={newTeam} disabled={!$currentTeamIsDungeonBowl}
        >{$_('creation.create')}</Button
    >
{/if}

<style lang="scss">
    $colleges: 'fire', 'shadow', 'metal', 'light', 'death', 'life', 'beasts',
        'heavens';

    .college-cards {
        display: flex;
    }

    .college-button {
        &:hover {
            color: white;
        }

        @each $college in $colleges {
            &--#{$college} {
                &:hover,
                &.selected {
                    background-color: var(--#{$college});
                    border-color: var(--#{$college});
                }
            }
        }

        &--heavens {
            &:hover {
                color: #333;
            }
        }
    }
</style>
