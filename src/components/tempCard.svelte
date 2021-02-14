<script lang="ts">
    import SkillElement from './skillElement.svelte';
</script>

<div class="card">
    <div class="header-row">
        <p class="player-number">1</p>
        <p>Player Name</p>
        <p>Player Position</p>
    </div>

    <div>stats</div>
    <div><SkillElement playerSkillIds={[1, 13, 27]} /></div>
    <div>Hiring Fee: 60,000</div>
    <div>Current Value: 60,000</div>
    <div>
        <p>Extra</p>
        Unspent Spp, mng, ni, tr
    </div>
</div>

<style lang="scss">
    .card {
        min-width: 320px;
        max-width: 640px;
        border: 2px solid;
        border-radius: 25px;
        padding: 10px;
    }

    .header-row {
        display: flex;
        .player-number {
            background-color: darkorchid;
            width: 25px;
            height: 25px;
            border-radius: 25px;
            text-align: center;
        }
    }
</style>
