import type { LayoutServerLoad } from './$types';
import { getMany } from '$lib/api/common';
import { Collections } from "$lib/consts/db";

export const load: LayoutServerLoad = async ({ locals }) =>
{

	const rolesRes = await getMany(Collections.roles, '?active=true&sort_by=level');
	const roles = [...rolesRes.data.map((v: any) => v.name), 'all'];
	return {
		roles: roles
	};
};
