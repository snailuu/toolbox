

export const getRandomString = (len: number = 8): string => {
    const str = Math.random().toString(36).slice(2, len + 2);
    if (str.length === len) {
        return str;
    }
    return str + getRandomString(len - str.length);
}

export const getNow = () => {
    if (typeof performance !== 'undefined') {
        return () => performance.now();
    }
    return () => Date.now();
};