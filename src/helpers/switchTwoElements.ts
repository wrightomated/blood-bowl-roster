export const switchTwoElements = (
    arr: any[],
    index1: number,
    index2: number
) => {
    if (
        index1 < 0 ||
        index2 < 0 ||
        typeof arr?.[index1] === 'undefined' ||
        typeof arr?.[index2] === 'undefined'
    ) {
        return arr;
    }
    return arr.map((x, i, a) =>
        i === index1 ? a[index2] : i === index2 ? a[index1] : x
    );
};
