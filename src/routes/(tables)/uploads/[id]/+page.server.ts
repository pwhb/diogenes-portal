import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMany, getOne, getOneByKey } from '$lib/api/common';
import { Collections } from '$lib/consts/db';

export const load: PageServerLoad = async ({ params }) =>
{
	try
	{
		const data = await getOneByKey(Collections.uploads, params.id, "getInfoById");
		return {
			data: data.data,
		};

	} catch (e)
	{
		console.error(e);
		throw error(404, 'Not found');
	}
};
