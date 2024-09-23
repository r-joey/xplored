<script>
    import { enhance, applyAction} from '$app/forms'
    import { invalidateAll } from '$app/navigation'; 
    import { toast } from 'svelte-sonner';
     
    export let form 
    let changePasswordLoading = false
    let changeEmailLoading = false

    const submitUpdatePassword = () => {
        changePasswordLoading = true
        return async ({ result }) => {
            switch (result.type) {
                case 'success': 
                    toast.success('Password updated successfully.');
                    break
                case 'failure':
                    toast.error('Updating password failed.');
                    break 
            }
            await applyAction(result)
            await invalidateAll()
            changePasswordLoading = false
        }
    }

    const submitUpdateEmail = () => {
        changeEmailLoading = true
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success': 
                    toast.success('Email updated successfully. Please check your email for verification.');
                    break
                case 'failure':
                    toast.error('Updating email failed.');
                    break 
            }
            await update()
            changeEmailLoading = false
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
            <h2 class="text-center text-xl font-bold">Settings</h2>
        </div>
 
        <!-- Change password -->
        <div class="divider">Change password</div>
        <form action="?/updatePassword" method="POST" enctype="multipart/form-data" use:enhance={submitUpdatePassword}> 
            
            <!-- Old password Field --> 
            <div class="form-control">
                <label class="label" for="oldPassword">
                    <span class="label-text">Old password</span>
                </label> 
                <input type="password" class="input input-bordered input-sm lg:input-md {form?.formErrors?.oldPassword ? 'input-error' : ''}" name="oldPassword" placeholder="Old password" required />
                {#if form?.formErrors?.oldPassword?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.oldPassword?.message ?? ''}</span> 
                    </div>
                {/if}
            </div> 

            <!-- New password Field -->
            <div class="form-control">
                <label class="label" for="password">
                    <span class="label-text">New password</span>
                </label>
                <input type="password" class="input input-bordered input-sm lg:input-md {form?.formErrors?.password ? 'input-error' : ''}" name="password" placeholder="New password" required />
                {#if form?.formErrors?.password?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.password?.message ?? ''}</span> 
                    </div>
                {/if}
            </div> 

            <!-- Confirm password Field -->
            <div class="form-control mb-4">
                <label class="label" for="passwordConfirm">
                    <span class="label-text">Confirm new password</span>
                </label>
                <input type="password" class="input input-bordered input-sm lg:input-md {form?.formErrors?.passwordConfirm ? 'input-error' : ''}" name="passwordConfirm" placeholder="Confirm new password" required />
                {#if form?.formErrors?.passwordConfirm?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.passwordConfirm?.message ?? ''}</span> 
                    </div>
                {/if}
            </div> 


            <button disabled={changePasswordLoading} type="submit" class="w-full btn btn-neutral">
                Update password
                {#if changePasswordLoading}
                <span class="loading loading-spinner loading-md"></span>
                {/if}
            </button> 
        </form>


        <!-- Change email -->
        <div class="divider mt-10">Change email</div>
        <form action="?/updateEmail" method="POST" enctype="multipart/form-data" use:enhance={submitUpdateEmail}> 
            
            <!-- Old password Field --> 
            <div class="form-control mb-4">
                <label class="label" for="email">
                    <span class="label-text">New email</span>
                </label> 
                <input type="email" class="input input-bordered input-sm lg:input-md {form?.formErrors?.newEmail ? 'input-error' : ''}" name="email" placeholder="New email" required />
                {#if form?.formErrors?.newEmail?.message}
                    <div class="label">
                        <span class="label-text-alt text-red-500">{form?.formErrors?.newEmail?.message ?? ''}</span> 
                    </div>
                {/if}
            </div>

            <button disabled={changeEmailLoading} type="submit" class="w-full btn btn-neutral">
                Update email
                {#if changeEmailLoading}
                <span class="loading loading-spinner loading-md"></span>
                {/if}
            </button> 
        </form>



    </div>
</div>