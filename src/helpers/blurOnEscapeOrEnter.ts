export const blurOnEscapeOrEnter = (node: HTMLInputElement) => {
    const handleKey = (event) => {
        if (
            (event.key === 'Escape' || event.key === 'Enter') &&
            node &&
            typeof node.blur === 'function'
        ) {
            node.blur();
        }
    };

    node.addEventListener('keyup', handleKey);

    return {
        destroy() {
            node.removeEventListener('keyup', handleKey);
        },
    };
};
