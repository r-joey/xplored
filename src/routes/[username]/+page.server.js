 
import { error, fail } from '@sveltejs/kit'; 

  
const getUser = async (pb, username) => {
    try {
        // console.log('get user triggered',username)
        const user = await pb.collection('users').getFirstListItem(`username="${username}"`, {
            expand: 'visited_places_via_user_id'
        }); 
        return user
    } catch (err) {
        return error(500, {
            message: 'User not found'
        })
    }
}

 
export async function load({params, url, locals}) {
    // const page = url.searchParams.get('page') || 1
    // const perPage = 15  
    const username = params.username

    const userProfile = await getUser(locals.pb, username)
    return {    
        userProfile
    }
}