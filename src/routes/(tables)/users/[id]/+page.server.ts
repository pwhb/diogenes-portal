import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params }) =>
{
	try
	{
		const data = await getOne(Collections.users, params.id);
		if (data)
		{
			return data;
		}

		throw error(404, 'Not found');

	} catch (e)
	{
		console.error(e);
		throw error(404, 'Not found');
	}
};
