<script lang="ts">
	import { user_watchlist } from '$lib/stores/State';
	import { assets, base } from '$app/paths';
</script>

<main>
	{#each $user_watchlist as item}
		<a
			class="container"
			href={`${base}/job/${item.input.address}/${item.input.slot}`}
			target="_blank"
			rel="noreferrer"
		>
			<img src={item.image_url} alt={item.username} class="job-image" />
			<div class="content">
				<div class="username">
					<p>{item.username}</p>
					<div style="width:4px" />
					<img src={`${assets}/icons/external.svg`} alt="external" style="margin-top:-2px" />
				</div>
				<p class="light-60">{item.title}</p>
			</div>
		</a>
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
		cursor: pointer;
	}
	.container:hover {
		background-color: var(--color-light-2);
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
</style>
