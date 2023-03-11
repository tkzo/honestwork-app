<script lang="ts">
	import Skill from '$lib/components/profile/Skill.svelte';
	import SkillEdit from '$lib/components/profile/SkillEdit.svelte';
	import { chosen_skill_slot, skill_add } from '$lib/stores/State';

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
</script>

{#if $chosen_skill_slot == -1}
	{#if data.skills.json == undefined || data.skills.json?.length < total_skills}
		<div class="empty">
			<p class="light-60">you can add {total_skills - data.skills.json?.length} more skill(s)</p>
			<div style="height:12px" />
			<section class="add-button" on:click={handleSkillAdd} on:keydown>
				<p class="yellow">+add new skill</p>
			</section>
		</div>
	{/if}
	<div style="height: 12px" />
	{#if data.skills.json}
		{#each data.skills?.json as skill, i}
			<div on:click={() => handleSkillEdit(i)} on:keydown>
				<Skill slot={i} {skill} />
			</div>
			{#if i < data.skills.json?.length - 1}
				<div style="height: 12px" />
			{/if}
		{/each}
	{/if}
{:else}
	<SkillEdit
		skill={data.skills.json ? data.skills.json[$chosen_skill_slot] ?? empty_skill : empty_skill}
		on:skill_update
	/>
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
