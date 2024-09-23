import { storeFiles, deleteFiles } from '@uploadcare/rest-client';
import uploadcareSimpleAuthSchema from '$lib/uploadCareClient.js'; 
import { isValidISODate } from '$lib/utils.js';
import { error, fail } from '@sveltejs/kit'; 
export async function load({url, locals}) {
    const page = url.searchParams.get('page') || 1
    const perPage = 15 
    try {
        const visited_places = structuredClone(await locals.pb.collection('visited_places').getList(page, perPage, { 
            sort: '-created', 
            filter: `user_id = "${locals.user.id}"`
        }));  
        return {
			visited_places
		}
    } catch (err) { 
        return error(500, {
            message: 'Something went wrong'
        })
    } 
}
 
export const actions = {
    async deleteVisit({ request, locals }) {   
        let {id} = Object.fromEntries(await request.formData());

        try {
            const place = await locals.pb.collection('visited_places').getOne(id)
            const photos = place?.photos?.map(media => media.uuid) 
            if (photos.length != 0) {
                const result = await deleteFiles({ uuids: photos }, { authSchema: uploadcareSimpleAuthSchema }) 
            }
        } catch (err) {
            return fail(400, {
                message: 'Visited place not found.'
            })
        }


        try {
            await locals.pb.collection('visited_places').delete(id);
        } catch (err) {
            console.log(err);
            return fail(400, {
                message: 'Something went wrong. PLease try again.'
            })
        }
    },

    updateProfileInitView : async ({ locals, request }) => { 
        let formData = Object.fromEntries(await request.formData()); 
   
        try { 
            const result = await locals.pb.collection('users').update(locals?.user?.id, formData) 
            console.log(result)
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

        return {
            success: true
        }
    },
};