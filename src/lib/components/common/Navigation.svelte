<script>
	import { userAddress, userConnected, connectWallet } from '$lib/stores/Network';
	import { page } from '$app/stores';
</script>

<main>
	<div class="logo-section">
		<a href="/">
			<p class="yellow semibold">honestwork</p>
		</a>
		<div style="width:8px" />
		<p class="light-40 ">v0.10</p>
	</div>
	<div class="menu-section">
		<a href="/jobs">
			<p class={$page.route.id == '/jobs' ? 'yellow semibold link' : 'light-40 link'}>jobs</p>
		</a>
		<div style="width:8px" />
		<a href="/creators">
			<p class={$page.route.id == '/creators' ? 'yellow semibold link' : 'light-40 link'}>
				creators
			</p>
		</a>
	</div>
	<div class="wallet-section">
		{#if !$userConnected}
			<p class="yellow semibold link" on:click={connectWallet} on:keydown>connect</p>
		{:else}
			<p class="light-40">
				{$userAddress.substring(0, 6)}...{$userAddress.substring($userAddress.length - 4)}
			</p>
			<div style="width:8px" />
			<a href={`/api/auth?address=${$userAddress}`}>
				<p class="yellow semibold">takez0_o</p>
			</a>
		{/if}
	</div>
</main>

<style>
	main {
		background: var(--color-dark);
		border-width: 1px 0px;
		border-style: solid;
		border-color: rgba(255, 255, 255, 0.2);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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
		border-color: rgba(255, 255, 255, 0.2);
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
		border-color: rgba(255, 255, 255, 0.2);
		box-sizing: border-box;
	}
</style>
