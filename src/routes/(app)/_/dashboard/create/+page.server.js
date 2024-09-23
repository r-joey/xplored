import { storeFiles, deleteFiles } from '@uploadcare/rest-client';
import uploadcareSimpleAuthSchema from '$lib/uploadCareClient.js'; 
import { isValidISODate } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit'; 
 
 
export const actions = {
    async addPlace({ request, locals }) {  
        let formData = Object.fromEntries(await request.formData());  

        // validate date
        const date = formData['date']
        if(!isValidISODate(date)) {
            const formErrors = {
                date: {
                    message: 'Please enter a valid date in the format YYYY-MM-DD.',
                    code: 'invalid_date_format'
                }
            }
            return fail(400, {
                formErrors
            })
        }

        // upload photos
        const photos_uuids = JSON.parse(formData['photos']).map(media => media.uuid); 
        if( photos_uuids.length != 0 ) { 
            const result = await storeFiles(  { uuids: photos_uuids }, { authSchema: uploadcareSimpleAuthSchema } )  
        }

        // append user id
        // console.log(locals.user)
        formData['user_id'] = locals.user.id; 
        try {
            await locals.pb.collection('visited_places').create(formData);
        } catch (err) {
            console.log(err);
            console.log(err?.data)
            const formErrors = err?.data?.data || 'Something went wrong. Please try again.'
            const formMessage = err?.data?.message || 'Something went wrong. Please try again.' 
            return fail(400, {
                ...formData,
                formMessage,
                formErrors
            })
        }
        return { success: true }
        // redirect(303, '/_/dashboard')
    },
};