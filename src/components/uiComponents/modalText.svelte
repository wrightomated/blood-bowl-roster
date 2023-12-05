<script>
    import { _ } from 'svelte-i18n';

    export let text = '';
</script>

<p>{$_(text)}</p>

<style lang="scss">
    p {
        text-align: center;
        font-family: var(--display-font);
        font-size: 20px;
        color: var(--main-colour);
    }
</style>
