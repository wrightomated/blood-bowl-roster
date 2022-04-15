<script lang="ts">
    import { createUser, sendVerificationEmail } from './firebase.service';

    $: emailV = '';
    $: passwordV = '';
    $: usernameV = '';
    async function register(e: MouseEvent) {
        e.preventDefault();
        try {
            await createUser(emailV, passwordV);
        } catch (error) {
            console.log({ error });
            if (error?.code === 'auth/email-already-in-use') {
                console.log('email in use');
            }
        }
    }
</script>

<form class="registration-form">
    <label for="username">Username:</label>
    <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        bind:value={usernameV}
    />
    <label for="email">Email:</label>
    <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        bind:value={emailV}
    />
    <label for="password">Password:</label>
    <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        bind:value={passwordV}
    />
    <button on:click={register}>Register</button>
</form>
<button on:click={() => sendVerificationEmail()}>Send email</button>

<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    form {
        display: flex;
        flex-direction: column;
        max-width: 320px;
        padding: 20px;
    }

    input {
        font-size: 16px;
        margin-bottom: 16px;
    }

    label {
        font-family: var(--display-font);
    }

    button {
        @include roundedButton.rounded-button;
    }
</style>
