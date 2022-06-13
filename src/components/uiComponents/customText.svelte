<script lang="ts">
    $: textValue = '';
</script>

<span
    class="custom-text"
    aria-labelledby="name-header"
    contenteditable="true"
    bind:innerHTML={textValue}
    placeholder="Edit"
/>

<style lang="scss">
    .custom-text {
        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
    [contenteditable='true']:empty:before {
        content: attr(placeholder);
        pointer-events: none;
        display: block; /* For Firefox */
    }
</style>
