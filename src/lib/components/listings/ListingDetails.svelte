<script lang="ts">
	import type { JobType } from '$lib/stores/Types';
	import Applicant from './Applicant.svelte';
	import { Svrollbar } from 'svrollbar';

	export let job: JobType;
	export let feedHeight: number;
	let viewport: Element;
	let contents: Element;

	let chosen_tab: string = 'applicants' || 'edit mode';
</script>

<main>
	<div class="bar">
		<div class="bar-item" on:click={() => (chosen_tab = 'applicants')} on:keydown>
			<p class={chosen_tab == 'applicants' ? 'yellow' : 'light-60 link'}>applicants</p>
		</div>
		<div class="bar-item" on:click={() => (chosen_tab = 'edit mode')} on:keydown>
			<p class={chosen_tab == 'edit mode' ? 'yellow' : 'light-60 link'}>edit mode</p>
		</div>
	</div>
	<div class="wrapper">
		<div
			bind:this={viewport}
			class="viewport"
			style={`height:${(feedHeight - 32).toString() + 'px'}`}
		>
			<div bind:this={contents} class="contents">
				{#if job.application}
					{#each job.application as applicant, i}
						<div style="height:8px;" />

						<Applicant {applicant} />
						{#if i == job.application.length - 1}
							<div style="height:8px;" />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<Svrollbar {viewport} {contents} />
	</div>
</main>

<style>
	main {
		width: 100%;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.bar {
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
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
		border-color: var(--color-light-10);
		box-sizing: border-box;
		cursor: pointer;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		/* overflow-y: scroll; */
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
