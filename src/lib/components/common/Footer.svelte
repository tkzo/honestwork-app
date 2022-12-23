<script>
	import { chainName } from '$lib/stores/Network';
	import { theme, toggleTheme } from '$lib/stores/Theme';
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
			<img src={`icons/${$theme == 'light' ? 'light/' : ''}github.svg`} alt="Github" />
			<div style="width:8px" />
			<img src={`icons/${$theme == 'light' ? 'light/' : ''}twitter.svg`} alt="Twitter" />
			<div style="width:8px" />
			<img src={`icons/${$theme == 'light' ? 'light/' : ''}discord.svg`} alt="Discord" />
		</div>
	</div>
	<div class="right-container">
		<div class="network-section">
			<p class="light-40 semibold">NETWORK <span class="yellow">{$chainName}</span></p>
		</div>
		<div class="network-section">
			<p
				class="light-40 semibold link"
				on:click={() => toggleTheme($theme == 'light' ? 'dark' : 'light')}
				on:keydown
			>
				{$theme == 'light' ? 'dark mode' : 'light mode'}
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
		background: var(--color-light-2);
		border-width: 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
	.social-section {
		display: flex;
		flex-direction: row;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.sitemap-section {
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.network-section {
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
