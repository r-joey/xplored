import PocketBase from 'pocketbase'; 
import { sequence } from '@sveltejs/kit/hooks'; 
import { redirect } from '@sveltejs/kit'; 
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
 
const pocketbase = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        event.locals.user = structuredClone(event.locals.pb.authStore.model)
        // console.log(event.locals.user)
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
        event.locals.user = undefined
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({secure: true}));

    return response;
}

const authGuard = async ({ event, resolve }) => {
    if (!event.locals.user && event.url.pathname.startsWith("/_")){
        return redirect(303, "/")
    }
    if ((event.locals.user && event.url.pathname === '/') || (event.locals.user && event.url.pathname === '/signup')) {
        return redirect(303, '/_/dashboard')
      }
    return resolve(event)
}


export const handle = sequence(pocketbase, authGuard)