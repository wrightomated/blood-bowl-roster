<script lang="ts">
    import { roster } from "../store/teamRoster.store";
    import { savedRosterIndex } from "../store/saveDirectory.store";
    import MaterialButton from "./materialButton.svelte";

    let saved = false;
    let rosterCleared = false;

    const saveRoster = () => {
        savedRosterIndex.addRoster($roster);
        saved = true;
    };

    const clearRoster = () => {
        roster.reset();
        savedRosterIndex.removeRoster();
        rosterCleared = true;
    };

    roster.subscribe((x) => {
        saved = false;
        rosterCleared = false;
    });
</script>

<style lang="scss">
    .saved {
        color: green;
        margin-bottom: 3px;
    }
</style>

{#if !saved}
    <MaterialButton symbol="save" clickFunction={() => saveRoster()} />
{:else}<i class="material-icons saved">check_circle</i>{/if}
{#if !rosterCleared}
    <MaterialButton symbol="delete_forever" clickFunction={clearRoster} />
{/if}