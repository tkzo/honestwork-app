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
	let scroll_state = false;
	let search_input = '';
	let hovering_scrolltop = false;
	let input_active = false;
	let active_skill: SkillType | null = null;
	let sorting_options = [
		{ k: 'publish date', v: 'created_at', a: 'false' },
		{ k: 'rating', v: 'rating', a: 'false' },
		{ k: 'min. budget', v: 'minimum_price', a: 'false' }
	];
	let show_sorting_options = false;
	let chosen_sorting_option = 0;

	$: feedHeight = window.innerHeight - 128;
	$: filteredSkills =
		search_input != ''
			? fuzzy
					.filter(search_input, data.json, {
						extract: (skill: SkillType) => skill.description
					})
					.map((result: any) => result.original)
			: data.json;

	$: if (filteredSkills) {
		active_skill = filteredSkills[0];
	}

	const updateScrollState = () => {
		if (ghost_component.getBoundingClientRect().y < 106) {
			scroll_state = true;
		} else {
			scroll_state = false;
		}
	};
	const scrollTop = () => {
		viewport.scroll({ top: 0, behavior: 'smooth' });
		hovering_scrolltop = false;
	};
	const fetchSorting = async () => {
		const result = await fetch(
			`/api/skill/${sorting_options[chosen_sorting_option].v}/${sorting_options[chosen_sorting_option].a}`
		);
		data.json = await result.json();
	};
	const chooseSorting = (index: number) => {
		chosen_sorting_option = index;
		show_sorting_options = false;
		fetchSorting();
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
				<img
					src={input_active ? 'icons/search_active.svg' : 'icons/search_passive.svg'}
					alt="search icon"
				/>
				<input
					class="search-input"
					type="text"
					placeholder="Search for skills"
					bind:value={search_input}
					on:focus={() => (input_active = true)}
					on:focusout={() => (input_active = false)}
				/>
				{#if scroll_state}
					<div
						class="top link"
						on:click={scrollTop}
						on:keydown
						on:mouseover={() => (hovering_scrolltop = true)}
						on:mouseout={() => (hovering_scrolltop = false)}
						on:focus
						on:blur
					>
						<p class={hovering_scrolltop ? 'dark' : 'yellow'}>top</p>
						<img
							src={hovering_scrolltop
								? 'icons/corner-right-up_active.svg'
								: 'icons/corner-right-up_passive.svg'}
							alt="go top"
						/>
					</div>
				{/if}
			</div>
			<div class="sorting-dropdown">
				<div
					class="sorting-container"
					on:click={() => (show_sorting_options = !show_sorting_options)}
					on:keydown
				>
					<div class="sorting-wrapper">
						<p class="light-40">sort by</p>
						<div style="width:8px" />
						<p>{sorting_options[chosen_sorting_option].k}</p>
					</div>
					<img
						src={show_sorting_options ? 'icons/chevron_active.svg' : 'icons/chevron_passive.svg'}
						alt="chevron"
					/>
				</div>
				{#if show_sorting_options}
					<div class="sorting-options">
						{#each sorting_options as option, index}
							{#if option !== sorting_options[chosen_sorting_option]}
								<div class="sorting-option" on:click={() => chooseSorting(index)} on:keydown>
									<p class="light-40">sort by</p>
									<div style="width:8px" />
									<p>{option.k}</p>
									{#if chosen_sorting_option === index}
										<img src="icons/check.svg" alt="check" />
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
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
						<div
							on:click={() => {
								active_skill = skill;
							}}
							on:keydown
						>
							<Skill
								chosen={skill == active_skill}
								title={skill.title}
								description={skill.description}
								image_urls={skill.image_urls}
								minimum_price={skill.minimum_price}
								user_address={skill.user_address}
							/>
						</div>
					{/each}
				</div>
			</div>
			<Svrollbar {viewport} {contents} on:show={updateScrollState} />
		</div>
	</div>
	<div style="width:12px" />
	<div class="skill">
		{#if active_skill != null}
			<SkillPage skill={active_skill} />
		{/if}
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
		padding: 0px 8px;
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
		width: 240px;
		background: var(--color-light-2);
	}
	.search-input {
		padding: 8px;
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
	.sorting-dropdown {
		position: relative;
		cursor: pointer;
	}
	.sorting-options {
		position: absolute;
		z-index: 66;
		margin-top: 1px;
		margin-left: -1px;
		width: 100%;
	}
	.sorting-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--color-light-2);
		padding: 8px;
		border-width: 0px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		flex: 1;
	}
</style>
