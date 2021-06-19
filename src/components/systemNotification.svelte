<script lang="ts">
    import { systemNotificationMessage } from '../store/systemNotification.store';
    import MaterialButton from './uiComponents/materialButton.svelte';

    const deleteNotification = () => systemNotificationMessage.set('');
</script>

{#if $systemNotificationMessage}
    <div class="notification__container">
        <div class="notification__content">
            <i class="material-icons">warning</i>
            <p>{$systemNotificationMessage}</p>
            <div class="notification__close">
                <MaterialButton
                    symbol="cancel"
                    clickFunction={deleteNotification}
                    hoverText="close"
                />
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    @import '../styles/colour';
    .notification {
        &__container {
            border: 2px solid $main-colour;
            border-radius: 10px;
            position: sticky;
            top: calc(1em / 2);
            background-color: $main-background-colour;
            z-index: 1000;
        }
        &__content {
            display: flex;
            align-items: center;
        }
        &__close {
            margin-left: auto;
            margin-right: calc(1em / 2);
        }
    }
    p {
        margin: 1em;
    }
    i {
        color: $main-colour;
        margin-left: calc(1em / 2);
    }
</style>
