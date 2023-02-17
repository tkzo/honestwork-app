<script>
	import { chainName } from '$lib/stores/Network';
	import { xmtpConnected, xmtpConnecting, userAddress, userState } from '$lib/stores/Network';
	import { assets } from '$app/paths';
	let pages = [
		{ name: 'faq', path: '/' },
		{ name: 'terms', path: '/' },
		{ name: 'privacy', path: '/' }
	];
</script>

<main>
	<div class="left-container">
		<div class="brand-section">
			<a href="https://decoded-labs.com" target="_blank" rel="noreferrer">
				<p class="light-40 semibold">ⓒ <span class="link">decoded</span></p>
			</a>
		</div>

		<div class="sitemap-section">
			{#each pages as page}
				<a href={page.path}>
					<p class="light-40 link">{page.name}</p>
				</a>
				<div style="width:8px" />
			{/each}
		</div>
		<div class="social-section">
			<a href="https://github.com/honestworkdao" target="_blank" rel="noreferrer">
				<img src={`${assets}/icons/github.svg`} alt="Github" />
			</a>
			<div style="width:8px" />
			<a href="https://twitter.com/honestworkdao" target="_blank" rel="noreferrer">
				<img src={`${assets}/icons/twitter.svg`} alt="Twitter" />
			</a>
			<div style="width:8px" />
			<a href="https://discord.gg/vP6R5unDBF" target="_blank" rel="noreferrer">
				<img src={`${assets}/icons/discord.svg`} alt="Discord" />
			</a>
		</div>
	</div>
	<div class="right-container">
		<div class="network-section">
			<p class="light-40 semibold">
				NETWORK <span
					style={$chainName != ''
						? 'color:var(--color-primary);'
						: 'color:var(--color-error);animation: blinking 2s linear infinite;'}
					>{$chainName != '' ? $chainName : 'n/a'}</span
				>
			</p>
		</div>
		<div class="network-section">
			{#if !$xmtpConnecting}
				<div style="width:4px" />
				<p class="light-40 ">
					xmtp <span
						style={$xmtpConnected
							? 'color:var(--color-success)'
							: 'color:var(--color-error); animation: blinking 2s linear infinite;'}
						>{$xmtpConnected ? 'active' : 'n/a'}</span
					>
				</p>
			{:else}
				<p class="light-40">xmtp</p>
				<div style="width:4px" />
				<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
			{/if}
		</div>

		<div class="network-section">
			<p class="light-40">membership</p>
			<div style="width:4px" />
			<p
				style={$userState > 0
					? 'color:var(--color-primary);'
					: 'color:var(--color-error);animation: blinking 2s linear infinite;'}
			>
				{$userState > 0 ? 'tier ' + $userState : 'n/a'}
			</p>
		</div>
		<div class="network-section">
			<p class="light-40">account</p>
			<div style="width:4px" />
			<p
				style={$userAddress != ''
					? 'color:var(--color-primary);'
					: 'color:var(--color-error);animation: blinking 2s linear infinite;'}
			>
				{$userAddress != ''
					? $userAddress.substring(0, 6) + '...' + $userAddress.substring($userAddress.length - 4)
					: 'n/a'}
			</p>
		</div>
	</div>
</main>

<style>
	img {
		height: 16px;
		width: 16px;
	}
	main {
		background: var(--color-dark);
		border-width: 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 99;
		height: 32px;
	}
	.brand-section {
		height: 30px;
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
	.social-section {
		height: 30px;

		display: flex;
		flex-direction: row;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.sitemap-section {
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.network-section {
		height: 30px;
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
	.left-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.right-container {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
</style>
