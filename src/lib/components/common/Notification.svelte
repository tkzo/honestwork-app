<script lang="ts">
	import { userState, userConnected } from '$lib/stores/Network';
	import { page } from '$app/stores';

	// todo: define a global logic for notification component
</script>

<main>
	<!-- {#if $userState != -1}
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
	{/if} -->
	{#if $page.route.id == '/jobs'}
		<div class="bar">
			<p class="light-80">looking for awesome people for your project?</p>
			<div style="width:8px" />
			<a href="/new_job" class="post-link">
				<p class="link underlined">post a job</p>
				<div style="width:8px" />
				<img src="/icons/post.svg" alt="post a job" />
			</a>
		</div>
	{:else if $page.route.id == '/new_job'}
		{#if $userState == -1}
			<div class="bar">
				<p class="light-40">grab an nft to get airdrop tokens from your activities!</p>
				<div style="width:8px" />
				<a href="/new_job" class="post-link">
					<p class="link underlined">mint and start accumulating</p>
					<div style="width:8px" />
					<img src="/icons/trending.svg" alt="post a job" />
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
	.underlined {
		text-decoration: underline;
	}
	.bar {
		width: 100%;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 8px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.post-link {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
