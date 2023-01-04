<svelte:options immutable={true} />

<script lang="ts">
	import { new_conversation_address, new_conversation_metadata } from '$lib/stores/State';
	import type { UserType } from '$lib/types/Types';
	import { onMount } from 'svelte';

	export let username: string;
	export let title: string;
	export let description: string;
	export let image_url: string;
	export let budget: number;
	export let installments: number;
	export let chosen: boolean;
	export let user_address: string;
	export let rating: number;
	export let user_title: string;

	//todo: make this dynamic
	$: tags = [
		{
			key: 'jobs created',
			value: '666'
		},
		{
			key: 'installments',
			value: installments
		},
		{
			key: 'budget',
			value: '$' + budget.toString().slice(0, 6)
		}
	];

	let hashtags = ['UI/UX', 'LOGO DESIGN', 'BRANDING'];

	$: trimmed_description =
		description.length > 300 ? description.slice(0, 300) + '...' : description;
	let placeholder_image = 'assets/xcopy.gif';

	onMount(() => {
		fetchUser();
	});

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${user_address}`);
		user = await res.json();
	};
	let user: UserType;
	//todo: show placeholder until image is loaded
	let image_component: HTMLImageElement;
</script>

<section class={chosen ? 'chosen' : ''}>
	<div class="title-bar">
		<div class="tags">
			<div class="tag">
				<p class="yellow">{username}</p>
			</div>
			<div class="tag">
				<p class="light-60">{user_title}</p>
			</div>
			<div class="tag">
				<p>{rating}<span class="light-60">(366)</span></p>
			</div>
		</div>
	</div>
	<div class="contents">
		<img
			src={image_url ?? placeholder_image}
			alt="gallery"
			class="preview-image"
			bind:this={image_component}
		/>
		<div style="width:12px;" />
		<div class="content">
			<div>
				<p>{title}</p>
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
<div style="height: 12px" />

<style>
	section {
		width: 520px;
		flex-direction: column;
		cursor: pointer;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	.contents {
		display: flex;
		flex-direction: row;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
	}
	.title-bar {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
	}
	.hashtag:hover {
		background-color: var(--color-primary);
	}
	.hashtag:hover p {
		color: var(--color-dark);
	}
</style>
