<script>
    import { enhance, applyAction} from '$app/forms'
    import { invalidateAll } from '$app/navigation'; 
    import { getImageURL } from '$lib/utils'
    import { toast } from 'svelte-sonner';
    export let data
    export let form
    // const user = data.user 
    let loading = false
    let user
    $: user = data.user
    const showPreview = (event) => {
        const target = event.target
        const files = target.files

        if (files.length > 0) {
            const src = URL.createObjectURL(files[0])
            const preview = document.getElementById("avatar-preview") 
            preview.src = src
        }
    }

    const submitUpdateProfile = () => {
        loading = true
        return async ({ result }) => {
            switch (result.type) {
                case 'success': 
                    toast.success('Profile updated successfully.');
                    break
                case 'failure':
                    toast.error('Updating profile failed.');
                    break 
            }
            await applyAction(result)
            await invalidateAll()
            loading = false
        }
    }

</script>

<div class="flex justify-center">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-xl w-full mt-4">
        <!-- headers -->
        <div class="relative mb-4"> 
            <!-- Back button -->
            <a href="/_/dashboard" class="absolute left-0 btn btn-circle btn-sm">
            <!-- Optional Back Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                <path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" />
            </svg> 
            </a> 
            <h2 class="text-center text-xl font-bold">Profile</h2>
        </div>
 
  
        <!-- Form -->
        <form action="?/updateProfile" method="POST" enctype="multipart/form-data" use:enhance={submitUpdateProfile}>

            <!-- Profile Picture -->
            <div class="form-control relative">
                <div class="flex justify-center mb-2">
                    <div class="avatar">
                        <div class="w-64 rounded-full">
                            <img src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} id="avatar-preview" alt="" />
                        </div>
                        <label class="absolute label bottom-0 right-0.5 hover:cursor-pointer hover:opacity-100 opacity-50" for="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h352a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32" />
                                <circle cx="256" cy="272" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M124 158v-22h-24v22" />
                            </svg>
                        </label>
                    </div>
                </div>
                <input id="avatar" hidden type="file"  on:change={showPreview} class="file-input file-input-bordered file-input-sm lg:file-input-md" name="avatar" accept="image/*" />
                {#if form?.formErrors?.avatar?.message}
                    <div class="label text-center">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.avatar?.code === 'validation_file_size_limit' ? 'Avatar must be less than 5MB' : form?.formErrors?.avatar?.message}</span> 
                    </div>
                {/if}
            </div>

            <!-- Name Field -->
            <div class="form-control">
                <label class="label" for="name">
                    <span class="label-text">Name</span>
                </label>
                <input type="text" value={user?.name ?? ''} class="input input-bordered input-sm lg:input-md {form?.formErrors?.name ? 'input-error' : ''}" name="name" placeholder="Name" required />
                {#if form?.formErrors?.name?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.name?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <!-- Title Field -->
            <div class="form-control">
                <label class="label" for="username">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" value={user?.username ?? ''} class="input input-bordered input-sm lg:input-md {form?.formErrors?.username ? 'input-error' : ''}" name="username" placeholder="username" required />
                {#if form?.formErrors?.username?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.username?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <!-- Bio Field -->
            <div class="form-control">
                <label class="label" for="bio">
                    <span class="label-text">Bio</span>
                </label> 
                <textarea name="bio" value={user?.bio ?? ''}  class="textarea textarea-bordered textarea-sm lg:textarea-md {form?.formErrors?.bio ? 'textarea-error' : ''}" placeholder="Say something about yourself..."></textarea> 
                {#if form?.formErrors?.bio?.message}
                  <div class="label">
                    <span class="label-text-alt text-red-500">{form?.formErrors?.bio?.message ?? ''}</span> 
                  </div>
                {/if}
            </div>

            <!-- Social Accounts -->
            <div class="divider">Social accounts</div>
            
            <!-- Facebook -->
            <div class="form-control mb-2"> 
                <input type="text" value={user?.facebook ?? ''} class="input input-bordered input-sm lg:input-md {form?.formErrors?.facebook ? 'input-error' : ''}" name="facebook" placeholder="Facebook" /> 
                {#if form?.formErrors?.facebook?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.facebook?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <!-- Instagram -->
            <div class="form-control mb-2"> 
                <input type="text" value={user?.instagram ?? ''}  class="input input-bordered input-sm lg:input-md {form?.formErrors?.instagram ? 'input-error' : ''}" name="instagram" placeholder="Instagram" /> 
                {#if form?.formErrors?.instagram?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.instagram?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <!-- x -->
            <div class="form-control mb-2"> 
                <input type="text" value={user?.x ?? ''} class="input input-bordered input-sm lg:input-md {form?.formErrors?.x ? 'input-error' : ''}" name="x" placeholder="X" /> 
                {#if form?.formErrors?.x?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.x?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <!-- youtube -->
            <div class="form-control mb-4"> 
                <input type="text" value={user?.youtube ?? ''} class="input input-bordered input-sm lg:input-md {form?.formErrors?.youtube ? 'input-error' : ''}" name="youtube" placeholder="Youtube" /> 
                {#if form?.formErrors?.youtube?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.youtube?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>
            <button disabled={loading} type="submit" class="w-full btn btn-neutral">
                Update
                {#if loading}
                <span class="loading loading-spinner loading-md"></span>
                {/if}
            </button> 
        </form>
    </div>
</div>