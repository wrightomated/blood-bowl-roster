<script lang="ts">
    import { showSpinner } from '../../store/showSpinner.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getRostersForUpload } from '../../helpers/localToFirebase';
    import { modalState } from '../../store/modal.store';
    import { currentUserStore } from '../../store/currentUser.store';
    import Button from '../uiComponents/button.svelte';
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';

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
        <p>{$_('success')}</p>
        <Button clickFunction={() => modalState.close()}
            >{$_('common.ok')}</Button
        >
    </div>
{:else}
    <form
        class="registration-form"
        class:registration-form--touched={formTouched}
        on:submit|preventDefault={register}
    >
        <h2>{$_('register.account')}</h2>
        <p class="intro-text">
            {$_('register.info')}
        </p>
        <label for="username">{$_('tables.coach')}:</label>
        <input
            type="text"
            name="username"
            id="username"
            placeholder={$_('tables.coach')}
            autocomplete="username"
            bind:value={usernameV}
            required
        />
        <br />
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
        {#if emailError}
            <p class="error">
                <strong
                    >{$_('register.duplicate', {
                        values: { e: emailError },
                    })}</strong
                >
            </p>
        {/if}
        <br />
        <label for="password">{$_('register.password')}:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder={$_('register.password')}
            bind:value={passwordV}
            required
            minlength="6"
        />

        <p>
            {$_('register.disc')}
            <br />
            <br />
            <a
                href="https://blog.bbroster.com/private-policy/"
                target="_blank"
                class="blog-link">{$_('footer.terms')}</a
            >
            |
            <a
                href="https://blog.bbroster.com/terms-of-use/"
                target="_blank"
                class="blog-link">{$_('footer.privacy')}</a
            >
        </p>
        <button class="rounded-button" on:focus={touchForm}
            >{$_('menu.register')}</button
        >
    </form>
{/if}

<style lang="scss">
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

    .logged-in {
        text-align: center;
        p {
            font-family: var(--display-font);
            font-size: 20px;
        }
    }
</style>
