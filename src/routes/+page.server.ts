import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
{

	if (locals.user)
	{
		throw redirect(302, `/users/${locals.user._id}`);
	} else
	{
		throw redirect(302, '/auth/login');
	}


};
