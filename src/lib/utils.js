import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
            <stop stop-color="#ededed" offset="20%" />
            <stop stop-color="#e5e5e5" offset="50%" />
            <stop stop-color="#dadada" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#1a2c38" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" fill-opacity="0.1" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

export const imageLoader = (src) => {
    return src;
};

export const getAge = () => {
    const diff= Date.now() - new Date(1989, 9, 28).getTime();
    const ageDt= new Date(diff);

    return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const getAverageByCategory = (data, arrayToMatch) => {
    const result = data.filter(x => arrayToMatch.includes(x.category)).map(x => +x.value);
    const sumResult = result.reduce((prev, curr) => prev + curr, 0);

    return sumResult / result.length;
};

export const formatDateByNanoAndSeconds = (start, end)=> ({
    startDate: nanoAndSecondsToDate(start.seconds, start.nanoseconds),
    endDate: end ? nanoAndSecondsToDate(end.seconds, end.nanoseconds) : null
});

export const orderByDate = data => {
    const formatList = data.map(item => ({ ...item, start: item.start.seconds, end: !item.currentJob ? item.end?.seconds : '' }))
    const sort = orderByProperty(formatList, 'start', true)

    return formatDate(sort)
}

export const orderByProperty = (data, property, desc= false)=> !desc ? data.sort((a, b)=> a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0) : data.sort((a, b)=> (a[property] < b[property]) ? 1 : (b[property] < a[property]) ? -1 : 0);

const nanoAndSecondsToDate = (seconds, nanoseconds)=> new Date(seconds * 1000 + nanoseconds/1000000);

const formatDate = data => {
    return data.map(item => {
        const { start, end } = { start: unixToDate(item.start), end: unixToDate(item?.end) };

        return {
            ...item,
            start: dayjs(start).format('DD/MM/YYYY'),
            end: !item.currentJob ? dayjs(end).format('DD/MM/YYYY') : ''
        };
    });
};

const unixToDate = value => new Date(value * 1000);