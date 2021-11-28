<script lang="ts">
    import { dungeonBowlColleges } from '../../data/dungeonBowlColleges.data';

    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import DungeonBowlCollegeCard from './dungeonBowlCollegeCard.svelte';

    $: selectedCollege = dungeonBowlColleges.colleges[0];
    const selectCollege = (college) => (selectedCollege = college);
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
{/if}

<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    $colleges: 'fire', 'shadow', 'metal', 'light', 'death', 'life', 'beasts',
        'heavens';

    .college-cards {
        display: flex;
    }

    .college-button {
        @include roundedButton.rounded-button;
        // color: #333;
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
