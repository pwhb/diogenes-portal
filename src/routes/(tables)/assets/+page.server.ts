import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params, url }) =>
{
	try
	{
		const sort_by = '&sort_by=-createdAt,name';
		const query = `${url.search ? url.search : '?page=0&limit=10'}${sort_by}`;
		const data = await getMany(Collections.assets, query);
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
