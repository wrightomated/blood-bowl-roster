<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';

    $: textValue = '';
</script>

<input
    aria-labelledby="name-header"
    placeholder="?"
    bind:value={textValue}
    style={`width: ${textValue.length + 3}ch`}
    use:blurOnEscapeOrEnter
/>

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
</style>
