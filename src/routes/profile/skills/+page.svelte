<script lang="ts">
	import Skills from '$lib/components/profile/Skills.svelte';
	import { onMount } from 'svelte';
	import { chosen_profile_tab } from '$lib/stores/State';

	onMount(() => {
		chosen_profile_tab.set('skills');
	});
	export let data;
</script>

<Skills {data} />
