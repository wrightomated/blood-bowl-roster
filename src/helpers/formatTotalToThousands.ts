const numberFormatter = new Intl.NumberFormat();

export function formatNumber(input: number) {
    if (typeof input !== 'number') return input;
    return numberFormatter.format(input);
}

export function formatNumberInThousands(input: number) {
    if (typeof input !== 'number') return input;
    return formatNumber(input * 1000);
}
