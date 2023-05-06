<script lang="ts">
    export let icon: string = '';
    export let caption: string;
    export let title: string = null;
    export let stringIcon: string = '';
</script>

<div class="container">
    {#if icon}
        <i class="material-symbols-outlined icon no-transition" {title}
            >{icon}</i
        >
    {:else if stringIcon}
        <p class="icon icon--string">{stringIcon}</p>
    {/if}

    {#if caption}
        <p>{caption}</p>
    {/if}
</div>

<style lang="scss">
    .container {
        flex: 1;
        text-align: center;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 12px;
        padding: 12px;

        p {
            margin-block-start: 0;
            margin-block-end: 0;
            text-transform: capitalize;
        }

        .icon {
            font-size: 36px;
            font-variation-settings: 'FILL' 0;
            &--string {
                font-family: var(--display-font);
                line-height: 1.1;
                @media screen and (max-width: 500px) {
                    line-height: 1.2;
                }
            }
        }
    }
</style>
