<script lang="ts">
    import { onMount } from 'svelte';
    import { modalState } from '../../store/modal.store';

    import { showSpinner } from '../../store/showSpinner.store';
    import Button from '../uiComponents/button.svelte';

    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import LoginForm from './loginForm.svelte';

    $: emailV = '';
    let formTouched = false;
    let emailSent = false;
    let errorText = '';

    onMount(() => {
        document.getElementById('email')?.focus();
    });

    async function sendResetEmail(e: Event) {
        errorText = '';
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
            errorText = 'Something went wrong';
        } finally {
            modalState.enableClose(true);
            showSpinner.set(false);
        }
    }
    function touchForm() {
        formTouched = true;
    }
    function showLogin() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: LoginForm,
        });
    }
</script>

{#if $showSpinner}
    <FootballSpinner loadingText="Sending reset password email" />
{:else if emailSent}
    <div class="logged-in">
        <p>Email sent!</p>
        <Button clickFunction={showLogin}>Login</Button>
    </div>
{:else}
    <form
        class="login-form"
        class:login-form--touched={formTouched}
        on:submit|preventDefault={sendResetEmail}
    >
        <p>Reset your password.</p>
        <label for="email">Email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="your email address"
            bind:value={emailV}
            required
        />
        <br />
        {#if errorText}
            <p class="error"><strong>{errorText}</strong></p>
        {/if}
        <button on:focus={touchForm}>Send Reset Email</button>
    </form>
{/if}

<!-- <button on:click={() => sendVerificationEmail()}>Send email</button> -->
<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    .login-form {
        display: flex;
        flex-direction: column;
        max-width: 320px;
        padding: 20px;
        &--touched {
            input:invalid {
                border-color: var(--main-colour);
            }
        }
    }

    input {
        font-size: 16px;
        margin-bottom: 8px;
    }

    label {
        font-family: var(--display-font);
    }

    button {
        @include roundedButton.rounded-button;
    }

    h3 {
        text-align: center;
    }

    .error {
        color: var(--main-colour);
    }

    .logged-in {
        text-align: center;
        p {
            font-family: var(--display-font);
            font-size: 20px;
        }
    }
</style>
