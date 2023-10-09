import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { getMany } from "$lib/api/common";
import { Collections } from "$lib/consts/db";

export const load: PageServerLoad = async ({ params, url }) =>
{
    const data = await getMany(Collections.uploads, `${url.search ? url.search : "?page=0&limit=10"}`);
    if (data)
    {
        return data;
    }


    throw error(404, 'Not found');
};