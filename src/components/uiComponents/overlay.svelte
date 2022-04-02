<script lang="ts">
    import { overlayVisible } from '../../store/overlayVisible.store';
</script>

<div
    class="overlay"
    class:overlay--visible={$overlayVisible}
    on:click={() => overlayVisible.set(false)}
/>

<style lang="scss">
    .overlay {
        z-index: 10;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.33);
        transition: opacity 250ms ease-in-out;
        opacity: 0;
        visibility: hidden;
        display: block;

        &--visible {
            visibility: visible;
            opacity: 1;
        }
    }
</style>
