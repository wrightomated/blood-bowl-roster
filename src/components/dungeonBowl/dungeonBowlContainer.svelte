<script lang="ts">
    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import Button from '../uiComponents/button.svelte';

    const dungeonBowlColleges: string[] = [
        'Fire',
        'Shadow',
        'Metal',
        'Light',
        'Death',
        'Life',
        'Beasts',
        'Heavens',
    ];
</script>

{#if $showDungeonBowl}
    <h2 class="page-title">Dungeon Bowl</h2>
    <div class="button-container">
        <h3>Coming "Soon"</h3>
        <p>Well this is a little exciting isn't it.</p>
        {#each dungeonBowlColleges as college}
            <Button disabled>{college}</Button>
        {/each}
    </div>
{/if}

<style lang="scss">
    .button-container {
        border-radius: 10px;
        background: var(--secondary-background-colour);
        padding: 8px;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .page-title {
        color: var(--main-colour);
        text-align: center;
        font-size: 32px;
        margin-block-start: 16px;
        margin-block-end: 24px;
    }
</style>
