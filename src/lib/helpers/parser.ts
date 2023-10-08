export const getBreadcrumbs = (pathname: string) =>
{
    const split = pathname.split('/').slice(1);
    const breadcrumbs = split.map((val, idx) => ({
        label: val,
        href: '/' + split.slice(0, idx + 1).join('/')
    }));
    return breadcrumbs;
};

export function formatBytes(bytes: number, decimals = 2)
{
    if (!+bytes) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function queryString(obj: any)
{
    return Object.keys(obj).map(key => !!obj[key] ? key + '=' + obj[key] : "").join('&');
}