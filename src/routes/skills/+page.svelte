<script lang="ts">
	import Skill from '$lib/components/cards/Skill.svelte';
	import { onMount } from 'svelte';
	export let data: any;
	type SkillType = {
		slot: number;
		title: string;
		description: string;
		links: string[];
		image_urls: string[];
		minimum_price: number;
	};
	onMount(() => {
		console.log(data.json);
	});
</script>

<svelte:head>
	<title>Skills</title>
	<meta name="description" content="HonestWork Skills Page" />
</svelte:head>

{#each data.json as skill, i}
	<Skill
		slot={i}
		title={skill.title}
		description={skill.description}
		image_urls={skill.image_urls}
		minimum_price={skill.minimum_price}
	/>
	{#if i < data.json.length - 1}
		<div style="height: 12px" />
	{/if}
{/each}
