<script lang="ts">
    export let text: string;
</script>

<div class="pill">
    {text}
</div>

<style>
    .pill {
        text-transform: capitalize;
        font-weight: bold;
        font-family: var(--display-font);
    }
</style>
