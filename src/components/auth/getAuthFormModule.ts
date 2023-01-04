export async function getAuthModal(modalType: 'login' | 'reset' | 'register') {
    const components = {
        login: import('./loginForm.svelte'),
        reset: import('./resetPassword.svelte'),
        register: import('./registerForm.svelte'),
    };
    return await components[modalType];
}
