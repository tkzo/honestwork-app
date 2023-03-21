<script lang="ts">
	import Applications from '$lib/components/profile/Applications.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';
	onMount(() => {
		chosen_profile_tab.set('applications');
	});
	export let data;
</script>

<Applications user={data.user} />
