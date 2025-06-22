<script lang="ts">
    export let variant: 'default' | 'filled' = 'default';
</script>

<div class="pill {variant}">
    <slot />
</div>

<style>
    .pill {
        text-transform: capitalize;
        font-weight: bold;
        font-family: var(--display-font);
    }

    .filled {
        display: inline-block;
        background-color: var(--main-colour);
        color: white;
        border-radius: 12px;
        padding: 2px 6px;
        font-size: 12px;
    }
</style>
