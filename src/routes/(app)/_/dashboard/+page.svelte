<script>
    import { toast } from 'svelte-sonner';
    import { enhance } from "$app/forms";
    import { Leaflet, Marker, Popup, PlaceCard, InitViewForm  } from "$lib/components";
    export let data 
    // console.log(data)

    const user = data?.user
    const initialView = user?.initview ? user?.initview?.mapcenter : [7.121225412760821, 125.63573983149347]
    const initialZoom = user?.initview ? user?.initview?.zoomLevel : 5
 
    let zoomLevel = null
    let mapcenter = null

    // $: console.log({zoomLevel, mapcenter})
    let initialViewSetting = false

</script>

<div class=" absolute w-full h-[calc(100vh-66px)] z-0">
    <Leaflet on:moveend={(e) => mapcenter = e.detail} on:zoom={(e) => zoomLevel = e.detail} view={initialView} zoom={initialZoom} bounds={null} > 
      {#each data?.visited_places?.items as place (place.id) }
        <Marker location_data={place?.location_data} draggable={false}> 
          <Popup>
            <PlaceCard isPublic={false}  {place}> </PlaceCard> 
          </Popup>
        </Marker>
      {/each} 
    </Leaflet>
</div>

<div class="fixed bottom-8 right-4">
    <a href="/_/dashboard/create" class="btn btn-md lg:btn-lg btn-neutral btn-circle"  >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="9" cy="9" r="2.5" fill="currentColor" />
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M9 20.5c0 0 -6 -7 -6 -11.5c0 -3.31 2.69 -6 6 -6c3.31 0 6 2.69 6 6c0 4.5 -6 11.5 -6 11.5Z" />
          <path d="M16 18h6" />
          <path d="M19 15v6" />
        </g>
      </svg>
    </a>
</div>

<div class="fixed bottom-24 lg:bottom-28 right-4">
  <button on:click={() => initialViewSetting = !initialViewSetting} class="btn btn-md lg:btn-lg btn-neutral btn-circle"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
      <circle cx="23" cy="24" r="2" fill="currentColor" />
      <path fill="currentColor" d="M30.777 23.479A8.64 8.64 0 0 0 23 18a8.64 8.64 0 0 0-7.777 5.479L15 24l.223.522A8.64 8.64 0 0 0 23 30a8.64 8.64 0 0 0 7.777-5.478L31 24zM23 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m-10.601-7.2A6 6 0 1 1 22 16h-2a4 4 0 1 0-6.4 3.2z" />
      <path fill="currentColor" d="m29.305 11.044l-2.36-4.088a2 2 0 0 0-2.374-.895l-2.434.824a11 11 0 0 0-1.312-.758l-.504-2.52A2 2 0 0 0 18.36 2h-4.72a2 2 0 0 0-1.961 1.608l-.504 2.519a11 11 0 0 0-1.327.753l-2.42-.819a2 2 0 0 0-2.372.895l-2.36 4.088a2 2 0 0 0 .411 2.502l1.931 1.697C5.021 15.495 5 15.745 5 16q0 .387.028.766l-1.92 1.688a2 2 0 0 0-.413 2.502l2.36 4.088a2 2 0 0 0 2.374.895l2.434-.824a11 11 0 0 0 1.312.759l.503 2.518A2 2 0 0 0 13.64 30H15v-2h-1.36l-.71-3.55a9.1 9.1 0 0 1-2.695-1.572l-3.447 1.166l-2.36-4.088l2.725-2.395a8.9 8.9 0 0 1-.007-3.128l-2.718-2.39l2.36-4.087l3.427 1.16A9 9 0 0 1 12.93 7.55L13.64 4h4.72l.71 3.55a9.1 9.1 0 0 1 2.695 1.572l3.447-1.166l2.36 4.088l-2.798 2.452L26.092 16l2.8-2.454a2 2 0 0 0 .413-2.502" />
    </svg>
  </button>
</div>

{#if initialViewSetting}
  <InitViewForm on:initViewUpdated={() => initialViewSetting = false} {zoomLevel} {mapcenter} />
{/if} 

