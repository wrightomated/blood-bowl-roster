<script lang="ts">
    import { onMount } from 'svelte';

    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';

    import { showSpinner } from '../../store/showSpinner.store';
    import Button from '../uiComponents/button.svelte';

    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getAuthModal } from './getAuthFormModule';
    import { _ } from 'svelte-i18n';

    $: emailV = '';
    $: passwordV = '';
    let formTouched = false;
    let errorText = '';

    onMount(() => {
        document.getElementById('email')?.focus();
    });

    async function login(e: Event) {
        errorText = '';
        modalState.enableClose(false);
        showSpinner.set(true);
        e.preventDefault();
        try {
            await import('./firebaseAuth.service').then((service) =>
                service.signInWithEmail(emailV, passwordV)
            );
        } catch (error) {
            console.log({ error });
            if (
                error?.code === 'auth/wrong-password' ||
                error?.code === 'auth/user-not-found'
            ) {
                errorText = $_('errors.incorrect');
            } else {
                errorText = $_('errors.generic');
            }
        } finally {
            modalState.enableClose(true);
            showSpinner.set(false);
        }
    }
    function touchForm() {
        formTouched = true;
    }

    async function passwordReset() {
        const component = await getAuthModal('reset');
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: component.default,
        });
    }
</script>

{#if $showSpinner}
    <FootballSpinner loadingText={$_('loading')} />
{:else if $currentUserStore}
    <div class="logged-in">
        <p>{$_('success')}</p>
        <Button clickFunction={() => modalState.close()}
            >{$_('common.ok')}</Button
        >
    </div>
{:else}
    <form
        class="login-form"
        class:login-form--touched={formTouched}
        on:submit|preventDefault={login}
    >
        <h2>{$_('auth.loginTitle')}</h2>
        <label for="email">{$_('common.email')}:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder={$_('common.email')}
            bind:value={emailV}
            autocomplete="email"
            required
        />
        <label for="password">{$_('register.password')}:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder={$_('register.password')}
            bind:value={passwordV}
            autocomplete="current-password"
            required
            minlength="6"
        />
        <br />
        {#if errorText}
            <p class="error"><strong>{errorText}</strong></p>
        {/if}
        <button class="login-button rounded-button" on:focus={touchForm}
            >{$_('menu.login')}</button
        >
    </form>
    <button
        class="reset-password"
        on:click={async () => {
            await passwordReset();
        }}>{$_('auth.forgot')}</button
    >
{/if}

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
    .reset-password {
        text-align: center;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--secondary-colour);
        width: 100%;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
