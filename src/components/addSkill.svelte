<script lang="ts">
    import { skillCatalogue } from '../data/skills.data';
    import type { RosterPlayerRecord } from '../models/roster.model';
    import { roster } from '../store/teamRoster.store';

    export let rosterPlayer: RosterPlayerRecord;
    export let index: number;

    $: rosterPlayer = $roster.players[index];

    $: availableSkills = skillCatalogue.filter(
        (x) =>
            !rosterPlayer.alterations?.extraSkills?.includes(x.id) &&
            !rosterPlayer.player.skills.includes(x.id),
    );

    $: primarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.primary.includes(s.category),
    );
    $: secondarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.secondary.includes(s.category),
    );

    const addSkill = (skillId: number) => {
        const extraSkills = (
            rosterPlayer.alterations.extraSkills || []
        ).concat([skillId]);
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                extraSkills: extraSkills,
            },
        };
        roster.updatePlayer(newPlayer, index);
    };
</script>

<style lang="scss">
    div {
        max-width: 90vw;
        text-align: left;
        position: sticky;
        left: 0;
        top: 0;
        // padding-left: 16px;
    }
    button {
        @import '../styles/colour';
        border-radius: 10px;
        background-color: white;
        color: $secondary-colour;
        padding: 10px;
        margin: 5px;
        border: 2px solid $secondary-colour;

        &:hover {
            background-color: $secondary-colour;
            color: white;
            border-color: $secondary-colour;
        }
    }
</style>

<div>
    Primary Skills
    {#each rosterPlayer.player.primary as category}
        <div>
            {category}:
            {#each primarySkills.filter((s) => s.category === category) as s}
                <button on:click={() => addSkill(s.id)}>{s.name}</button>
            {/each}
        </div>
    {/each}

    Secondary Skills:
    {#each rosterPlayer.player.secondary as category}
        <div>
            {category}:
            {#each secondarySkills.filter((s) => s.category === category) as s}
                <button>{s.name}</button>
            {/each}
        </div>
    {/each}
</div>
