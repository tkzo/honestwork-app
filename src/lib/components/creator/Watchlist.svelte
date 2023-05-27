<script lang="ts">
	import { base, assets } from '$app/paths';
	import type { WatchlistType } from '$lib/stores/Types';
	export let watchlist: WatchlistType;
</script>

<div style="height: 12px" />
<div class="container">
	<div class="left">
		<img src={watchlist.imageurl + '?tr=h-120,w-120'} alt={watchlist.username} class="job-image" />
		<a class="content" href={`${base}/job/${watchlist.input.address}/${watchlist.input.slot}`}>
			<div class="username">
				<p class="link">{watchlist.username}</p>
				<div style="width:4px" />
				<img src={`${assets}/icons/external.svg`} alt="external" style="margin-top:-2px" />
			</div>
			<p class="light-60">{watchlist.title}</p>
		</a>
	</div>
</div>

<style>
	.container {
		width: 95%;
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
