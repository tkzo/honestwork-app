<script lang="ts">
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	onMount(() => {
		chosen_profile_tab.set('favorites');
	});
</script>

<main>
	<Favorites favorites={data.user.favorites} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
