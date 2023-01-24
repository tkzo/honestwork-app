<svelte:options immutable={true} />

<script lang="ts">
	import type { JobType, UserType } from '$lib/stores/Types';
	import { onMount } from 'svelte';
	import { placeholder_image } from '$lib/stores/Constants';

	export let chosen: boolean;
	export let job: JobType;

	let user: UserType;
	let hashtags = job.tags;

	// todo: inline this
	$: infos = [
		{
			key: 'installments',
			value: job.installments
		},
		{
			key: 'budget',
			value: '$' + job.budget.toString().slice(0, 6)
		}
	];
	$: trimmed_description =
		job.description.length > 300 ? job.description.slice(0, 300) + '...' : job.description;

	onMount(() => {
		fetchUser();
	});

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${job.user_address}`);
		user = await res.json();
	};
	const parseContent = (content: string) => {
		let chars: string = '';
		let c = content;
		let ps = c.split('<p>');
		for (let i = 0; i < ps.length; i++) {
			if (ps[i].includes('</p>')) {
				ps[i] = ps[i].split('</p>')[0];
			}
		}
		ps.shift();

		for (let i = 0; i < ps.length; i++) {
			chars += ps[i] + '...';
		}
		return chars;
	};
</script>

<section class={chosen ? 'chosen' : ''}>
	<div class="title-bar">
		<div class="tags">
			<div class="tag">
				<p class="yellow">
					{job.username ?? user.username}
				</p>
			</div>
			<div class="tag">
				<p>{job.title}</p>
			</div>
		</div>
	</div>
	<div class="contents">
		<img src={job.image_url ?? placeholder_image} alt="gallery" class="preview-image" />
		<div style="width:12px;" />
		<div class="content">
			<div class="body-text light-60">{parseContent(job.description)}</div>
			<div style="height: 16px" />
			<div class="hashtags">
				{#if hashtags && hashtags.length > 0}
					{#each hashtags as hashtag}
						<div class="hashtag">
							<p class="light-60">{hashtag}</p>
						</div>
						{#if hashtag != hashtags[hashtags.length - 1]}
							<div style="width: 4px" />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#if infos && infos.length > 0}
				{#each infos as info}
					<div class="tag">
						<p>{info.value} <span class="light-40">{info.key}</span></p>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
<div style="height: 12px" />

<style>
	section {
		width: 520px;
		flex-direction: column;
		cursor: pointer;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	.contents {
		display: flex;
		flex-direction: row;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 362px;
	}
	.preview-image {
		height: 120px;
		width: 120px;
	}
	.tag-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.tags {
		display: flex;
		flex-direction: row;
	}
	.tag {
		padding: 8px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.title-bar {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.chosen {
		background-color: var(--color-light-2);
	}
	.hashtags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.hashtag {
		padding: 4px 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.hashtag:hover {
		background-color: var(--color-primary);
	}
	.hashtag:hover p {
		color: var(--color-dark);
	}
</style>
