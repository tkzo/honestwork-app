<script lang="ts">
	import type { PageData } from './$types';
	import type { SkillType, UserType } from '$lib/stores/Types';
	import CreatorCard from '$lib/components/creator/CreatorCard.svelte';
	import Skill from '$lib/components/profile/Skill.svelte';
	import SkillCard from '$lib/components/creator/SkillCard.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Svrollbar } from 'svrollbar';

	export let data: PageData;

	let viewport: Element;
	let contents: Element;
	let feedHeight = 0;
	$: if (browser) feedHeight = window.innerHeight - 146;

	let chosen_tab: string = 'skills' || 'job history';
	let chosen_skill: SkillType | null = null;

	let user: UserType = data.user;
	let addr: string = $page.params['address'];
</script>

<svelte:head>
	<title>HW | Creator</title>
	<meta name="description" content="HonestWork Skills Page" />
</svelte:head>

<div style="height: 16px" />
<main>
	<CreatorCard {user} {addr} />
	<div style="width: 12px" />
	<div class="details">
		<div class="bar">
			{#if chosen_tab == 'skills' && chosen_skill == null}
				<div class="bar-item" on:click={() => (chosen_tab = 'skills')} on:keydown>
					<p class={'yellow'}>skills</p>
				</div>
				<div class="bar-item" on:click={() => (chosen_tab = 'job history')} on:keydown>
					<p class={'light-60 link'}>job history</p>
				</div>
			{:else if chosen_tab == 'skills' && chosen_skill != null}
				<div class="bar-item" on:click={() => (chosen_skill = null)} on:keydown>
					<p class="yellow link">back to skills</p>
				</div>
			{:else}
				<div class="bar-item" on:click={() => (chosen_tab = 'skills')} on:keydown>
					<p class={'light-60 link'}>skills</p>
				</div>
				<div class="bar-item" on:click={() => (chosen_tab = 'job history')} on:keydown>
					<p class={chosen_tab == 'job history' ? 'yellow' : 'light-60 link'}>job history</p>
				</div>
			{/if}
		</div>
		<div class="wrapper">
			<div
				class="viewport"
				bind:this={viewport}
				style={`width:520px; height:${feedHeight.toString() + 'px'}`}
			>
				<div class="contents" bind:this={contents}>
					{#if chosen_tab == 'skills'}
						{#if chosen_skill == null}
							{#if data.skills != null}
								{#each data.skills as skill, i}
									<div style="height: 8px" />
									<div on:click={() => (chosen_skill = skill)} on:keydown>
										<Skill slot={i} {skill} width={508} />
									</div>
								{/each}
							{/if}
						{:else}
							<SkillCard skill={chosen_skill} />
						{/if}
					{/if}
					<div style="height:32px;" />
				</div>
			</div>
			<Svrollbar {viewport} {contents} alwaysVisible />
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.details {
		width: 520px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.bar {
		height: 32px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		padding: 0 12px 0 0;
	}
	.bar-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		cursor: pointer;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 1px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
		background-color: var(--color-dark);
	}
	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}
	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
