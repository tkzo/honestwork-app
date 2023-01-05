<script>
	import {
		userAddress,
		userConnected,
		connectWallet,
		connecting,
		xmtpConnected
	} from '$lib/stores/Network';
	import { page } from '$app/stores';
</script>

<main>
	<div class="logo-section">
		<a href="/">
			<p class="yellow semibold link">HONESTWORK</p>
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
		<div style="width:12px" />
		<a href="/skills">
			<p class={$page.route.id == '/skills' ? 'yellow semibold link' : 'light-60 semibold link'}>
				skills
			</p>
		</a>
	</div>
	<div class="right-section">
		{#if $userConnected && $xmtpConnected}
			<a class="messages" href="/messages">
				<p class="light-40 link">messages</p>
			</a>
		{/if}
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
				<a href={`/profile`}>
					<p class="yellow semibold link">profile</p>
				</a>
			{/if}
		</div>
	</div>
</main>

<style>
	img {
		width: 16px;
		height: 16px;
	}
	main {
		background: var(--color-light-2);
		border-width: 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		width: 100%;
		z-index: 99;
		height: 32px;
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
		border-color: var(--color-light-10);
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
	.right-section {
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
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
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.messages {
		height: 100%;
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px 8px;
	}
</style>
