<script lang="ts">
	import JobListing from '$lib/components/listings/JobListing.svelte';
	import ListingDetails from '$lib/components/listings/ListingDetails.svelte';
	import { Svrollbar } from 'svrollbar';
	import type { JobType } from '$lib/stores/Types';
	import { browser } from '$app/environment';
	import { chosen_job_slot } from '$lib/stores/State';
	import { onMount } from 'svelte';
	import { connectIfCached } from '$lib/stores/Network';

	export let data: any;
	export let viewport: Element;
	export let contents: Element;

	let active_job: JobType | null;
	let feedHeight = 0;

	$: if (browser) {
		feedHeight = window.innerHeight - 112;
	}

	onMount(() => {
		connectIfCached();
		handleJobSelect(data?.jobs.json[0]);
	});

	const handleJobSelect = (job: JobType) => {
		active_job = null;
		active_job = job;
		chosen_job_slot.set(job.slot);
	};
</script>

<svelte:head>
	<title>HW | Skills</title>
	<meta name="description" content="HonestWork Jobs Page" />
</svelte:head>

<main>
	<div class="feed" style={`height:${feedHeight + 32}px`}>
		<div class="wrapper">
			<div
				bind:this={viewport}
				class="viewport"
				style={`width:520px; height:${feedHeight.toString() + 'px'}`}
			>
				<div bind:this={contents} class="contents">
					<div style="height:8px" />
					{#if data.jobs.json && data.jobs.json.length != 0}
						{#each data.jobs.json as job, index}
							<div
								on:click={() => {
									handleJobSelect(job);
								}}
								on:keydown
							>
								<JobListing chosen={job == active_job} {job} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
			<Svrollbar {viewport} {contents} />
		</div>
	</div>
	<div style="width:12px" />
	<div class="job">
		{#if active_job}
			<ListingDetails job={active_job} {feedHeight} />
			<!-- <svelte:component this={selected.component} job={active_job} {feedHeight} /> -->
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow-y: hidden;
	}
	.feed {
		width: 520px;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		overflow-y: hidden;
		height: auto;
	}
	.job {
		width: 520px;
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
