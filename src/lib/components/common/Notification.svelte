<script lang="ts">
	import { userState, userConnected } from '$lib/stores/Network';
	import { page } from '$app/stores';
</script>

<main>
	{#if $userState != -1}
		{#if (!$userConnected || $userState == 0) && $page.route.id != ('/connect_wallet' && '/mint')}
			<div class="bar">
				<p class="light-80">you're in guest mode</p>
				<div style="width:8px" />
				<p>😱</p>
				<div style="width:8px" />
				<p class="light-80">-></p>
				<div style="width:8px" />
				<a href="/mint">
					<p class="yellow semibold link">mint your pass now</p>
				</a>
			</div>
		{:else if $userState == 1}
			<div class="bar">
				<p class="light-80">your nft is not soulbound.</p>
				<div style="width:8px" />
				<p>😱</p>
				<div style="width:8px" />
				<p class="light-80">-></p>
				<div style="width:8px" />
				<a href="/bind">
					<p class="yellow semibold link">bind your nft now</p>
				</a>
			</div>
		{/if}
	{/if}
</main>

<style>
	main {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bar {
		width: 520px;
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 8px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
</style>
