<script>
    export let place 
    export let isPublic = true
    import { formatDate } from "$lib/utils"  
    import emblaCarouselSvelte from 'embla-carousel-svelte'    
    import { enhance } from "$app/forms"; 
    import { toast } from 'svelte-sonner';
    let emblaAPI
    let options = { loop: true };   
    let displayPhotos;

    $: displayPhotos = place?.photos.slice(0, 4) ?? []
    function onInit(event) { 
        emblaAPI = event.detail;
    }

    function scrollPrev() {
        if (emblaAPI) emblaAPI.scrollPrev();
    }

    function scrollNext() {
        if (emblaAPI) emblaAPI.scrollNext();
    }

    let loading = false; 

    const deleteVisit = async () => {  
      loading = true   
      return async ({ result, update }) => {
          switch (result.type) { 
                      case 'success':   
                          toast.success('Xplored place deleted successfully.');
                          break;
                      case 'error': 
                          toast.error('Deleting Xplored place failed.');
                          break;
                  } 
                  loading = false 
                  await update() 
      }; 
    }

</script>


<div class="rounded overflow-hidden my-5 flex flex-col"> 
  {#if place?.photos.length > 0}
<div onclick="gallery.showModal()" class="grid w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible mb-2 hover:cursor-pointer">
  {#if displayPhotos.length === 1}
    <div class="grid grid-cols-1 w-full">
      {#each displayPhotos as media, _ (media.uuid)}
        <img class="object-cover object-center h-64 w-full max-w-full rounded-lg" src={media.cdnUrl} alt={media.fileInfo.originalFilename} />
      {/each}
    </div>
  {:else if displayPhotos.length === 2}
    <div class="grid grid-cols-2 gap-2">
      {#each displayPhotos as media, _ (media.uuid)}
        <div>
          <img class="object-cover object-center h-64 w-40 max-w-full rounded-lg" src={media.cdnUrl} alt={media.fileInfo.originalFilename}/>
        </div>
      {/each}
    </div>
  {:else if displayPhotos.length === 3}
    <div class="grid grid-cols-2 gap-2">
      {#each displayPhotos.slice(0, 2) as media, _ (media.uuid)}
        <img class="object-cover object-center h-32 w-40 max-w-full rounded-lg" src={media.cdnUrl} alt={media.fileInfo.originalFilename} />
      {/each}
      <img class="object-cover object-center col-span-2 h-32 w-full max-w-full rounded-lg" src={displayPhotos[2].cdnUrl} alt={displayPhotos[2].fileInfo.originalFilename} /> 
    </div>
  {:else}
    <div class="grid grid-cols-2 gap-2">
      {#each displayPhotos.slice(0, 3) as media, _ (media.uuid)}
        <div>
          <img class="object-cover object-center h-32 w-40 max-w-full rounded-lg" src={media.cdnUrl} alt={media.fileInfo.originalFilename}/>
        </div>
      {/each}
      <div class="relative">
        <img class="object-cover object-center h-32 w-40 max-w-full rounded-lg" src={displayPhotos[3].cdnUrl} alt={displayPhotos[3].fileInfo.originalFilename}/>
        {#if place?.photos.length > 4}
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <span class="text-white text-lg font-bold">+{place.photos.length - 4}</span>
        </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
{/if}


<!-- Gallery -->
<dialog id="gallery" class="modal">
  <div class="modal-box w-11/12 max-w-5xl"> 
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div class="embla overflow-hidden relative" use:emblaCarouselSvelte={{ options }} on:emblaInit={onInit}>
      <div class="embla__container flex pt-4">
        {#each place?.photos as media, _ (media.uuid)}
          <div class="embla__slide flex-[0_0_100%] min-w-0">
            <img class="w-full h-[50vh] max-h-[600px] object-contain" src={media.cdnUrl} alt={media.fileInfo.originalFilename} />
          </div>
        {/each} 
      </div>  
      <div class="absolute left-2 right-2 top-1/2 -translate-y-1/2 transform flex justify-between">
        <button class="btn btn-circle btn-ghost" on:click={scrollPrev}>❮</button>
        <button class="btn btn-circle btn-ghost" on:click={scrollNext}>❯</button>
      </div>
    </div>
  </div> 

</dialog> 

    <div>
        <h2 class="mt-2 font-semibold inline-block">
          {place.location_data.label}
        </h2>
        <p class="text-gray-500 text-sm">
          {place.caption}
        </p>
    </div>

    <div class="flex flex-row items-center justify-between ">
        <div class="py-1 text-xs font-regular text-gray-400 mr-1 flex flex-row items-center"> 
            <span class="ml-1">{formatDate(place.date)}</span>
        </div>
        {#if !isPublic}
        <div class="py-1 text-xs font-regular text-gray-400 mr-1 flex flex-row items-center"> 
          <button class="btn btn-sm btn-ghost" onclick="delete_place_modal.showModal()"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
              <path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8" />
              <path fill="#9ca3af" d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z" />
            </svg>
          </button>
          <a class="btn btn-sm btn-ghost" href="/_/dashboard/update/{place.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024">
              <path fill="#9ca3af" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z" />
              <path fill="#9ca3af" d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z" />
            </svg>
          </a>
        </div>
        {/if}
    </div>
</div>  
 
{#if !isPublic}
<dialog id="delete_place_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold text-center">Confirm delete</h3>
    <p class="py-2">Are you sure you want to delete this from your xplored place/s?</p> 
    <form action="?/deleteVisit" method="POST" use:enhance={deleteVisit} >
      <input type="text" hidden name="id" value={place.id}>
      <div class="flex justify-end gap-2">
        <button disabled={loading} type="button" onclick="delete_place_modal.close()" class="btn btn-sm">No</button>
        <button disabled={loading} type="submit" class="btn btn-sm btn-neutral">Yes
          {#if loading}
          <span class="loading loading-spinner loading-md"></span>
          {/if}
        </button>
      </div>
    </form>  
  </div>
</dialog>
{/if}