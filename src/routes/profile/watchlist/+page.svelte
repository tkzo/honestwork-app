<script lang="ts">
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import type { WatchlistType } from '$lib/stores/Types';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		chosen_profile_tab.set('watchlist');
		getWatchlist();
	});
	let watchlist: Array<WatchlistType> = [];

	const getWatchlist = async () => {
		if ($userConnected) {
			try {
				const response = await fetch(`/api/watchlist/get/${$userAddress}`);
				const data = await response.json();
				watchlist = data;
			} catch (error) {
				toast.push('Error fetching watchlist');
			}
		}
	};
</script>

<Watchlist {watchlist} on:remove={getWatchlist} />
