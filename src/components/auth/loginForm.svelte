<script lang="ts">
    import { showSpinner } from '../../store/showSpinner.store';

    import FootballSpinner from '../uiComponents/footballSpinner.svelte';

    $: emailV = '';
    $: passwordV = '';
    let formTouched = false;
    let wrongCombination = false;
    async function login(e: Event) {
        showSpinner.set(true);
        e.preventDefault();
        try {
            await import('./firebaseAuth.service').then((service) =>
                service.signInWithEmail(emailV, passwordV)
            );
        } catch (error) {
            console.log({ error });
            if (error?.code === 'auth/wrong-password') {
                wrongCombination = true;
            }
        } finally {
            showSpinner.set(false);
        }
    }
    const touchForm = () => {
        formTouched = true;
    };
</script>

{#if $showSpinner}
    <FootballSpinner />
    <p>Logging in</p>
{:else}
    <form
        class="login-form"
        class:login-form--touched={formTouched}
        on:submit|preventDefault={login}
    >
        <p>Log into your account.</p>
        <label for="email">Email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="your email address"
            bind:value={emailV}
            required
        />
        <label for="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            bind:value={passwordV}
            required
            minlength="6"
        />
        <br />
        {#if wrongCombination}
            <p class="error"><strong>Incorrect email or password.</strong></p>
        {/if}
        <button on:focus={touchForm}>Login</button>
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

    .error {
        color: var(--main-colour);
    }
</style>
