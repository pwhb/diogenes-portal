import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getPermissions } from "$lib/api/common";



export const load: LayoutServerLoad = async ({ locals }) =>
{
    if (!locals.user)
    {
        throw redirect(302, '/auth/login');
    }
    const permissions = await getPermissions(locals.token);
    return {
        user: locals.user,
        token: locals.token,
        ...permissions.data
    };
};