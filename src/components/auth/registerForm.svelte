<script lang="ts">
    import { showSpinner } from '../../store/showSpinner.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getRostersForUpload } from '../../helpers/localToFirebase';
    import { modalState } from '../../store/modal.store';
    import { currentUserStore } from '../../store/currentUser.store';
    import Button from '../uiComponents/button.svelte';
    import { onMount } from 'svelte';

    $: emailV = '';
    $: passwordV = '';
    $: usernameV = '';
    let formTouched = false;
    let emailError = '';
    let loadingText = '';

    onMount(() => {
        document.getElementById('username')?.focus();
    });

    async function register(e: Event) {
        modalState.enableClose(false);
        showSpinner.set(true);
        e.preventDefault();
        emailError = '';
        try {
            loadingText = 'Creating account.';
            await import('./firebaseAuth.service').then((service) =>
                service.createUser(emailV, passwordV, usernameV)
            );
            loadingText = 'Uploading saved rosters.';
            await import('./firebaseDB.service').then((service) => {
                const rosters = getRostersForUpload();
                service.uploadRosters(rosters);
            });
        } catch (error) {
            console.log({ error });
            if (error?.code === 'auth/email-already-in-use') {
                emailError = emailV;
            }
        } finally {
            modalState.enableClose(true);
            showSpinner.set(false);
        }
    }
    const touchForm = () => {
        formTouched = true;
    };
</script>

{#if $showSpinner}
    <FootballSpinner {loadingText} />
{:else if $currentUserStore}
    <div class="logged-in">
        <p>Successfully Registered!</p>
        <Button clickFunction={() => modalState.close()}>Okay</Button>
    </div>
{:else}
    <form
        class="registration-form"
        class:registration-form--touched={formTouched}
        on:submit|preventDefault={register}
    >
        <h2>Register your account</h2>
        <p class="intro-text">
            Registering an account means you can log in from any device and
            still have access to all your rosters. Any roster you've currently
            got stored will be uploaded to your account on registration. There
            is no cost associated with this.
        </p>
        <label for="username">Display name:</label>
        <input
            type="text"
            name="username"
            id="username"
            placeholder="your coach name"
            autocomplete="username"
            bind:value={usernameV}
            required
        />
        <br />
        <label for="email">Email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="email that you will log in with"
            autocomplete="email"
            bind:value={emailV}
            required
        />
        {#if emailError}
            <p class="error"><strong>{emailError} already in use.</strong></p>
        {/if}
        <br />
        <label for="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="make it unique"
            bind:value={passwordV}
            required
            minlength="6"
        />
        <br />

        <!-- {#if $savedRosterIndex.index.length > 0}
            <label for="upload-lists">Upload saved rosters:</label>
            <input
                type="checkbox"
                id="upload-lists"
                name="upload-lists"
                bind:checked={updateSavedRosters}
            />
            <br />
        {/if} -->
        <button on:focus={touchForm}>Register</button>
    </form>
{/if}

<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    .registration-form {
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin: 0 auto;
        max-width: 400px;
        &--touched {
            input:invalid {
                border-color: var(--main-colour);
            }
        }
    }
    .intro-text {
        margin-top: 0;
    }

    input {
        font-size: 16px;
        margin-bottom: 8px;
        height: 48px;
    }

    label {
        margin-bottom: 4px;
    }

    button {
        @include roundedButton.rounded-button;
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
