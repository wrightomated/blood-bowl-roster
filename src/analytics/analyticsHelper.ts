export const sendEventToAnalytics = (name: string, props?: AnalyticsProps) => {
    googleAnalyticsEvent(name, props);
    // const gtag = (window as any).gtag;
    // props ? gtag('event', name, { props }) : plausible(name);
    // gtag('event', 'screen_view', {
    //     app_name: 'myAppName',
    //     screen_name: 'Home',
    // });
};

export const toggleAnalyticsStorage = (consent: boolean) => {
    const storageValue = consent ? 'granted' : 'denied';
    gtag('consent', 'update', {
        analytics_storage: storageValue,
    });
    console.log('analyticsUpdated');
};

const googleAnalyticsEvent = (name: string, props: AnalyticsProps = {}) => {
    gtag('event', name, props);
};

// export const sendEventToPlausible = (name: string, props?: PlausibleProps) => {
//     const plausible = (window as any).plausible;
//     props ? plausible(name, { props }) : plausible(name);
// };

const gtag = (window as any).gtag;

interface AnalyticsProps {
    [key: string]: string | number | boolean;
}
