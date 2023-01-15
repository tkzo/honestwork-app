<script lang="ts">
	import type { UserType } from '$lib/stores/Types';
	import { placeholder_image } from '$lib/stores/Constants';
	import { connectNode, nodeProvider, userAddress, userConnected } from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { assets, base } from '$app/paths';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let user: UserType;
	let viewport: Element;
	let contents: Element;

	let nft_image: string;
	let ens_loading: boolean = false;
	let ens_name: string;
	let feedHeight = 0;
	$: if (browser) feedHeight = window.innerHeight - 128;
	onMount(() => {
		getNft();
		setEnsName();
	});

	const getNft = async () => {
		if (user.nft_address && user.nft_id) {
			try {
				const response = await fetch(`${base}/api/alchemy/${user.nft_address}/${user.nft_id}`);
				if (response.ok) {
					const data = await response.json();
					nft_image = data.image;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	const setEnsName = async () => {
		ens_loading = true;
		await connectNode();
		ens_name = await $nodeProvider.lookupAddress($page.params.address);
		ens_loading = false;
	};
</script>

<div class="wrapper">
	<div
		bind:this={viewport}
		class="viewport"
		style={`width:520px; height:${feedHeight.toString() + 'px'}`}
	>
		<div bind:this={contents} class="contents">
			<main>
				{#if user && user != null}
					<div class="profile-bar">
						<div class="left-section">
							<section>
								<img
									class="pfp"
									src={user.show_nft && nft_image != null
										? nft_image
										: user.image_url ?? placeholder_image}
									alt="Profile"
									placeholder={placeholder_image}
								/>
							</section>
							<div style="width:8px;" />
							<div class="info">
								{#if user.show_ens}
									{#if ens_loading}
										<div class="ens-loader">
											<img
												src={`${assets}/icons/loader.svg`}
												alt="loading"
												class="rotating"
												style="height:16px;width:16px;"
											/>
											<div style="width:4px" />
											<p>loading ens...</p>
										</div>
									{:else}
										<p>{ens_name}</p>
									{/if}
								{:else}
									<p>{user.username}</p>
								{/if}
								<div style="height:4px;" />
								<p class="yellow">{user.title}</p>
								<div style="height:4px;" />
								<p>4.8<span class="light-60">(377 votes)</span></p>
							</div>
						</div>
						<div class="right-section">
							<div class="button">
								<p class="yellow">send message</p>
							</div>
							<div style="height:8px" />
							<div class="button">
								<p class="light-60">add to favorites</p>
							</div>
						</div>
					</div>
					<div class="bio">
						<div class="body-text light-80">{user?.bio}</div>
					</div>
					{#each user.links as link, i}
						<a class="item" href={link} target="_blank" rel="noreferrer">
							<p>link #{i + 1} <span class="light-60">{link}</span></p>
							<img src={`${assets}/icons/external.svg`} alt="link" />
						</a>
					{/each}
				{/if}
			</main>
		</div>
	</div>
</div>

<style>
	main {
		width: 518px;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		cursor: pointer;
		padding: 12px;
	}
	.left-section {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.pfp {
		width: 60px;
		height: 60px;
	}
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.ens-loader {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 4px 8px;
		cursor: pointer;
	}
	.button:hover {
		background-color: var(--color-primary);
	}
	.button:hover p {
		color: var(--color-dark);
	}

	.bio {
		padding: 12px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.item {
		padding: 8px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.item:hover {
		background-color: var(--color-light-2);
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
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}
</style>
