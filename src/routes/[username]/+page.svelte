<script>
  import { Leaflet, Marker, Popup, PlaceCard  } from "$lib/components";
  import { getImageURL } from '$lib/utils' 
  export let data  
  const user = data.userProfile 
  let isDropdownOpen = false; 
  const initialView = user?.initview ? user?.initview?.mapcenter : [7.121225412760821, 125.63573983149347]
  const initialZoom = user?.initview ? user?.initview?.zoomLevel : 5
  function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
 
</script>
 

<nav class="flex items-center sticky z-10 top-0 bg-neutral text-neutral-content  justify-between p-2">
  <!-- Left side: Name -->
  <a href="/" class="btn btn-ghost font-semibold">Xplored</a>

  <!-- Center: Avatar with rings -->

  <!-- Center: Avatar with dropdown -->
  <div class="relative">
    <div class="absolute inset-0 rounded-full border-4 border-blue-500"></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="relative w-12 h-12 rounded-full overflow-hidden border-yellow-400 cursor-pointer" on:click={toggleDropdown}> 
        <div class="w-12 rounded-full">
          <img src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : `https://avatar.iran.liara.run/username?username=${user?.username}`} id="user-avatar" alt="" />
   
      </div>
    </div>
    <!-- Dropdown menu -->
    <div class={`absolute left-1/2 transform -translate-x-1/2 mt-4 w-72 lg:w-80 bg-white text-black rounded-lg shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
      <div class="max-w-md"> 
        <div class="rounded-lg border  bg-neutral text-neutral-content p-4 shadow-lg"> 
          <div class="flex items-center justify-center">
            <div class="avatar">
              <div class="w-40 rounded-full">
                <img src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : `https://avatar.iran.liara.run/username?username=${user?.username}`} id="user-avatar" alt="" />
              </div>
            </div>
          </div>
          <h1 class="mt-1 text-center text-xl font-bold leading-8 ">{user?.name}</h1>
          <h3 class="font-lg text-semibold text-center leading-6 ">{user?.username}</h3>
          <p class="text-center text-sm leading-6 ">{user?.bio}</p>
          <div class="flex justify-center pt-2 space-x-4 align-center">
            
            {#if user?.facebook} 
              <a href={user.facebook} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                  <path fill="currentColor" fill-rule="evenodd" d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16c24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31" />
                </svg>
              </a>
            {/if}

            {#if user?.instagram}
            <a href="http://twitter.com/{user.instagram}">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path fill="currentColor" d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34zm0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32" />
                <path fill="currentColor" d="M377.33 162.67a28 28 0 1 1 28-28a27.94 27.94 0 0 1-28 28M256 181.33A74.67 74.67 0 1 1 181.33 256A74.75 74.75 0 0 1 256 181.33m0-37.33a112 112 0 1 0 112 112a112 112 0 0 0-112-112" />
              </svg>
            </a>
            {/if}

            {#if user?.x}
            <a href="http://twitter.com/{user.x}">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path fill="currentColor" d="M18.234 14.162L26.977 4h-2.072l-7.591 8.824L11.25 4H4.258l9.169 13.343L4.258 28H6.33l8.016-9.318L20.75 28h6.993zm-2.837 3.299l-.93-1.329L7.078 5.56h3.182l5.964 8.532l.93 1.329l7.753 11.09h-3.182z" />
              </svg>
            </a>
            {/if}

            {#if user?.youtube}
            <a href="http://twitter.com/{user.youtube}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path fill="currentColor" d="M29.41 9.26a3.5 3.5 0 0 0-2.47-2.47C24.76 6.2 16 6.2 16 6.2s-8.76 0-10.94.59a3.5 3.5 0 0 0-2.47 2.47A36 36 0 0 0 2 16a36 36 0 0 0 .59 6.74a3.5 3.5 0 0 0 2.47 2.47c2.18.59 10.94.59 10.94.59s8.76 0 10.94-.59a3.5 3.5 0 0 0 2.47-2.47A36 36 0 0 0 30 16a36 36 0 0 0-.59-6.74M13.2 20.2v-8.4l7.27 4.2Z" />
              </svg>
            </a>
            {/if}
          </div> 
        </div>

      </div> 
    </div>
  </div>

  <!-- Right side: Sign up button -->
  <div>
    <a href="/signup" class="btn btn-ghost font-semibold">
      Sign up
    </a>
  </div>
</nav>

<div class=" absolute w-full h-[calc(100vh-66px)] z-0">
  <Leaflet on:click={() => isDropdownOpen = false } view={initialView} zoom={initialZoom} bounds={null} >
    {#each user?.expand?.visited_places_via_user_id as place (place.id) }
      <Marker location_data={place?.location_data} draggable={false}> 
        <Popup>
          <PlaceCard isPublic={true} {place}> </PlaceCard> 
        </Popup>
      </Marker>
    {/each} 
  </Leaflet>
</div>

 