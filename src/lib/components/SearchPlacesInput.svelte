<script>
  import { OpenStreetMapProvider } from 'leaflet-geosearch'; 
  const provider = new OpenStreetMapProvider();
  
  export let selectedPlace = null
  let searchQuery = '';
  let results = [];
  let selectedIndex = -1; 
  let loading = false
  if (selectedPlace && selectedPlace.label !== searchQuery) {
    searchQuery = selectedPlace.label;  // Auto-fill the input with the selected place's label
  }
  const searchPlace = async (search_query) => {
    loading = true
      try { 
          if (search_query.trim().length <= 0) return [] 
          return await provider.search({ query: search_query }); 

      } catch (err) {
        console.log(err) 
      } finally { 
        loading = false
      }
  }

  // Debounced fetch suggestions to simulate a delay
  let timer;
  function handleInput(event) {
    searchQuery = event.target.value;

    clearTimeout(timer);
    timer = setTimeout(async () => {
      results = await searchPlace(searchQuery);
      selectedIndex = -1; // Reset index when new suggestions come
    }, 200); // 300ms debounce
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowDown' && selectedIndex < results.length - 1) {
      selectedIndex += 1;
    } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
      selectedIndex -= 1;
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      selectSuggestion(selectedIndex);
    }
  }

  function selectSuggestion(index) {
    searchQuery = results[index].label; 
    selectedPlace = results[index];
    results = [];
    selectedIndex = -1;
  }

  function handleBlur() {
    setTimeout(() => {
      results = [];
    }, 200);
  }
</script>
  <label class="input input-bordered input-sm lg:input-md flex items-center gap-2">
    <input type="text" bind:value={searchQuery} on:input={handleInput} on:keydown={handleKeydown} on:blur={handleBlur} class="grow" placeholder="Search..."/>
    
    {#if loading}
      <span class="loading loading-ring loading-sm"></span> 
    {:else if searchQuery.length > 0}
    <button on:click={() => searchQuery = ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
        <path fill="black" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z" />
      </svg>
    </button>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70"> 
      <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
    </svg>
    {/if}
  </label>

  {#if results.length}
    <ul class="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      {#each results as result, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li class="p-2 cursor-pointer hover:bg-gray-100" on:click={() => selectSuggestion(index)}>
          <span class="line-clamp-1">
            {result.label}
          </span>
        </li>
      {/each}
    </ul>
  {/if} 
