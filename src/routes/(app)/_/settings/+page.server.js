import { error, fail, redirect } from '@sveltejs/kit'; 
export const actions = {
    updatePassword : async ({ locals, request }) => { 
        let formData = Object.fromEntries(await request.formData()); 
       
        try { 
            await locals.pb.collection('users').update(locals?.user?.id, formData) 
            
        } catch (err) {  
            console.log(err);
            // console.log(err?.data)
            const formErrors = err?.data?.data || 'Something went wrong. Please try again.'
            const formMessage = err?.data?.message || 'Something went wrong. Please try again.' 
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
    updateEmail : async ({ locals, request }) => { 
        let formData = Object.fromEntries(await request.formData()); 
        
        try { 
            await locals.pb.collection('users').requestEmailChange(formData.email) 
            // locals.pb.authStore.clear();
	        // locals.user = undefined;
        } catch (err) {  
            console.log(err); 
            const formErrors = err?.data?.data || 'Something went wrong. Please try again.'
            const formMessage = err?.data?.message || 'Something went wrong. Please try again.' 
            return fail(400, {
                ...formData,
                formMessage,
                formErrors
            })
        }

        // return redirect(303, '/_/dashboard')
    },
};