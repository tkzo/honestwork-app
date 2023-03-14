<script lang="ts">
	import type { PageData } from './$types';
	import JobPage from '$lib/components/jobs/JobPage.svelte';
	import { base } from '$app/paths';
	import { userConnected, userAddress } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	import { parseContent } from '$lib/stores/Parser';
	import { CoverLetterInput } from '$lib/stores/Validation';

	export let data: PageData;

	let content: string;
	let total_chars = 0;

	const handleApply = async () => {
		const input: CoverLetterInput = {
			user_address: $userAddress,
			job_id: `job:${data.job.user_address}:${data.job.slot}`,
			cover_letter: parseContent(content)
		};
		let parsed = CoverLetterInput.safeParse(input);
		if (!parsed.success) {
			for (let i = 0; i < parsed.error.errors.length; i++) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>${parsed.error.errors[i].path}: </span>${parsed.error.errors[i].message}</p>`
				);
			}
			return;
		}

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
						cover_letter: content
					})
				});
				const res = await response.json();
				if (res == 'success') {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Application received.</p>`
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
	const handleContentInput = (e: any) => {
		content = JSON.stringify(e.detail.content);
		total_chars = parseContent(content).length;
	};
</script>

<svelte:head>
	<title>HW | Job Listing</title>
	<meta name="description" content="HonestWork Job Page" />
</svelte:head>

<div style="height:16px" />
<main>
	<JobPage job={data.job} show_tags={true} />
	<div style="width:12px" />
	<div class="cover-letter">
		<div class="cover-head">
			<div class="left">
				<p>cover letter <span class="light-60">(optional </span></p>
				<div style="height:8px" />
				<p class="light-60"><span class="yellow">&nbsp;{total_chars}</span>/1000)</p>
			</div>

			<p class="yellow link" on:click={handleApply} on:keydown>apply</p>
		</div>
		<div style="height:8px" />
		<div class="description">
			<Tiptap on:content={handleContentInput} editable={true} />
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
	}
	.cover-head {
		width: 100%;
		border: 1px solid var(--color-light-20);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		box-sizing: border-box;
		background-color: var(--color-light-2);
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.description {
		width: 100%;
		box-sizing: border-box;
	}
</style>
