import { fail } from '@sveltejs/kit';
import { generateUsername } from '$lib/utils';
 
export const actions = {
    signup: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData())
        let username = generateUsername(formData.name.split(' ').join('')).toLowerCase()
        try {
            await locals.pb.collection('users').create({username, ...formData})
            await locals.pb.collection('users').requestVerification(formData.email)
        } catch (err) {
            console.log(err)
            const formErrors = err?.data?.data || 'Something went wrong. Please try again.'
            const formMessage = err?.data?.message || 'Something went wrong. Please try again.'
            delete formData.password
            delete formData.passwordConfirm
            return fail(400, {
                ...formData,
                formMessage,
                formErrors
            })
        }
        return {
            success: true,
            message: 'Successfully signed up. Please check your email for verification.'
        };
    }
};