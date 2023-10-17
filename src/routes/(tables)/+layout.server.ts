import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getOneByKey, getPermissions } from '$lib/api/common';
import { Collections } from "$lib/consts/db";

export const load: LayoutServerLoad = async ({ locals }) =>
{
	if (!locals.user)
	{
		throw redirect(302, '/auth/login');
	}
	const permissions = await getPermissions(locals.token);
	const config = await getOneByKey(Collections.configs, "frontend");
	const portal = await getOneByKey(Collections.configs, "portal");
	return {
		user: locals.user,
		token: locals.token,
		config: config,
		portal: portal,
		...permissions.data
	};
};
