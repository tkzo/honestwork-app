<svelte:options immutable={true} />

<script lang="ts">
	import type { UserType } from '$lib/types/Types';
	import { onMount } from 'svelte';
	import type { JobType } from '$lib/types/Types';

	export let job: JobType;

	$: tags = [
		{
			key: 'installments',
			value: job.installments
		},
		{
			key: 'budget',
			value: '$' + job.budget.toString().slice(0, 6)
		}
	];

	let hashtags = ['UI/UX', 'LOGO DESIGN', 'BRANDING'];

	$: trimmed_description =
		job.description.length > 300 ? job.description.slice(0, 300) + '...' : job.description;
	let placeholder_image = 'assets/xcopy.gif';

	onMount(() => {
		fetchUser();
	});

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${job.user_address}`);
		user = await res.json();
	};
	let user: UserType;
</script>

<section>
	<div class="contents">
		<div class="content">
			<div>
				<p>{job.title}</p>
				<div style="height:4px" />
				<div class="body-text light-60">{trimmed_description}</div>
			</div>
			<div style="height: 16px" />
			<div class="hashtags">
				{#each hashtags as hashtag}
					<div class="hashtag">
						<p class="light-60">{hashtag}</p>
					</div>
					{#if hashtag != hashtags[hashtags.length - 1]}
						<div style="width: 4px" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#each tags as tag}
				<div class="tag">
					<p>{tag.value} <span class="light-40">{tag.key}</span></p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		width: 520px;
		flex-direction: column;
		cursor: pointer;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	.contents {
		display: flex;
		flex-direction: row;
		padding: 12px;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 362px;
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
		border-color: var(--color-light-20);
	}
	.hashtag:hover {
		background-color: var(--color-primary);
	}
	.hashtag:hover p {
		color: var(--color-dark);
	}
	.tag-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-width: 1px 0px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.tags {
		display: flex;
		flex-direction: row;
	}
	.tag {
		padding: 8px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
</style>
