import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authMiddleware: Handle = async ({ event, resolve }) =>
{
    try
    {
        const user = event.cookies.get("user");
        const token = event.cookies.get("token");



        if (user && token && user !== "undefined" && token !== "undefined")
        {

            event.locals.user = JSON.parse(user);
            event.locals.token = token;
            console.log("user found");

        } else
        {
            console.log("user not found");
        }
    } catch (err)
    {
        console.error(err);
    }


    return await resolve(event);
};

export const handle = sequence(authMiddleware);