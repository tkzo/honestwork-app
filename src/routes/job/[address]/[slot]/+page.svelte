<script lang="ts">
	import type { PageData } from './$types';
	import JobPage from '$lib/components/jobs/JobPage.svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { userConnected, userAddress } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';

	export let data: PageData;

	let letter: string;
	let letter_comp: HTMLTextAreaElement;

	onMount(() => {
		letter_comp.focus();
	});
	const handleApply = async () => {
		if ($userConnected) {
			try {
				const url = `${base}/api/job_apply/${data.job.user_address}/${data.job.slot}`;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						user_address: $userAddress,
						job_id: `job:${data.job.user_address}:${data.job.slot}`,
						cover_letter: letter
					})
				});
				const res = await response.json();
				if (res == 'success') {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Application received</p>`
					);
				} else {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${res}</p>`
					);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
</script>

<svelte:head>
	<title>HW | Job Listing</title>
	<meta name="description" content="HonestWork Job Page" />
</svelte:head>

<main>
	<JobPage job={data.job} show_tags={true} />
	<div style="width:12px" />
	<div class="cover-letter">
		<div class="cover-head">
			<p>cover letter<span class="light-60">(optional)</span></p>
			<p class="yellow link" on:click={handleApply}>apply</p>
		</div>
		<div class="cover-body">
			<textarea
				bind:value={letter}
				bind:this={letter_comp}
				minlength="100"
				maxlength="1000"
				class="cover-text"
				placeholder={`Write a well articulated cover letter about how this job proposition fits your skills. \n\nYou may as well skip this part and apply without a letter. It’s advised to write one to show you’re the candidate best fit for this job.\n\nGood luck!`}
			/>
		</div>
		<div class="cover-foot-wrapper">
			<div class="cover-foot">
				<div style="width:1px" />
				<p class="yellow">{letter?.length ?? 0}<span class="light-60">/1000</span></p>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		box-sizing: border-box;
	}
	.cover-letter {
		width: 520px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		border: 1px solid var(--color-light-20);
	}
	.cover-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 0px 0px 1px 0px;
		border-color: var(--color-light-20);
		border-style: solid;
	}
	.cover-body {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 8px 12px;
		box-sizing: border-box;
	}
	.cover-body > textarea {
		width: 100%;
		border: 0px;
		box-sizing: border-box;
		resize: none;
		height: 520px;
	}
	.cover-foot-wrapper {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 12px;
	}
	.cover-foot {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 1px 0px 0px 0px;
		border-color: var(--color-light-20);
		border-style: solid;
	}
</style>
