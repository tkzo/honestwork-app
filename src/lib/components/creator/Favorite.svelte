<script lang="ts">
	import { base, assets } from '$app/paths';
	import type { FavoriteType } from '$lib/stores/Types';
	export let favorite: FavoriteType;
</script>

<div style="height: 12px" />
<div class="container">
	<div class="left">
		<img src={favorite.image_url} alt={favorite.username} class="job-image" />
		<a class="content" href={`${base}/creator/${favorite.input.address}/`}>
			<div class="username">
				<p class="link">{favorite.username}</p>
				<div style="width:4px" />
				<img src={`${assets}/icons/external.svg`} alt="external" style="margin-top:-2px" />
			</div>
			<p class="light-60">{favorite.title}</p>
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
