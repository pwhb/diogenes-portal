import type { LayoutServerLoad } from './$types';
import { getMany } from '$lib/api/common';
import { Collections } from "$lib/consts/db";

export const load: LayoutServerLoad = async ({ locals }) =>
{

	const uploadsRes = await getMany(Collections.uploads, '?type=image&limit=5000&active=true&sort_by=createdAt');

	return {
		uploads: uploadsRes.data
	};
};
