<script >
	import { onMount, onDestroy, getContext } from 'svelte';
	import L from 'leaflet';
	export let isPopUpForAddMarker = false
 
	let popup;
	let popupElement;
	let open = false; 

	const { getLayer } = getContext('layer');
	const layer = getLayer();

	onMount(() => {
		popup = L.popup({closeButton: false, minWidth: 300, closeOnEscapeKey: true}).setContent(popupElement);
		 
		if (layer) {
			layer.bindPopup(popup); 
			layer.on('popupopen', () => (open = true));
			layer.on('popupclose', () => (open = false));
			
		}

		if (isPopUpForAddMarker){ 
			popup.options.minWidth = null
			layer.openPopup()
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div bind:this={popupElement}>
	{#if open}
		<slot />
	{/if}
</div>