export const sendEventToAnalytics = (name: string, props?: AnalyticsProps) => {
    // googleAnalyticsEvent(name, props);
    // const gtag = (window as any).gtag;
    // props ? gtag('event', name, { props }) : plausible(name);
    // gtag('event', 'screen_view', {
    //     app_name: 'myAppName',
    //     screen_name: 'Home',
    // });
};

const googleAnalyticsEvent = (name: string, props: AnalyticsProps = {}) => {
    const gtag = (window as any).gtag;
    gtag('event', name, props);
};

// export const sendEventToPlausible = (name: string, props?: PlausibleProps) => {
//     const plausible = (window as any).plausible;
//     props ? plausible(name, { props }) : plausible(name);
// };

interface AnalyticsProps {
    [key: string]: string | number | boolean;
}
