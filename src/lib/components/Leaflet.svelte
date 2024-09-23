 
<script>
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte'; 
	import L from 'leaflet'; 
	import 'leaflet/dist/leaflet.css';
	export let bounds;
	export let view;
	export let zoom;
	import { browser } from '$app/environment';
	const dispatch = createEventDispatcher();
	
	let map;
	let mapElement; 

	if (browser) {
		onMount( async () => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}
		 
		map = L.map(mapElement, { zoomControl: false }) 
			.on('click', (e) => dispatch('click', e))
			.on('zoom', (e) =>  dispatch('zoom', map.getZoom()))
			.on('moveend', (e) => dispatch('moveend', map.getCenter()))
			.on('popupopen', async (e) => {
				await tick(); 
				e.popup.update();
			})  
		// dispatch('mapCreated', map.center())
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);
		
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

}
$: if (map) {
	if (bounds) {
		map.fitBounds(bounds);
	} else if (view && zoom) {
		map.setView(view, zoom);
	}
}

	

	 
</script>


<div class="w-full h-full" bind:this={mapElement}>
	{#if map}
		<slot /> 
	{/if}
</div>