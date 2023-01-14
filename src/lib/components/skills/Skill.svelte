<svelte:options immutable={true} />

<script lang="ts">
	import { new_conversation_address, new_conversation_metadata } from '$lib/stores/State';
	import type { UserType } from '$lib/stores/Types';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { placeholder_image } from '$lib/stores/Constants';

	export let title: string;
	export let description: string;
	export let image_urls: Array<string>;
	export let minimum_price: number;
	export let chosen: boolean;
	export let user_address: string;

	//todo: make this dynamic
	$: tags = [
		{
			key: 'member',
			value: 'tier 3'
		},
		{
			key: 'jobs delivered',
			value: '666'
		},
		{
			key: 'min. budget',
			value: '$' + minimum_price.toString().slice(0, 6)
		}
	];

	$: trimmed_description =
		description.length > 120 ? description.slice(0, 120) + '...' : description;

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
	let hovering_heart: boolean = false;
</script>

<section class={chosen ? 'chosen' : ''}>
	<div class="contents">
		<div class="thumbnail">
			<img
				src={image_urls[0] ?? placeholder_image}
				alt="gallery"
				class="preview-image"
				bind:this={image_component}
			/>
		</div>
		<div class="content">
			<div>
				<p>{title}</p>
				<div style="height:12px" />
				<div class="body-text light-60">{trimmed_description}</div>
			</div>
			<div class="sub">
				<p class="yellow">{user?.username}</p>
				<p>4.9<span class="light-60">(366)</span></p>
			</div>
		</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#each tags as tag}
				<div class="tag">
					<p class="link">{tag.value} <span class="light-40">{tag.key}</span></p>
				</div>
				{#if tag != tags[tags.length - 1]}
					<div style="width: 4px" />
				{/if}
			{/each}
		</div>
		<div class="actions">
			<div
				class="action"
				on:click={() => {
					new_conversation_address.set(user_address);
					new_conversation_metadata.set({ title: title });
				}}
				on:keydown
			>
				<a href="/messages"> <img src={`${assets}/icons/message.svg`} alt="message" /> </a>
			</div>
			<div
				class="action"
				on:mouseover={() => (hovering_heart = true)}
				on:focus
				on:mouseout={() => (hovering_heart = false)}
				on:blur
			>
				{#if hovering_heart}
					<img src={`${assets}/icons/halfheart.svg`} alt="heart" />
				{:else}
					<img src={`${assets}/icons/heart.svg`} alt="heart" />
				{/if}
			</div>
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
	}
	.thumbnail {
		height: 180px;
		width: 240px;
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 8px;
		justify-content: space-between;
		width: 278px;
	}
	.sub {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.preview-image {
		height: 180px;
		width: 240px;
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
	.tag:hover {
		background-color: var(--color-primary);
	}
	.tag:hover p {
		color: var(--color-dark);
	}
	.tag:hover span {
		color: var(--color-dark);
	}
	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.action {
		height: 16px;
		padding: 8px;
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.chosen {
		background-color: var(--color-light-2);
	}
</style>
