import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) =>
{
	if (locals.user) {
		throw redirect(302, '/users');
	} else {
		throw redirect(302, '/auth/login');
	}
	
};

const login: Action = async ({ request, cookies }) =>
{
	try
	{
		const data = await request.formData();
		const { username, password } = Object.fromEntries(data);

		const url = `${PUBLIC_BACKEND_URL}/auth/login`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		const json = await res.json();

		if (res.ok)
		{
			if (json.data.user.role === 'player')
			{
				return fail(400, { message: 'Not an admin user.' });
			}
			cookies.set('user', JSON.stringify(json.data.user), {
				path: '/'
			});
			cookies.set('token', json.data.token, {
				path: '/'
			});
		} else
		{
			return fail(400, { message: json.message });
		}
	} catch (error: any)
	{
		console.error("login error", error);
		if (error.message)
		{
			return fail(400, { message: error.message });
		}
		return fail(400, { message: "something went wrong" });
	} finally
	{
		throw redirect(303, '/configs');
	}

};

export const actions: Actions = {
	default: login
};
