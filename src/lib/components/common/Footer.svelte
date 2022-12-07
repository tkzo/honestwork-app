<script>
	let pages = [
		{ name: 'faq', path: '/' },
		{ name: 'terms', path: '/' },
		{ name: 'privacy', path: '/' }
	];
</script>

<main>
	<div class="left-container">
		<div class="brand-section">
			<p class="light-40 semibold">ⓒ 2022 decoded-labs</p>
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
			<img src="icons/github.svg" alt="Github" />
			<div style="width:8px" />
			<img src="icons/twitter.svg" alt="Twitter" />
			<div style="width:8px" />
			<img src="icons/discord.svg" alt="Discord" />
		</div>
	</div>
	<div class="right-container">
		<div class="network-section">
			<p class="light-40 semibold">mainnet</p>
		</div>
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
	.brand-section {
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
	.social-section {
		display: flex;
		flex-direction: row;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: rgba(255, 255, 255, 0.2);
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
		border-color: rgba(255, 255, 255, 0.2);
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
		border-color: rgba(255, 255, 255, 0.2);
		box-sizing: border-box;
	}
	.left-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
