<script lang="ts">
	import Skill from '$lib/components/skills/Skill.svelte';
	import SkillPage from '$lib/components/skills/SkillPage.svelte';
	import { Svrollbar } from 'svrollbar';
	import type { SkillType } from '$lib/types/Types';
	import fuzzy from 'fuzzy';
	// import VirtualList from '@sveltejs/svelte-virtual-list';

	export let data: any;
	export let viewport: Element;
	export let contents: Element;

	let ghost_component: any;
	let active_skill: SkillType;
	let scroll_state = false;
	let search_input = '';

	$: feedHeight = window.innerHeight - 128;
	$: filteredResults = fuzzy.filter(search_input, data.json, {
		extract: (skill: SkillType) => skill.description
	});
	$: filteredSkills = filteredResults
		.map((result: any) => result.original)
		.sort((a: SkillType, b: SkillType) => {
			return b.created_at - a.created_at;
		});

	const updateScrollState = () => {
		if (ghost_component.getBoundingClientRect().y < 106) {
			scroll_state = true;
		} else {
			scroll_state = false;
		}
	};
	const scrollTop = () => {
		viewport.scroll({ top: 0, behavior: 'smooth' });
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
				<input type="text" placeholder="Search for skills" bind:value={search_input} />
				{#if scroll_state}
					<div class="top link" on:click={scrollTop} on:keydown>
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
		<!-- <Svroller
			width="520px"
			height={feedHeight.toString() + 'px'}
			on:show={updateScrollState}
			bind:this={myel}
		> -->
		<div class="wrapper">
			<div
				bind:this={viewport}
				class="viewport"
				style={`width:520px; height:${feedHeight.toString() + 'px'}`}
			>
				<div bind:this={contents} class="contents">
					<div style="height:8px" />
					<!-- <VirtualList items={data.json} let:item height={feedHeight.toString() + 'px'}>
		</VirtualList> -->
					{#each filteredSkills as skill, index}
						{#if index == 0}
							<div style="height:0px" bind:this={ghost_component} />
						{/if}
						{#if skill.publish}
							<div
								on:click={() => {
									active_skill = skill;
								}}
								on:keydown
							>
								<Skill
									chosen={index == 1 ? true : skill == active_skill}
									title={skill.title}
									description={skill.description}
									image_urls={skill.image_urls}
									minimum_price={skill.minimum_price}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<Svrollbar {viewport} {contents} on:show={updateScrollState} />
		</div>
		<!-- </Svroller> -->
	</div>
	<div class="skill">
		<SkillPage skill={active_skill} />
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
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
</style>
