<script lang="ts">
	import { assets, base } from '$app/paths';
	import { userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import type { FavoriteType } from '$lib/stores/Types';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let favorites: Array<FavoriteType> = [];

	const handleRemove = async (item: FavoriteType) => {
		if ($userConnected) {
			try {
				const url = `${base}/api/favorites/remove`;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						address: item.input.address,
						slot: item.input.slot
					})
				});
				const data = await response.json();
				if (data == 'success') {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Removed from favorites.</p>`
					);
					dispatch('remove');
				} else {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Failed to remove from favorites.</p>`
					);
				}
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Failed to remove from favorites.</p>`
				);
			}
		}
	};
</script>

<main>
	{#if favorites == null || favorites.length == 0}
		<div class="message-container">
			<p class="light-60">You didn't favorite any skill yet.</p>
		</div>
	{:else}
		{#each favorites as item, index (index)}
			<div class="container" transition:fly={{ duration: 100 + 50 * index, x: 50 }}>
				<div class="left">
					<img src={item.image_url + '?tr=h-120,w-120'} alt={item.username} class="job-image" />
					<a class="content" href={`${base}/creator/${item.input.address}/`}>
						<div class="username">
							<p class="link">{item.username}</p>
							<div style="width:4px" />
							<img src={`${assets}/icons/external.svg`} alt="external" style="margin-top:-2px" />
						</div>
						<p class="light-60">{item.title}</p>
					</a>
				</div>
				<div class="button link" on:click={() => handleRemove(item)} on:keydown>
					<p class="light-60">remove from favorites</p>
				</div>
			</div>
			{#if item !== favorites[favorites.length - 1]}
				<div style="height:8px" />
			{/if}
		{/each}
	{/if}
</main>

<style>
	.container {
		display: flex;
		flex-direction: row;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		justify-content: space-between;
		align-items: center;
	}
	.job-image {
		width: 60px;
		height: 60px;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 12px;
	}
	.username {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.button {
		height: 26px;
		margin-right: 12px;
	}
	.left {
		display: flex;
		flex-direction: row;
	}
	.message-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
