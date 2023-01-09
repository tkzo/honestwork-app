<script lang="ts">
	import Job from '$lib/components/profile/Job.svelte';
	import JobEdit from '$lib/components/profile/JobEdit.svelte';
	import type { JobType } from '$lib/stores/Types';
	import { chosen_job_slot } from '$lib/stores/State';

	export let jobs: JobType[] | null;

	const handleJobAdd = () => {};
	const handleJobEdit = (slot: number) => {};
</script>

{#if $chosen_job_slot == -1}
	<div class="empty">
		<section class="add-button" on:click={handleJobAdd} on:keydown>
			<p class="yellow">+post new job</p>
		</section>
	</div>
	<div style="height: 12px" />
	{#if jobs && jobs.length > 0}
		{#each jobs as job, i}
			<div on:click={() => handleJobEdit(i)} on:keydown>
				<Job {job} />
			</div>
			{#if i < jobs.length - 1}
				<div style="height: 12px" />
			{/if}
		{/each}
	{/if}
{:else}
	<JobEdit />
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
