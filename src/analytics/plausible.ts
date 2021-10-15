export const sendEventToPlausible = (name: string, props?: PlausibleProps) => {
    const plausible = (window as any).plausible;
    props ? plausible(name, { props }) : plausible(name);
};

interface PlausibleProps {
    [key: string]: string | number | boolean;
}
