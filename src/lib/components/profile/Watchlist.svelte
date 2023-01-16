<script lang="ts">
	import { user_watchlist } from '$lib/stores/State';
	import { assets, base } from '$app/paths';
	import { userConnected, getWatchlist } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import type { Watchlist } from '$lib/stores/Types';
	import { fly } from 'svelte/transition';

	const handleRemove = async (item: Watchlist) => {
		if ($userConnected) {
			try {
				const url = `${base}/api/watchlist/remove`;
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
					toast.push('Removed from watchlist.');
					getWatchlist();
				} else {
					toast.push('Failed to remove from watchlist.');
				}
			} catch (error) {
				toast.push('Failed to remove from watchlist');
			}
		}
	};
</script>

<main>
	{#each $user_watchlist as item, index}
		<div class="container" in:fly={{ duration: 100 + 50 * index, x: 50 }}>
			<div class="left">
				<img src={item.image_url} alt={item.username} class="job-image" />
				<a
					class="content"
					href={`${base}/job/${item.input.address}/${item.input.slot}`}
					target="_blank"
					rel="noreferrer"
				>
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
		{#if item !== $user_watchlist[$user_watchlist.length - 1]}
			<div style="height:8px" />
		{/if}
	{/each}
</main>

<style>
	.container {
		display: flex;
		flex-direction: row;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
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
</style>
