export const sendEventToPlausible = (name: string, props: PlausibleProps) => {
    (window as any).plausible(name, { props });
};

interface PlausibleProps {
    [key: string]: string | number | boolean;
}
