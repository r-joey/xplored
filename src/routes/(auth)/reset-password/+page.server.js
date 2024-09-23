import { fail } from '@sveltejs/kit';
export const actions = {
    resetPassword : async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        try {
            await locals.pb.collection('users').requestPasswordReset(body.email)  
        } catch (err) {
            console.log('Error', err)
            return fail(400, { error: true, errorMessage: err?.message || 'Something went wrong. Please try again.' })
        }
        return {
            success: true,
            message: 'Check your email for password reset link.'
        };    
    }
};