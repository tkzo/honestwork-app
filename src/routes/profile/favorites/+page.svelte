<script lang="ts">
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import type { FavoriteType } from '$lib/stores/Types';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		chosen_profile_tab.set('favorites');
		getFavorites();
	});
	let favorites: Array<FavoriteType> = [];

	const getFavorites = async () => {
		if ($userConnected) {
			try {
				const response = await fetch(`/api/favorites/get/${$userAddress}`);
				const data = await response.json();
				favorites = data;
			} catch (error) {
				toast.push('Error fetching favorites');
			}
		}
	};
</script>

<Favorites {favorites} on:remove={getFavorites} />
