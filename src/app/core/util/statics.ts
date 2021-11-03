export function strToMins(time: string) {
    let s = time.split(':');
    if (s[0] === '0') {
        s[0] = '24';
    }
    return Number(s[0]) * 60 + Number(s[1]);
}

export function minsToStr(time: number) {
    return Math.trunc(time / 60) + ':' + ('00' + (time % 60)).slice(-2);
}
