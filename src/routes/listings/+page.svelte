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
		feedHeight = window.innerHeight - 114;
	}

	onMount(() => {
		if (data.jobs.json && data.jobs.json.length != 0) {
			handleJobSelect(data?.jobs.json[0]);
		}
	});

	const handleJobSelect = (job: JobType) => {
		active_job = null;
		active_job = job;
		chosen_job_slot.set(job.slot);
	};
</script>

<svelte:head>
	<title>HW | Listings</title>
	<meta name="description" content="HonestWork Jobs Page" />
</svelte:head>

<div style="height: 16px" />
<main>
	<div class="feed" style={`height:${feedHeight + 32}px`}>
		<div class="wrapper">
			<div
				bind:this={viewport}
				class="viewport"
				style={`width:518px; height:${feedHeight.toString() + 'px'}`}
			>
				<div bind:this={contents} class="contents">
					<div style="height:8px" />
					{#if data.jobs.json && data.jobs.json.length != 0}
						{#each data.jobs.json as job}
							<div
								on:click={() => {
									handleJobSelect(job);
								}}
								on:keydown
							>
								<JobListing chosen={job == active_job} {job} />
							</div>
						{/each}
					{:else}
						<p>NO JOBS FOUNDS</p>
					{/if}
				</div>
			</div>
			<Svrollbar {viewport} {contents} />
		</div>
	</div>
	<div style="width:12px" />
	<div class="job">
		{#if active_job}
			{#key $chosen_job_slot}
				<ListingDetails bind:job={active_job} {feedHeight} />
			{/key}
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
		border-color: var(--color-light-20);
		overflow-y: hidden;
		height: auto;
		box-sizing: border-box;
	}
	.job {
		width: 520px;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
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
