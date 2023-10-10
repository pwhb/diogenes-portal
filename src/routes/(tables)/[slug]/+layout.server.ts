import type { LayoutServerLoad } from './$types';
import { getMany } from '$lib/api/common';
import { Collections } from "$lib/consts/db";

export const load: LayoutServerLoad = async ({ locals, params }) =>
{
	return {
		slug: params.slug
	};
};
