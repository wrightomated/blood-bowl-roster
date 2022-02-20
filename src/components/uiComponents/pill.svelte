<script lang="ts">
    export let text: string;
</script>

<div class="pill">
    {text}
</div>

<style>
    .pill {
        /* display: inline-block;
        background-color: var(--main-colour); */
        /* color: white; */
        /* padding: 8px;
        border-radius: 12px; */
        text-transform: capitalize;
        font-weight: bold;
        font-family: var(--display-font);
    }
</style>
