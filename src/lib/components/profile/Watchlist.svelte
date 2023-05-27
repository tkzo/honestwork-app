<script lang="ts">
	import { assets, base } from '$app/paths';
	import { userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import type { WatchlistType } from '$lib/stores/Types';
	import { fly } from 'svelte/transition';

	export let watchlist: Array<WatchlistType>;

	const handleRemove = async (item: WatchlistType) => {
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
					for (let i = 0; i < watchlist.length; i++) {
						if (item == watchlist[i]) {
							watchlist.splice(i, 1);
							watchlist = [...watchlist];
							break;
						}
					}
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Removed from watchlist.</p>`
					);
				} else {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Failed to remove from watchlist.</p>`
					);
				}
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Failed to remove from watchlist.</p>`
				);
			}
		}
	};
</script>

{#if watchlist == null || watchlist.length == 0}
	<div class="message-container">
		<p class="light-60">You didn't add any jobs to watchlist yet.</p>
	</div>
{:else}
	{#each watchlist as item, index (index)}
		<div class="container" in:fly={{ duration: 100 + 50 * index, x: 50 }}>
			<div class="left">
				<img src={item.imageurl + '?tr=h-120,w-120'} alt={item.username} class="job-image" />
				<a class="content" href={`${base}/job/${item.input.address}/${item.input.slot}`}>
					<div class="username">
						<p class="link">
							{item.username.length < 20 ? item.username : item.username.substring(0, 20) + '...'}
						</p>
						<div style="width:4px" />
						<img src={`${assets}/icons/external.svg`} alt="external" style="margin-top:-2px" />
					</div>
					<p class="light-60">{item.title}</p>
				</a>
			</div>
			<div class="button link" on:click={() => handleRemove(item)} on:keydown>
				<p class="light-60">remove from watchlist</p>
			</div>
		</div>
		{#if item !== watchlist[watchlist.length - 1]}
			<div style="height:8px" />
		{/if}
	{/each}
{/if}

<style>
	.container {
		width: 100%;
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
