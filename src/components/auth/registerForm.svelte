<script lang="ts">
    import { showSpinner } from '../../store/showSpinner.store';
    import { savedRosterIndex } from '../../store/saveDirectory.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getRostersForUpload } from '../../helpers/localToFirebase';
    import { modalState } from '../../store/modal.store';
    import { currentUserStore } from '../../store/currentUser.store';

    $: emailV = '';
    $: passwordV = '';
    $: usernameV = '';
    $: updateSavedRosters = true;
    let formTouched = false;
    let emailError = '';
    let loadingText = '';

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
    <FootballSpinner loadingText="Registering user" />
{:else if $currentUserStore}
    <h3>Successfully registered!</h3>
{:else}
    <form
        class="registration-form"
        class:registration-form--touched={formTouched}
        on:submit|preventDefault={register}
    >
        <label for="username">Display name:</label>
        <input
            type="text"
            name="username"
            id="username"
            placeholder="your display name"
            bind:value={usernameV}
            required
        />
        <br />
        <label for="email">Email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="your email address"
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
            placeholder="your password"
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
