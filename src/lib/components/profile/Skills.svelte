<script lang="ts">
	import Skill from '$lib/components/cards/Skill.svelte';
	import SkillEdit from '$lib/components/cards/SkillEdit.svelte';
	export let data: any;
	let chosen_skill_slot = -1;
</script>

<p>add skill(1/3)</p>
{#if data.user.skills}
	{#if chosen_skill_slot == -1}
		{#each data.user.skills as skill, i}
			<div on:click={() => (chosen_skill_slot = i)} on:keydown>
				<Skill
					slot={skill.slot}
					title={skill.title}
					description={skill.description}
					image_urls={skill.image_urls}
					minimum_price={skill.minimum_price}
				/>
			</div>
			{#if i < data.user.skills?.length - 1}
				<div style="height: 12px" />
			{/if}
		{/each}
	{:else}
		<SkillEdit slot="1" />
	{/if}
{/if}
