import { storeFiles, deleteFiles } from '@uploadcare/rest-client';
import uploadcareSimpleAuthSchema from '$lib/uploadCareClient.js'; 
import { isValidISODate } from '$lib/utils.js';
import { error, fail, redirect } from '@sveltejs/kit'; 
 
 
export async function load({params, locals}) { 
    try {
        const place = structuredClone(await locals.pb.collection('visited_places').getOne(params.id))
        // console.log(place)
        return {
			place
		}
    } catch (err) { 
        return error(500, {
            message: 'Something went wrong'
        })
    } 
}


export const actions = {
    async updatePlace({ request, locals, params }) {
        // console.log('params',params)
        // console.log('locals',locals)
        // extract formData
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

        // fetch place's data
        let existingPhotosUuids = []
        let place
        try {
            place = structuredClone(await locals.pb.collection('visited_places').getOne(params.id))
            existingPhotosUuids = place?.photos?.map(media => media.uuid) 
        } catch (err) { 
            return fail(400, {
                message: 'Visited place not found.'
            })
        } 
         
        // update the upload care photos
        const newPhotosUuids = JSON.parse(formData['photos']).map(media => media.uuid);  
        const removedPhotos = existingPhotosUuids.filter(uuid => !newPhotosUuids.includes(uuid));
        try {
            // delete removed photos
            if (removedPhotos.length != 0) {
                await deleteFiles({ uuids: removedPhotos }, { authSchema: uploadcareSimpleAuthSchema }) 
            } 
            // upload new photos
            if (newPhotosUuids.length != 0) {
                await storeFiles(  { uuids: newPhotosUuids }, { authSchema: uploadcareSimpleAuthSchema } )  
            }
        } catch (err) {
            console.log(err)
        }

        try {
			await locals.pb.collection('visited_places').update(place?.id, formData);
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
		// redirect(303, '/_/dashboard') 
    },
};