<script lang="ts">
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import { Jumper } from 'svelte-loading-spinners';

	onMount(() => {
		chosen_profile_tab.set('favorites');
		getFavorites();
	});
	let action_counter = 0;

	const getFavorites = async () => {
		if ($userConnected) {
			try {
				const response = await fetch(`/api/favorites/get/${$userAddress}`);
				return await response.json();
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Failed to fetch favorites</p>`
				);
			}
		}
	};
</script>

<main>
	{#key action_counter}
		{#await getFavorites()}
			<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
		{:then favorites}
			<Favorites {favorites} on:remove={() => action_counter++} />
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
