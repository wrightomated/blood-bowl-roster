import { getAnalytics } from 'firebase/analytics';
import type { FirebaseApp } from 'firebase/app';

let analytics;

export function init(app: FirebaseApp) {
    analytics = getAnalytics(app);
}
