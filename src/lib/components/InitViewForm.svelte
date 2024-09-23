<script>
    import { toast } from 'svelte-sonner';
    import { enhance } from "$app/forms"; 
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let zoomLevel = null
    export let mapcenter = null

    let loading = false 
    if (zoomLevel === 0) zoomLevel = 1
    const initView = {zoomLevel, mapcenter}

    const submitUpdateProfileInitView = ({ formData }) => {
        loading = true 
        if (!initView) return
        formData.append('initview', JSON.stringify(initView)); 
        
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success': 
                    toast.success('Initial view updated successfully.');
                    break
                case 'failure':
                    toast.error('Updating Initial view failed.');
                    break 
            }
            await update() 
            loading = false
            dispatch('initViewUpdated')
        }
    }
</script>

<div class="fixed bottom-8 right-24 rounded-lg p-2">
    <div class="w-52 px-4 py-2 bg-gray-400 rounded-lg">
    <h3 class="text-center mb-2">Set initial view</h3>
      <form action="?/updateProfileInitView" method="POST" use:enhance={submitUpdateProfileInitView}>
        <input type="text" readonly value={zoomLevel} class="input input-sm w-full  mb-2" />
        <input type="text" readonly value={mapcenter}  class="input input-sm w-full mb-2" /> 
        <button disabled={loading} type="submit" class="w-full btn btn-sm btn-neutral">
          Save
          {#if loading}
          <span class="loading loading-spinner loading-md"></span>
          {/if}
        </button>  
      </form> 
    </div> 
</div>