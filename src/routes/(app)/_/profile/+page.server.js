import { error, fail, redirect } from '@sveltejs/kit'; 
export const actions = {
    updateProfile : async ({ locals, request }) => { 
        let formData = Object.fromEntries(await request.formData());
        const userAvatar = formData['avatar']

        // TODO: upgrade to uploadcare.com later
        if( userAvatar.size === 0) {
            delete formData['avatar']
        } 
        try { 
            await locals.pb.collection('users').update(locals?.user?.id, formData) 
 
        } catch (err) {  
            console.log(err);
            // console.log(err?.data)
            const formErrors = err?.data?.data || 'Something went wrong. Please try again.'
            const formMessage = err?.data?.message || 'Something went wrong. Please try again.'
            delete formData.avatar 
            return fail(400, {
                ...formData,
                formMessage,
                formErrors
            })
        }

        return {
            success: true
        }
    },
};