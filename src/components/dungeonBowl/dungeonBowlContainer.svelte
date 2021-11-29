<script lang="ts">
    import { dungeonBowlColleges } from '../../data/dungeonBowlColleges.data';
    import { dbCollegeToTeam } from '../../models/dungeonBowl.model';
    import { currentTeam } from '../../store/currentTeam.store';
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

    $: selectedCollege = dungeonBowlColleges.colleges[0];
    const selectCollege = (college) => {
        (selectedCollege = college), setCurrentTeam(college);
    };
    const newTeam = () => {
        savedRosterIndex.newId();
        roster.reset({
            teamId: selectedCollege.id,
            teamType: selectedCollege.name,
            mode: $rosterMode,
            fans: 0,
            format: $teamFormat,
        });
        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);
        showDungeonBowl.set(false);
        showNewTeamDialogue.set(false);
    };
    const setCurrentTeam = (college) => {
        currentTeam.set(dbCollegeToTeam(college));
    };
</script>

{#if $showDungeonBowl}
    <div>
        <h3>Under Constuction</h3>
        <div class="college-buttons">
            {#each dungeonBowlColleges.colleges as college}
                <button
                    class="college-button college-button--{college.name.toLowerCase()}"
                    class:selected={selectedCollege.name === college.name}
                    on:click={() => selectCollege(college)}
                    >{college.name}</button
                >
            {/each}
        </div>
    </div>

    <DungeonBowlCollegeCard college={selectedCollege} />

    <button class="create-team-button" on:click={newTeam}>Create</button>
{/if}

<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    $colleges: 'fire', 'shadow', 'metal', 'light', 'death', 'life', 'beasts',
        'heavens';

    .college-cards {
        display: flex;
    }

    .create-team-button {
        @include roundedButton.rounded-button;
        margin-top: 12px;
    }

    .college-button {
        @include roundedButton.rounded-button;
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
