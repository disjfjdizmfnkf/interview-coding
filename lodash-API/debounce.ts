function debounce<A extends any[], R>(
    fn: (...args: A) => R,
    delay: number = 300,
): (...args: A) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    };
}