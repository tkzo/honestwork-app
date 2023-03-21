<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Jumper } from 'svelte-loading-spinners';
	import { Svrollbar } from 'svrollbar';
	import { base } from '$app/paths';
	import { userAddress, userState, userConnected } from '$lib/stores/Network';
	import { chosen_profile_tab } from '$lib/stores/State';

	export let data;

	let viewport: Element;
	let contents: Element;
	let feedHeight = 0;
	$: if (browser) {
		feedHeight = window.innerHeight - 96;
	}
</script>

<main class="wrapper">
	<div
		bind:this={viewport}
		class="viewport"
		style={`width:100%; height:${feedHeight.toString() + 'px'}`}
	>
		<div bind:this={contents} class="contents">
			<div style="height:16px" />
			{#if $userAddress.toLowerCase() == data.user.address.toLowerCase() && $userState > 0}
				<section class="bar">
					<div class="tabs">
						<p
							class={`tab link semibold ${
								$chosen_profile_tab == 'profile' ? 'yellow' : 'light-60'
							}`}
							on:click={() => goto('/profile')}
							on:keydown
						>
							profile
						</p>
						<p
							class={`tab link semibold ${$chosen_profile_tab == 'skills' ? 'yellow' : 'light-60'}`}
							on:click={() => goto('/profile/skills')}
							on:keydown
						>
							skills
						</p>
						<p
							class={`tab link semibold ${
								$chosen_profile_tab == 'watchlist' ? 'yellow' : 'light-60'
							}`}
							on:click={() => goto('/profile/watchlist')}
							on:keydown
						>
							watchlist
						</p>
						<p
							class={`tab link semibold ${
								$chosen_profile_tab == 'favorites' ? 'yellow' : 'light-60'
							}`}
							on:click={() => goto('/profile/favorites')}
							on:keydown
						>
							favorites
						</p>
						<p
							class={`tab link semibold ${
								$chosen_profile_tab == 'applications' ? 'yellow' : 'light-60'
							}`}
							on:click={() => goto('/profile/applications')}
							on:keydown
						>
							applications
						</p>
					</div>
				</section>
				<div style="height: 16px" />
				<slot />
			{:else if $userConnected && $userAddress.toLowerCase() != data.user.address.toLowerCase()}
				<div style="height: 16px" />
				<section style="display:flex; flex-direction:column;">
					<div class="gm">
						<p>
							switch to <span class="light-60"
								>{data.user.address.substring(0, 6) +
									'...' +
									data.user.address.substring(data.user.address.length - 4)}</span
							> to see this page.
						</p>
					</div>
					<div class="gm link" on:click={() => goto(`${base}/auth`)} on:keydown>
						<p>
							or login with <span
								>{$userAddress.substring(0, 6) +
									'...' +
									$userAddress.substring($userAddress.length - 4)}</span
							>
						</p>
					</div>
				</section>
			{:else}
				<div class="loader-container">
					<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
				</div>
			{/if}
			<div style="height: 64px" />
		</div>
	</div>
	<Svrollbar {viewport} {contents} />
</main>

<style>
	.bio {
		width: 100%;
		height: 100%;
	}
	img {
		width: 188px;
		height: 188px;
	}
	.input-fields {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
	}
	.input-field {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		position: relative;
		background-color: var(--color-dark);
		align-items: center;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		padding: 8px;
	}

	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bar {
		width: 520px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px 12px 0px 0px;
		background: var(--color-light-2);
	}
	.info {
		width: 520px;
		display: flex;
		flex-direction: row;
	}
	.tabs {
		display: flex;
		flex-direction: row;
	}
	.tab {
		display: flex;
		flex-direction: row;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.flex-input {
		height: 32px;
		flex: 1;
		background-color: var(--color-dark);
	}
	.error {
		border-color: var(--color-error);
	}
	.success:focus {
		border-color: var(--color-success);
	}
	.infobox {
		width: 240px;
		padding: 8px;
		position: absolute;
		margin-left: 532px;
	}
	.gm {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.file-input {
		opacity: 0;
		width: 188px;
		height: 32px;
		cursor: pointer;
	}
	.file-input-container {
		position: relative;
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		cursor: pointer;
	}

	.pseudo-file-input {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
	.input-like {
		background-color: var(--color-dark);
		font-family: 'Proto Mono', monospace;
		color: var(--color-light);
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		font-size: 13px;
		line-height: 16px;
		box-sizing: border-box;
		flex: 1;
		height: 32px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.limit {
		position: relative;
	}
	.description-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 13px;
		line-height: 16px;
		align-items: center;
	}
	.description-title {
		padding: 8px;
		border-width: 1px 1px 0px 1px;
	}
	.nft-checkbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.save-changes {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}

	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}

	.contents {
		width: 520px;
	}

	.loader-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.external-page {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.external-page img {
		height: 16px;
		width: 16px;
	}
</style>
