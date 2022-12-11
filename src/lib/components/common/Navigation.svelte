<script>
	import { userAddress, userConnected, connectWallet, connecting } from '$lib/stores/Network';
	import { page } from '$app/stores';
</script>

<main>
	<div class="logo-section">
		<a href="/">
			<p class="yellow semibold link">honestwork</p>
		</a>
		<div style="width:8px" />
		<p class="light-40">v0.10</p>
	</div>
	<div class="menu-section">
		<a href="/jobs">
			<p class={$page.route.id == '/jobs' ? 'yellow semibold link' : 'light-60 semibold link'}>
				jobs
			</p>
		</a>
		<div style="width:8px" />
		<p class="light-60">/</p>
		<div style="width:8px" />
		<a href="/skills">
			<p class={$page.route.id == '/skills' ? 'yellow semibold link' : 'light-60 semibold link'}>
				skills
			</p>
		</a>
		<div style="width:8px" />
		<p class="light-60">/</p>
		<div style="width:8px" />
		<a href="/projects">
			<p class={$page.route.id == '/projects' ? 'yellow semibold link' : 'light-60 semibold link'}>
				projects
			</p>
		</a>
	</div>
	<div class="wallet-section">
		{#if !$userConnected}
			{#if $connecting}
				<img src="icons/loader.svg" alt="loading" class="rotating" />
			{/if}
			<div style="width:4px" />
			<p class="yellow semibold link" on:click={connectWallet} on:keydown>connect</p>
		{:else}
			<p class="light-40">
				{$userAddress.substring(0, 6)}...{$userAddress.substring($userAddress.length - 4)}
			</p>
			<div style="width:8px" />
			<a href={`/api/auth?address=${$userAddress}`}>
				<p class="yellow semibold link">takez0_o</p>
			</a>
		{/if}
	</div>
</main>

<style>
	main {
		background: var(--color-dark);
		border-width: 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		width: 100%;
	}
	.logo-section {
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.menu-section {
		position: absolute;
		display: flex;
		flex-direction: row;
		transform: translate(-50%, 0);
		left: 50%;
		align-items: center;
		justify-content: center;
	}
	.wallet-section {
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding: 8px 12px;
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
</style>
