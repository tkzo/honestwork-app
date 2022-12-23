<script lang="ts">
	import Skill from '$lib/components/skills/Skill.svelte';
	import SkillPage from '$lib/components/skills/SkillPage.svelte';
	import { Svroller } from 'svrollbar';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	export let data: any;

	$: feedHeight = window.innerHeight - 97;
</script>

<svelte:head>
	<title>Skills</title>
	<meta name="description" content="HonestWork Skills Page" />
</svelte:head>

<main>
	<div class="feed">
		<Svroller width="520px" height={feedHeight.toString() + 'px'}>
			<div style="height:8px" />
			<!-- <VirtualList items={data.json} let:item height={feedHeight.toString() + 'px'}>
			<Skill
				title={item.title}
				description={item.description}
				image_urls={item.image_urls}
				minimum_price={item.minimum_price}
			/>
		</VirtualList> -->
			{#each data.json as item}
				<Skill
					title={item.title}
					description={item.description}
					image_urls={item.image_urls}
					minimum_price={item.minimum_price}
				/>
			{/each}
		</Svroller>
	</div>
	<div class="skill">
		<SkillPage />
	</div>
</main>

<style>
	:global(.virtual-list-wrapper) {
		/* hide scrollbar */
		-ms-overflow-style: none !important;
		scrollbar-width: none !important;
	}

	:global(.virtual-list-wrapper::-webkit-scrollbar) {
		/* hide scrollbar */
		display: none !important;
	}
	main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.feed {
		width: 520px;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		overflow-y: hidden;
	}
	.skill {
		width: 520px;
	}
</style>
