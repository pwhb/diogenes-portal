import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { getMany } from "$lib/api/common";
import { Collections } from "$lib/consts/db";

export const load: PageServerLoad = async ({ params, url }) =>
{
    const data = await getMany(Collections.routes, url.search ? `${url.search}&sort_by=entity,method` : "?page=0&limit=10&sort_by=entity,method");
    console.log("url", url.search ? `${url.search}&sort_by=entity,method` : "?page=0&limit=10&sort_by=entity,method");

    if (data)
    {
        return data;
    }


    throw error(404, 'Not found');
};