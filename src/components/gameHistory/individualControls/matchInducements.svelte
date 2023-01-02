<script lang="ts">
    export let inducements: (string | number)[][];
    export let showTitle: boolean = true;
</script>

<div class="inducements-container">
    {#if showTitle}
        <h3>Inducements</h3>
    {/if}
    <div class="inducements">
        {#if inducements.length <= 0}<span class="inducements--none">None</span
            >{/if}
        {#each inducements as i}
            <div>{i[0]}{i[1] > 1 ? ` x ${i[1]}` : ''}</div>
        {/each}
    </div>
</div>

<style lang="scss">
    .inducements-container {
        flex: 3;
        border-radius: 12px;
        h3 {
            margin: 12px;
            text-align: center;
        }
    }
    .inducements {
        border-radius: 12px;
        display: flex;
        flex-flow: row wrap;
        gap: 8px;
        &--none {
            text-align: center;
            width: 100%;
        }
        div {
            flex: 1 1 40%;
            margin: 0;
            background-color: var(--secondary-background-colour);
            border-radius: 8px;
            padding: 12px;
            font-size: 14px;
            @media screen and (max-width: 600px) {
                flex-basis: 90%;
            }
        }
    }
</style>
