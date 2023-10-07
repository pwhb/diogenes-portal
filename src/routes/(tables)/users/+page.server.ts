import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { getMany } from "$lib/api/common";
import { Collections } from "$lib/consts/db";

export const load: PageServerLoad = async ({ params }) =>
{
    const data = await getMany(Collections.users);
    if (data)
    {
        return data;
    }


    throw error(404, 'Not found');
};