import { Auth, sendPasswordResetEmail } from 'firebase/auth';

export async function resetPassword(auth: Auth, email: string) {
    return sendPasswordResetEmail(auth, email, {
        url: 'https://www.bbroster.com',
    });
}
