<script lang="ts">
	import Skill from '$lib/components/cards/Skill.svelte';
	import SkillEdit from '$lib/components/cards/SkillEdit.svelte';
	import { chosen_skill_slot, skill_add } from '$lib/stores/State';
	import { onMount } from 'svelte';
	export let data: any;
	let total_skills = 3;
	type SkillType = {
		slot: number;
		title: string;
		description: string;
		tags: string[];
		links: string[];
		image_urls: string[];
		minimum_price: number;
		publish: boolean;
	};
	let empty_skill: SkillType = {
		slot: 0,
		title: '',
		description: '',
		tags: [],
		links: [],
		image_urls: [],
		minimum_price: 0,
		publish: false
	};

	const handleSkillAdd = () => {
		chosen_skill_slot.set(data.skills.json?.length ?? 0);
		skill_add.set(true);
	};
	const handleSkillEdit = (slot: number) => {
		chosen_skill_slot.set(slot);
	};
	onMount(() => {
		console.log('Skills:', data.skills);
	});
</script>

{#if $chosen_skill_slot == -1}
	{#if data.skills.json != null}
		{#each data.skills?.json as skill, i}
			<div on:click={() => handleSkillEdit(i)} on:keydown>
				<Skill
					slot={i}
					title={skill.title}
					description={skill.description}
					image_urls={skill.image_urls}
					minimum_price={skill.minimum_price}
				/>
			</div>
			{#if i < data.skills.json?.length - 1}
				<div style="height: 12px" />
			{/if}
		{/each}
		{#if data.skills.json?.length < total_skills}
			<div class="empty">
				<div style="height:16px" />
				<p class="light-60">you can add {total_skills - data.skills.json?.length} more skill(s)</p>
				<div style="height:12px" />
				<section class="add-button" on:click={handleSkillAdd} on:keydown>
					<p class="yellow">+add new skill</p>
				</section>
			</div>
		{/if}
	{:else}
		<div class="empty">
			<div style="height:16px" />
			<p class="light-60">you don't have any skills published yet.</p>
			<div style="height:12px" />
			<section class="add-button" on:click={handleSkillAdd} on:keydown>
				<p class="yellow">+add new skill</p>
			</section>
		</div>
	{/if}
{:else}
	<SkillEdit skill={data.skills?.json[$chosen_skill_slot] ?? empty_skill} />
{/if}

<style>
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.add-button {
		height: 32px;
		align-items: center;
		justify-content: center;
		padding: 8px;
		cursor: pointer;
	}
</style>
