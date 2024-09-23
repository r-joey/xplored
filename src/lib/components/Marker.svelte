<script>
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { blueMarkerIcon, shadowMarkerIcon } from '$lib/images'; 
	import L from 'leaflet';
	export let location_data = null;
	export let draggable = false;
	export let autoPan = false;

	let marker;
	let markerElement; 
	let latLng
	const lat = location_data?.raw?.lat ?? null; 
	const lon = location_data?.raw?.lon ?? null; 
	if (lat && lon) {
		latLng = L.latLng(lat, lon)
	}
	const { getMap } = getContext('map');
	const map = getMap();

	setContext('layer', { 
		getLayer: () => marker
	});

	onMount(() => {
		if (map) {  
			const myIcon = L.icon({
				iconUrl: blueMarkerIcon, 
				shadowUrl: shadowMarkerIcon,
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			}); 
			marker = L.marker(latLng ?? map.getCenter(), { draggable, autoPan, icon : myIcon }).addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>