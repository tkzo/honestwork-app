<script lang="ts">
	import type { PageServerData } from './$types';
	import SkillPage from '$lib/components/skills/SkillPage.svelte';
	export let data: PageServerData;
</script>

<main>
	<SkillPage skill={data.skill} />
</main>

<style>
	main {
		height: 100vh;
	}
</style>
