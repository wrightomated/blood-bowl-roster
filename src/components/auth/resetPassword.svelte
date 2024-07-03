<script lang="ts">
    import { onMount } from 'svelte';
    import { modalState } from '../../store/modal.store';

    import { showSpinner } from '../../store/showSpinner.store';
    import Button from '../uiComponents/button.svelte';

    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getAuthModal } from './getAuthFormModule';
    import { _ } from 'svelte-i18n';

    $: emailV = '';
    let formTouched = false;
    let emailSent = false;
    let error: boolean = false;

    onMount(() => {
        document.getElementById('email')?.focus();
    });

    async function sendResetEmail(e: Event) {
        error = false;
        modalState.enableClose(false);
        showSpinner.set(true);
        e.preventDefault();
        try {
            await import('./firebaseAuth.service').then((service) =>
                service.resetPassword(emailV)
            );
            emailSent = true;
        } catch (error) {
            console.error({ error });
            error = true;
        } finally {
            modalState.enableClose(true);
            showSpinner.set(false);
        }
    }
    function touchForm() {
        formTouched = true;
    }
    async function showLogin() {
        const component = await getAuthModal('login');
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: component.default,
        });
    }
</script>

{#if $showSpinner}
    <FootballSpinner loadingText="Sending reset password email" />
{:else if emailSent}
    <div class="logged-in">
        <p>{$_('success')}</p>
        <Button
            clickFunction={async () => {
                await showLogin();
            }}>{$_('menu.login')}</Button
        >
    </div>
{:else}
    <form
        class="login-form"
        class:login-form--touched={formTouched}
        on:submit|preventDefault={sendResetEmail}
    >
        <h2>{$_('auth.reset')}</h2>
        <label for="email">{$_('common.email')}:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder={$_('common.email')}
            autocomplete="email"
            bind:value={emailV}
            required
        />
        <br />
        {#if error}
            <p class="error"><strong>{$_('errors.generic')}</strong></p>
        {/if}
        <button class="rounded-button" on:focus={touchForm}
            >{$_('auth.resetEmail')}</button
        >
    </form>
{/if}

<!-- <button on:click={() => sendVerificationEmail()}>Send email</button> -->
<style lang="scss">
    .login-form {
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin: 0 auto;
        max-width: 400px;
        &--touched {
            input:invalid {
                border-color: var(--error);
            }
        }
    }

    input {
        font-size: 16px;
        margin-bottom: 8px;
        height: 48px;
    }
    label {
        margin-bottom: 4px;
    }

    .logged-in {
        text-align: center;
        p {
            font-family: var(--display-font);
            font-size: 20px;
        }
    }
</style>
