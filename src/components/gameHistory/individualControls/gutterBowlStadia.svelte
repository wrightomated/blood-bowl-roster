<script lang="ts">
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';

    function roll(event) {
        const result: number = event.detail.result;
        $roster.matchDraft.stadium.category =
            result < 4 ? 'Street Pitch' : 'Sewer Pitch';
    }
</script>

<div class="boxed-div">
    <label for="gutter-bowl-stadium">Pitch Type</label>
    <select
        name="gutter-bowl-stadium"
        id="gutter-bowl-stadium"
        bind:value={$roster.matchDraft.stadium.category}
    >
        <option value="Street Pitch">Street Pitch</option>
        <option value="Sewer Pitch">Sewer Pitch</option>
    </select>
    <Die faces={6} on:rolled={roll} />
</div>

<style>
    .boxed-div {
        grid-column: span 2;
    }

    select {
        background-color: white;
    }
</style>
