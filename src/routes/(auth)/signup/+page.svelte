<script>
    export let form
    import { enhance } from "$app/forms";
    import { toast } from 'svelte-sonner';
    let loading = false; 
 
    const signup = () => {
        loading = true
        return async ({ result, update }) => {
            // console.log(result)
            switch (result.type) {
                case 'success':
                    toast.success('Signed up successfully.');
                    form = result.data; 
                    break;
                case 'failure':
                    toast.error('Sign up failed.');
                    break; 
            }
            await update()
            loading = false
        }
    }
</script>

<div class="card self-center bg-base-100 w-full h-full max-w-sm lg:shadow-2xl">
    <div class="card-body">  
        <h2 class="font-bold text-lg text-center">Sign up</h2>
        {#if form?.success}
            <div role="alert" class="alert">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{form?.message}</span>
            </div>
        {/if} 
        <form method="POST" action="?/signup" use:enhance={signup} >
            <div class="form-control">
                <label class="label" for="name">
                    <span class="label-text">Name</span>
                </label>
                <input name="name" type="text" placeholder="name" class="input input-bordered {form?.formErrors?.name ? 'input-error' : ''}" required/>
                <div class="label">
                    <span class="label-text-alt text-red-500">{form?.formErrors?.name?.message ?? ''}</span> 
                </div>
            </div>
            <div class="form-control">
                <label class="label" for="email">
                    <span class="label-text">Email</span>
                </label>
                <input name="email" type="email" placeholder="email" class="input input-bordered {form?.formErrors?.email ? 'input-error' : ''}" required/>
                <div class="label">
                    <span class="label-text-alt text-red-500">{form?.formErrors?.email?.message ?? ''}</span> 
                </div>
            </div>
            <div class="form-control">
                <label for="password" class="label">
                    <span class="label-text">Password</span>
                </label>
                <input name="password" type="password" placeholder="password" class="input input-bordered {form?.formErrors?.password ? 'input-error' : ''}" required/> 
                <div class="label">
                    <span class="label-text-alt text-red-500">{form?.formErrors?.password?.message ?? ''}</span> 
                </div>
            </div>
            <div class="form-control">
                <label for="passwordConfirm" class="label">
                    <span class="label-text">Confirm Password</span>
                </label>
                <input name="passwordConfirm" type="password" placeholder="confirm password" class="input input-bordered {form?.formErrors?.passwordConfirm ? 'input-error' : ''}" required/>
                <div class="label">
                    <span class="label-text-alt text-red-500">{form?.formErrors?.passwordConfirm?.message ?? ''}</span> 
                </div>
            </div>
            <div class="form-control mt-6">
                <button type="submit" disabled={loading} class="btn btn-neutral w-full">
                    Sign up
                    {#if loading}
                    <span class="loading loading-spinner loading-md"></span>
                    {/if}
                </button>
            </div>
            <div class="flex justify-center w-full">
                <label for="" class="label">
                    <span class="label-text-alt">Already have an account?</span>
                    <a href="/" class="text-blue-600 label-text-alt link link-hover ml-1">Sign in</a>
                </label>
            </div>
        </form>
        <!-- <div class="divider">or</div>
        <form action="?/oauth" method="POST">
          <button type="submit" class="btn w-full">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign up with Google</button>
      </form> -->
    </div>
  </div>