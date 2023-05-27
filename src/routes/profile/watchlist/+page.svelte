<script lang="ts">
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	export let data: any = {};
	onMount(() => {
		chosen_profile_tab.set('watchlist');
	});
	let action_counter = 0;
</script>

<main>
	{#key action_counter}
		<Watchlist watchlist={data.user.watchlist} on:remove={() => action_counter++} />
	{/key}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
