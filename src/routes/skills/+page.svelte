<script lang="ts">
	import Skill from '$lib/components/skills/Skill.svelte';
	import SkillPage from '$lib/components/skills/SkillPage.svelte';
	import { Svroller } from 'svrollbar';
	import type { SkillType } from '$lib/types/Types';
	// import VirtualList from '@sveltejs/svelte-virtual-list';

	export let data: any;

	let ghost_component: any;
	let active_item: SkillType;
	let scroll_state = false;

	$: feedHeight = window.innerHeight - 128;

	const updateScrollState = () => {
		if (ghost_component.getBoundingClientRect().y < 106) {
			scroll_state = true;
		} else {
			scroll_state = false;
		}
	};
</script>

<svelte:head>
	<title>Skills</title>
	<meta name="description" content="HonestWork Skills Page" />
</svelte:head>

<main>
	<div class="feed">
		<div class="search-bar">
			<div class="input-container">
				<img src="icons/search_passive.svg" alt="search icon" />
				<div style="width:8px" />
				<input type="text" placeholder="Search for skills" />
				{#if scroll_state}
					<div class="top">
						<p class="yellow">top</p>
						<img src="icons/corner-right-up.svg" alt="go top" />
					</div>
				{/if}
			</div>
			<div class="sorting-container">
				<div class="sorting-wrapper">
					<p class="light-40">sort by</p>
					<div style="width:8px" />
					<p>most recent</p>
				</div>

				<img src="icons/chevron_passive.svg" alt="chevron" />
			</div>
		</div>
		<Svroller width="520px" height={feedHeight.toString() + 'px'} on:show={updateScrollState}>
			<div style="height:8px" />
			<!-- <VirtualList items={data.json} let:item height={feedHeight.toString() + 'px'}>
		</VirtualList> -->
			{#each data.json as item, index}
				{#if index == 0}
					<div style="height:0px" bind:this={ghost_component} />
				{/if}
				<div
					on:click={() => {
						active_item = item;
					}}
					on:keydown
				>
					<Skill
						title={item.title}
						description={item.description}
						image_urls={item.image_urls}
						minimum_price={item.minimum_price}
					/>
				</div>
			{/each}
		</Svroller>
	</div>
	<div class="skill">
		<SkillPage skill={active_item} />
	</div>
</main>

<style>
	/* :global(.virtual-list-wrapper) {
		-ms-overflow-style: none !important;
		scrollbar-width: none !important;
	}

	:global(.virtual-list-wrapper::-webkit-scrollbar) {
		display: none !important;
	} */
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
	.search-bar {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		display: flex;
		flex-direction: row;
		align-items: center;
		background: var(--color-light-2);
	}
	.input-container {
		width: 320px;
		padding: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		position: relative;
	}
	input {
		border: none;
		padding: 0px;
		width: 240px;
		background: var(--color-light-2);
	}
	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		right: 8px;
		cursor: pointer;
	}
	.sorting-container {
		width: 200px;
		padding: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.sorting-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
