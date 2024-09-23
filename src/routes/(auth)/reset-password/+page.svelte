<script>
    export let form 
    import { enhance } from "$app/forms";

    let loading = false;
    const resetPassword = () => {
        loading = true
        return async ({ result, update }) => {
            // console.log(result)
            switch (result.type) {
                case 'success':
                    form = result.data; 
                    break;
                case 'failure': 
                    break; 
            }
            await update()
            loading = false
        }
    }
</script>

<div class="card self-center bg-base-100 w-full h-full max-w-sm lg:shadow-2xl">
    <div class="card-body"> 
        <h2 class="font-bold text-lg text-center">Reset your password</h2>
        <p class="font-thin text-sm text-center mt-0">We'll send you an email to reset your password.</p>
        {#if form?.success}
        <div role="alert" class="alert">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{form?.message}</span>
        </div>
        {/if} 
        {#if form?.error}
        <div role="alert" class="alert">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{form?.errorMessage}</span>
        </div>
        {/if} 
        <form class='mt-4' method="POST" action="?/resetPassword" use:enhance={resetPassword}>
            <div class="form-control"> 
                <input name="email" type="email" placeholder="email" class="input input-bordered" required/>
            </div>
            
            <div class="form-control mt-3">
                <button disabled={loading} type="submit" class="btn btn-neutral w-full">
                    Request password reset
                    {#if loading}
                    <span class="loading loading-spinner loading-md"></span>
                    {/if}
                </button>
            </div>
            <label for="" class="label">
                <a href="/" class="text-blue-600 label-text-alt link link-hover">Back to sign in</a>
            </label>
        </form> 
    </div>
  </div>