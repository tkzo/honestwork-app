<script lang="ts">
	import type { UserType } from '$lib/stores/Types';
	import { Svrollbar } from 'svrollbar';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import { nodeProvider } from '$lib/stores/Network';
	import type { JobType } from '$lib/stores/Types';
	import { chains } from '$lib/stores/Chain';

	export let job: JobType;

	let viewport: Element;
	let contents: Element;

	let user: UserType;
	let nft_image: any;
	let ens_name: string;
	let placeholder_image = 'assets/xcopy.gif';
	let chosen_network: number;

	$: feedHeight = window.innerHeight - 136;
	$: if (job) {
		nft_image = '';
		fetchUser();
		if (job.tokens_accepted) {
			chosen_network = job.tokens_accepted[0].id;
		}
	}

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${job.user_address}`);
		user = await res.json();
		await getNft();
		ens_name = await $nodeProvider.lookupAddress(job.user_address);
	};
	const getNft = async () => {
		if (user.nft_address && user.nft_id) {
			try {
				const response = await fetch(`api/alchemy/${user.nft_address}/${user.nft_id}`);
				if (response.ok) {
					const data = await response.json();
					nft_image = data.image;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const getChainName = (chain_id: number) => {
		const name = chains.find((chain) => chain.id == chain_id)?.name;
		return name;
	};
	const getTokenName = (chain_id: number, address: string) => {
		const tokens = chains.find((chain) => chain.id == chain_id)?.tokens;
		const name = tokens?.find((token) => token.address == address)?.name;
		return name;
	};
	const getTokenSymbol = (chain_id: number, address: string) => {
		const tokens = chains.find((chain) => chain.id == chain_id)?.tokens;
		const symbol = tokens?.find((token) => token.address == address)?.symbol;
		return symbol;
	};
</script>

<main>
	<div class="profile-bar">
		<div class="left-section">
			<img
				class="pfp"
				src={user?.show_nft
					? nft_image && nft_image != ''
						? nft_image
						: placeholder_image
					: user?.image_url && user.image_url != ''
					? user.image_url
					: placeholder_image}
				alt=""
			/>
			<div style="width:8px;" />
			<div class="info">
				<div class="info-username">
					{#if user?.show_ens}
						{#if ens_name && ens_name != ''}
							<p>{ens_name}</p>
						{:else}
							<Skeleton width="100px" />
						{/if}
					{:else if user?.username && user.username != ''}
						<p>{user?.username}</p>
					{/if}
				</div>
				<div style="height:4px;" />
				<p class="light-60">{user?.title}</p>
				<div style="height:4px;" />
				<p>4.8<span class="light-60">(377)</span></p>
			</div>
		</div>
		<div class="right-section">
			<div class="button">
				<p class="yellow">apply to this job</p>
			</div>
			<div style="height:8px" />
			<div class="button">
				<p class="light-60">add to watchlist</p>
			</div>
		</div>
	</div>
	<div class="wrapper">
		<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
			<div bind:this={contents} class="contents">
				<div style="height:12px;" />
				<div class="description">
					<div class="body-text light-80">
						{job.description}
					</div>
				</div>
				<div style="height:12px;" />
				<div class="payment-container">
					{#if job.tokens_accepted && job.tokens_accepted.length > 0}
						<div class="network-tabs">
							{#each job.tokens_accepted as network}
								<div class="network-tab" on:click={() => (chosen_network = network.id)} on:keydown>
									<p class={chosen_network == network.id ? 'yellow' : 'light-60'}>
										{getChainName(network.id)}
									</p>
								</div>
							{/each}
						</div>
					{/if}
					<div class="token-container">
						<div class="token-wrapper">
							<div class="token-tabs">
								<p class="light-40">payment tokens</p>
								<div style="width:46px;" />
								<p class="light-40">contract address</p>
							</div>
							<div style="height:4px;" />
						</div>
						<div class="tokens">
							<div style="height:8px;" />
							{#if job.tokens_accepted}
								{#each job.tokens_accepted as network}
									{#if network.tokens && network.tokens.length > 0}
										{#each network.tokens as token, i}
											{#if network.id == chosen_network}
												<div class="token">
													<p class={i % 2 == 0 ? '' : 'light-60'}>
														{getTokenSymbol(network.id, token.address)}
													</p>
													<div class="address">
														<p class={i % 2 == 0 ? '' : 'light-60'}>{token.address}</p>
														<div style="width:4px;" />
														<img
															src="icons/external.svg"
															alt="External Link"
															style="margin-top:-2px;"
														/>
													</div>
												</div>
												{#if i != network.tokens.length - 1}
													<div style="height:8px;" />
												{/if}
											{/if}
										{/each}
									{/if}
								{/each}
							{:else}
								<p class="light-60">NO TOKEN INFO FOUND</p>
							{/if}
						</div>
					</div>
				</div>
				<div style="height:12px;" />
				<div class="links">
					{#if job.links && job.links.length > 0}
						{#each job.links as link}
							<div class="link-container">
								<p class="placeholder light-40">link</p>
								<div style="width:8px;" />
								<a href={link}>
									<p class="light-80">{link}</p>
								</a>
							</div>
							<div style="height:8px;" />
						{/each}
					{/if}
				</div>
				<div style="height:32px;" />
			</div>
		</div>
		<Svrollbar alwaysVisible {viewport} {contents} />
	</div>
</main>

<style>
	main {
		width: 520px;
		display: flex;
		flex-direction: column;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-width: 1px 1px 1px 1px;
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
	.info-username {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.description {
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
	}
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
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
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
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
	.network-tabs {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		cursor: pointer;
	}
	.network-tab:hover {
		background-color: var(--color-primary);
	}
	.network-tab:hover p {
		color: var(--color-dark);
	}
	.network-tab {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.token-container {
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
	}
	.token-tabs {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.token-wrapper {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.token {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}
	.token:hover {
		background-color: var(--color-light-2);
	}
	.address {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
