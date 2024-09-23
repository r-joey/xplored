import { redirect, fail } from '@sveltejs/kit';  

export const actions = {
    login : async ({ request, locals }) => {
        const body =  Object.fromEntries(await request.formData())
        try {
            await locals.pb.collection('users').authWithPassword(body.email, body.password)
            if(!locals.pb?.authStore?.model?.verified){
                locals.pb.authStore.clear()
                return {
                    notVerified: true,
                    message: 'Please check you email for verification.'
                }
            }
        } catch (err) {  
            console.log(err?.data) 
            return fail(400, {
                authFailed: true,
                message: 'Email or password is incorrect.'
            })
        }

        throw redirect(303, '/_/dashboard') 
    },
    oauth : async ({ cookies, url, request, locals }) => { 
        const authMethods = await locals.pb?.collection('users').listAuthMethods(); 
        // console.log(authMethods)
        if (!authMethods) {
            return {
                authProviderRedirect: '',
                authProviderState: ''
            };
        }
        const redirectURL = `${url.origin}/oauth`;
        const googleAuthProvider = authMethods.authProviders[0];
        const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;
        const state = googleAuthProvider.state;
        const verifier = googleAuthProvider.codeVerifier

        cookies.set('state', state, { path: '/' });
        cookies.set('verifier', verifier, { path: '/' });

        throw redirect(302, authProviderRedirect)
    }
};