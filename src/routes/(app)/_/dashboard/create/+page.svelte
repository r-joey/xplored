<script>
    import { DateInput, SearchPlacesInput, UCImageUploader } from '$lib/components'
    import { enhance } from "$app/forms";
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';
    export let form

    let selectedPlace = null
    let photos = []
    let loading = false

    const addPlace = async ({ formData }) => { 
        loading = true
        formData.append('photos', JSON.stringify(photos));
        formData.append('location_data', JSON.stringify(selectedPlace));
 
        return async ({ result, update }) => { 
          // console.log(result)
            switch (result.type) { 
                    case 'success':
                      toast.success('Xplored place created successfully.'); 
                      await update() 
                      goto('/_/dashboard')
                      break;
                    case 'failure':  
                      toast.error('Creating Xplored place failed.');
                      break;  
                }
                form = result.data
                loading = false  
        }; 
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
        <h2 class="text-center text-xl font-bold">Create</h2>
      </div>
      <!-- Form -->
      <form class="space-y-4" action="?/addPlace" method="POST" use:enhance={addPlace}>
        <!-- Address Field -->
        <div class="form-control relative">
            <SearchPlacesInput bind:selectedPlace={selectedPlace}></SearchPlacesInput>
            {#if form?.formErrors?.location_data?.message}
            <div class="label">
              <span class="label-text-alt text-red-500">{form?.formErrors?.location_data?.message ?? ''}</span> 
            </div>
          {/if}
        </div>
  
        <!-- Caption Field -->
        <div class="form-control "> 
          <textarea name="caption" class="textarea textarea-bordered textarea-sm lg:textarea-md {form?.formErrors?.caption ? 'textarea-error' : ''}" placeholder="Say something about this visit..." required></textarea> 
          {#if form?.formErrors?.caption?.message}
            <div class="label">
              <span class="label-text-alt text-red-500">{form?.formErrors?.caption?.message ?? ''}</span> 
            </div>
          {/if}
        </div>
  
        <!-- Date Field -->
        <div class="form-control  ">
          <DateInput {form}/>  
        </div>
        
        <!-- Photos Field -->
        <div class="form-control mb-3">  
          <UCImageUploader bind:files={photos}></UCImageUploader> 
        </div>


        <!-- Save Button -->
        <div>
          <button disabled={loading} type="submit" class="w-full btn btn-neutral">
            Save
            {#if loading}
            <span class="loading loading-spinner loading-md"></span>
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
  