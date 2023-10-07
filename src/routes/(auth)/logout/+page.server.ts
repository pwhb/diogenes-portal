import { redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";

const logout: Action = async ({ cookies }) =>
{
    console.log("logout");
    
    cookies.delete("user");
    cookies.delete("token");
    throw redirect(302, '/');
};

export const actions: Actions = {
    default: logout
};