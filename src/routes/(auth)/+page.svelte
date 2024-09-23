<script>
    export let form
    import img from '$lib/images/xplored_logo.png'
    import { enhance } from "$app/forms";

    let loading = false;

    const signin = ( {formElement} ) => {
        loading = true
        return async ({ result, update }) => {
            console.log(result)
            switch (result.type) {
                case 'success':
                    form = result.data; 
                    break;
                case 'failure': 
                    formElement.password.value=''
                    break; 
            } 
            await update()
            loading = false
        }
    }
</script>

<div class="card self-center bg-base-100 w-full h-full max-w-sm lg:shadow-2xl">
  <div class="card-body">
        <div class="">
            <img class="h-16 w-16 mx-auto" src={img} alt="when-in-logo">  
            <h2 class="font-bold text-lg text-center">Xplored</h2> 
        </div>
        {#if form?.notVerified || form?.authFailed} 
            <div role="alert" class="alert alert-error flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{form?.message}</span>
              </div>
        {/if} 
        <form method="POST" action="?/login" use:enhance={signin}>
            <div class="form-control">
                <label class="label" for="email">
                    <span class="label-text">Email</span>
                </label>
                <input name="email" type="email" placeholder="email" class="input input-bordered" required/>
            </div>
            <div class="form-control">
                <label for="password" class="label">
                    <span class="label-text">Password</span>
                </label>
                <input name="password" type="password" placeholder="password" class="input input-bordered" required/>
                <label for="" class="label">
                    <a href="/reset-password" class="text-blue-600 label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div class="form-control mt-6">
                <button disabled={loading} type="submit" class="btn btn-neutral w-full"> 
                    Sign in
                    {#if loading}
                        <span class="loading loading-spinner loading-md"></span>
                    {/if}
                </button> 
            </div>
            <div class="flex justify-center w-full">
                <label for="" class="label">
                    <span class="label-text-alt">Don't have an account?</span>
                    <a href="/signup" class="text-blue-600 label-text-alt link link-hover ml-1">Sign up</a>
                </label>
            </div>
        </form> 
  </div>
</div>