import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";


export const load: PageServerLoad = async ({ locals }) =>
{
    if (locals.user)
    {
        {
            throw redirect(302, "/");
        }
    }

};

const login: Action = async ({ request, cookies }) =>
{


    const data = await request.formData();
    const { username, password } = Object.fromEntries(data);

    const url = `${PUBLIC_BACKEND_URL}/auth/login`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const json = await res.json();
    console.log(json);

    if (res.ok)
    {
        if (json.data.user.role === "player")
        {
            return fail(400, { message: "Not an admin user." });
        }
        cookies.set("user", JSON.stringify(json.data.user), {
            path: "/"
        });
        cookies.set("token", json.data.token, {
            path: "/"
        });


        throw redirect(303, '/');
    } else
    {

        return fail(400, { message: json.message });
    }

};

export const actions: Actions = {
    default: login
};