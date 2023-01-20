<script>
	import {
		userAddress,
		userConnected,
		connectWallet,
		connecting,
		xmtpConnected,
		connectXmtp
	} from '$lib/stores/Network';
	import { page } from '$app/stores';
	import { assets } from '$app/paths';
	import { user_signed_in } from '$lib/stores/State';

	$: console.log('User signed in?:', $user_signed_in);
</script>

<main>
	<div class="logo-section">
		<a href="/">
			<p class="yellow semibold link">h0nestw0rk</p>
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
		{#if $userConnected && $xmtpConnected && $user_signed_in}
			<a class="messages" href="/messages">
				<p class={$page.route.id == '/messages' ? 'yellow' : 'light-60 link'}>messages</p>
			</a>
		{:else if $userConnected && !$xmtpConnected && $user_signed_in}
			<div class="messages">
				<p class="yellow link" on:click={connectXmtp} on:keydown>connect xmtp</p>
			</div>
		{/if}
		{#if $userConnected && $user_signed_in}
			<a class="messages" href="/listings">
				<p class={$page.route.id == '/listings' ? 'yellow' : 'light-60 link'}>listings</p>
			</a>
		{/if}
		<div class="wallet-section">
			{#if !$userConnected}
				{#if $connecting}
					<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
				{/if}
				<div style="width:4px" />
				<p class="yellow semibold link" on:click={connectWallet} on:keydown>connect</p>
			{:else if $user_signed_in}
				<a href={`/profile`}>
					<p class={$page.route.id == '/profile' ? 'yellow' : 'light-60 link'}>profile</p>
				</a>
			{:else}
				<a href={`/auth`}>
					<p class="yellow">login to hw</p>
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
		height: 100%;
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
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
	}
	.wallet-section {
		height: 100%;
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
