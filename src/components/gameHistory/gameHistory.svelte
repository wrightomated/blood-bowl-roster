<script lang="ts">
    let content: string[] = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];
</script>

<div>
    {#each content as c}
        <span contenteditable="true" bind:innerHTML={c} />
    {/each}
</div>

<style>
    div {
        display: flex;
    }
    span {
        margin-right: 8px;
        padding: 4px;
    }
</style>
