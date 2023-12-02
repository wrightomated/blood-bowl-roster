<script lang="ts">
    import { _ } from 'svelte-i18n';

    export let inducements: { name: string; amount: number }[];
    export let showTitle: boolean = true;
</script>

<div class="inducements-container">
    {#if showTitle}
        <h3>{$_('match.inducements.title')}</h3>
    {/if}
    <div class="inducements">
        {#if inducements.length <= 0}<span class="inducements--none"
                >{$_('none')}</span
            >{/if}
        {#each inducements as i}
            <!-- {i} -->
            <div>{$_(i.name)}{i.amount > 1 ? ` x ${i.amount}` : ''}</div>
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
