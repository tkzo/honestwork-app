<script lang="ts">
	import Skill from '$lib/components/profile/Skill.svelte';
	import SkillEdit from '$lib/components/profile/SkillEdit.svelte';
	import { chosen_skill_slot, skill_add } from '$lib/stores/State';
	import { userState } from '$lib/stores/Network';

	export let skills: SkillType[];
	$: console.log('Skls length', skills.length);
	let allowed_skills = 0;
	$: switch ($userState) {
		case 1:
			allowed_skills = 3;
		case 2:
			allowed_skills = 6;
		case 3:
			allowed_skills = 8;
	}

	type SkillType = {
		createdat: number;
		useraddress: string;
		slot: number;
		title: string;
		description: string;
		tags: string[];
		links: string[];
		imageurls: string[];
		minimumprice: number;
		publish: boolean;
	};
	let empty_skill: SkillType = {
		slot: 0,
		createdat: 0,
		useraddress: '',
		title: '',
		description: '',
		tags: [],
		links: [],
		imageurls: [],
		minimumprice: 0,
		publish: false
	};

	const handleSkillAdd = () => {
		chosen_skill_slot.set(skills.length ?? 0);
		skill_add.set(true);
	};
	const handleSkillEdit = (slot: number) => {
		chosen_skill_slot.set(slot);
		skill_add.set(false);
	};
</script>

{#if $chosen_skill_slot == -1}
	{#if skills == undefined || skills.length < allowed_skills}
		<div class="empty">
			<p class="light-60">you can add {allowed_skills - skills.length} more skill(s)</p>
			<div style="height:12px" />
			<section class="add-button" on:click={handleSkillAdd} on:keydown>
				<p class="yellow">+add new skill</p>
			</section>
		</div>
		<div style="height: 12px" />
	{/if}
	{#if skills}
		{#each skills as skill, i}
			<div on:click={() => handleSkillEdit(i)} on:keydown>
				<Skill slot={i} {skill} />
			</div>
			{#if i < skills.length - 1}
				<div style="height: 12px" />
			{/if}
		{/each}
	{/if}
{:else}
	<SkillEdit skill={skills ? skills[$chosen_skill_slot] ?? empty_skill : empty_skill} />
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
