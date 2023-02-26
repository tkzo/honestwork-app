<script lang="ts">
	import type { PageData } from './$types';
	import type { UserType, SkillType } from '$lib/stores/Types';
	import CreatorCard from '$lib/components/creator/CreatorCard.svelte';
	import Skill from '$lib/components/profile/Skill.svelte';
	import SkillCard from '$lib/components/creator/SkillCard.svelte';

	export let data: PageData;

	let chosen_tab: string = 'skills' || 'job history';
	let user: UserType = data.user;
	let skills: SkillType[] = data.skills;
	let chosen_skill: SkillType | null = null;
</script>

<svelte:head>
	<title>HW | Creator</title>
	<meta name="description" content="HonestWork Skills Page" />
</svelte:head>

<main>
	<CreatorCard {user} />
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
		{#if chosen_tab == 'skills'}
			{#if chosen_skill == null}
				{#each skills as skill, i}
					<div style="height: 12px" />
					<div on:click={() => (chosen_skill = skill)} on:keydown>
						<Skill slot={i} {skill} />
					</div>
				{/each}
			{:else}
				<SkillCard skill={chosen_skill} />
			{/if}
		{/if}
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
</style>
