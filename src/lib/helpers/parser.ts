export const getBreadcrumbs = (pathname: string) =>
{
    const split = pathname.split('/').slice(1);
    const breadcrumbs = split.map((val, idx) => ({
        label: val,
        href: '/' + split.slice(0, idx + 1).join('/')
    }));
    return breadcrumbs;
};