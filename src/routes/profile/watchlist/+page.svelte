<script lang="ts">
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import { Jumper } from 'svelte-loading-spinners';

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

<main>
	{#key action_counter}
		{#await getWatchlist()}
			<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
		{:then watchlist}
			<Watchlist {watchlist} on:remove={() => action_counter++} />
		{/await}
	{/key}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
