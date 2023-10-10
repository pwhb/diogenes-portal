import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params }) => {
	const data = await getOne(Collections.routes, params.id);
	const rolesRes = await getMany(Collections.roles, '?active=true&sort_by=level');
	if (data && rolesRes) {
		const roles = [...rolesRes.data.map((v: any) => v.name), 'all'];
		return {
			data: data.data,
			roles: roles
		};
	}

	throw error(404, 'Not found');
};
