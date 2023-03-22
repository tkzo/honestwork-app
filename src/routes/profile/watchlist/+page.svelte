<script lang="ts">
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		chosen_profile_tab.set('watchlist');
	});

	let action_counter = 0;
	const getWatchlist = async () => {
		if ($userConnected) {
			try {
				const response = await fetch(`/api/watchlist/get/${$userAddress}`);
				return await response.json();
			} catch (error) {
				toast.push('Error fetching watchlist');
			}
		}
	};
</script>

{#key action_counter}
	{#await getWatchlist() then watchlist}
		<Watchlist {watchlist} on:remove={() => action_counter++} />
	{/await}
{/key}
