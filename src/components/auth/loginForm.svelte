<script lang="ts">
    // import { sendVerificationEmail } from './firebase.service';

    $: emailV = '';
    $: passwordV = '';
    async function login(e: MouseEvent) {
        e.preventDefault();
        try {
            // await loginFirebase(emailV, passwordV);
        } catch (error) {
            console.log({ error });
            if (error?.code === 'auth/email-already-in-use') {
                console.log('email in use');
            }
        }
    }
</script>

<form class="login-form">
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
    <br />
    <button on:click={login}>Register</button>
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
        margin-bottom: 8px;
    }

    label {
        font-family: var(--display-font);
    }

    button {
        @include roundedButton.rounded-button;
    }
</style>
