<script lang="ts">
	import { Svrollbar } from 'svrollbar';
	import { user_signed_in } from '$lib/stores/State';
	import type { JobType, WatchlistType } from '$lib/stores/Types';
	import { chains } from '$lib/stores/Constants';
	import { browser } from '$app/environment';
	import { placeholder_image } from '$lib/stores/Constants';
	import { userAddress, userConnected } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';
	import { base, assets } from '$app/paths';
	import { page } from '$app/stores';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	//@ts-ignore
	import Clipboard from 'svelte-clipboard';

	export let job: JobType;
	export let show_tags: boolean = false;

	let viewport: Element;
	let contents: Element;
	let chosen_network: number;
	let watchlisted: boolean = false;
	let feedHeight = 0;
	$: if (browser) feedHeight = window.innerHeight - 233;
	$: if (job && browser) {
		if (job.tokensaccepted) {
			chosen_network = job.tokensaccepted[0].id;
		}
	}
	$: user_applied = job.applications
		? job.applications.length != 0
		: false
		? job.applications.findIndex((n) => n.useraddress == $userAddress) != -1
		: false;
	$: if (job) {
		getWatchlist();
	}

	const getWatchlist = async () => {
		if (!$user_signed_in || !$userConnected) {
			return;
		}
		try {
			const url = `${base}/api/watchlist/get/${$userAddress}`;
			const response = await fetch(url);
			const data = await response.json();
			if (data && data.length != 0) {
				watchlisted = false;
				data.forEach((f: WatchlistType) => {
					if (f.input.address == job.useraddress && f.input.slot == job.slot) {
						watchlisted = true;
					}
				});
			}
		} catch (e) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${e}</p>`
			);
		}
	};
	const getChainName = (chain_id: number) => {
		const name = chains.find((chain) => chain.id == chain_id)?.name;
		return name;
	};
	const getChainExplorer = (id: number) => {
		let explorer = chains.find((chain) => chain.id == id)?.explorer;
		return explorer;
	};
	const getTokenSymbol = (chain_id: number, address: string) => {
		const tokens = chains.find((chain) => chain.id == chain_id)?.tokens;
		const symbol = tokens?.find((token) => token.address == address)?.symbol;
		return symbol;
	};
	const handleWatch = async () => {
		if ($userConnected) {
			try {
				const url = `${base}/api/watchlist/add`;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						address: job.useraddress,
						slot: job.slot
					})
				});
				const data = await response.json();
				if (data == 'success') {
					watchlisted = true;
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Added to watchlist</p>`
					);
				} else {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${data}</p>`
					);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	const getRating = async () => {
		if (browser) {
			try {
				const url = `${base}/api/rating/${job.useraddress}`;
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const data = await response.json();
				return data;
			} catch (e) {
				console.log(e);
			}
		}
	};
</script>

<main>
	<div class="profile-bar">
		<div class="left-section">
			<img
				class="pfp"
				src={job.imageurl ? job.imageurl + '?tr=h-188,w-188' : placeholder_image}
				alt=""
			/>
			<div style="width:8px;" />
			<div class="info">
				<div class="info-username">
					<p class="yellow">{job.username}</p>
				</div>
				<div style="height:4px;" />
				<p>{job.title}</p>
				<div style="height:12px;" />
				{#await getRating()}
					<img
						src={`${assets}/icons/loader.svg`}
						alt="loading"
						class="rotating"
						style="height:16px;width:16px;"
					/>
				{:then rating}
					<p><span class="light-60">rating:</span>{rating}/10</p>
				{/await}
				{#if show_tags}
					<div style="height:4px;" />
					<p><span class="light-60">budget:</span>${job.budget}</p>
				{/if}
			</div>
		</div>
		<div class="right-section">
			{#if $page.route.id == '/jobs' && job.dealid == -1}
				{#if !user_applied}
					<a class="button" href={`/job/${job.useraddress}/${job.slot}`}>
						<p class="yellow">apply to this job</p>
					</a>
				{:else}
					<div class="already-applied">
						<p class="light-80">already applied</p>
						<div style="width: 4px;" />
						<img src={`${assets}/icons/check.svg`} alt="Already applied" />
					</div>
				{/if}
			{/if}
			<div style="height:8px" />
			{#if watchlisted == true}
				<div class="already-applied">
					<p class="light-80">already in list</p>
					<div style="width: 4px;" />
					<img src={`${assets}/icons/check.svg`} alt="Already applied" />
				</div>
			{:else}
				<div class="button link" on:click={handleWatch} on:keydown>
					<p class="light-60">add to watchlist</p>
				</div>
			{/if}
			<div style="height:8px" />
			<Clipboard
				text={`https://honestwork.app/job/${job.useraddress}/${job.slot}`}
				let:copy
				on:copy={() => {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>copied to clipboard</p>`
					);
				}}
			>
				<div class="button" on:click={copy} on:keydown>
					<p class="light-60">share job link</p>
				</div>
			</Clipboard>
		</div>
	</div>
	<div class="wrapper">
		<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
			<div bind:this={contents} class="contents">
				{#if show_tags && job.tags}
					<div class="tags">
						{#each job.tags as tag}
							<div class="tag link">
								<p>{tag}</p>
							</div>
							{#if job.tags.indexOf(tag) != job.tags.length - 1}
								<div style="width:8px;" />
							{/if}
						{/each}
					</div>
				{:else}
					<div style="height:12px;" />
				{/if}
				{#key job.description}
					<Tiptap content={JSON.parse(job.description)} editable={false} />
				{/key}
				<div style="height:12px;" />
				<div class="payment-container">
					{#if job.tokensaccepted && job.tokensaccepted.length > 0}
						<div class="network-tabs">
							{#each job.tokensaccepted as network}
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
							{#if job.tokensaccepted}
								{#each job.tokensaccepted as network}
									{#if network.tokens && network.tokens.length > 0}
										{#each network.tokens as token, i}
											{#if network.id == chosen_network}
												<a
													class="token"
													href={`${getChainExplorer(network.id)}/${token.address}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													<p class={i % 2 == 0 ? '' : 'light-60'}>
														{getTokenSymbol(network.id, token.address)}
													</p>
													<div class="address">
														<p class={i % 2 == 0 ? '' : 'light-60'}>
															{token.address.slice(0, 12) + '...'}
														</p>
														<div style="width:4px;" />
														<img
															src={`${assets}/icons/external.svg`}
															alt="External Link"
															style="margin-top:-2px;"
														/>
													</div>
												</a>
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
								<a href={link} target="_blank" rel="noopener noreferrer">
									<p class="light-80">{link.length > 40 ? link.slice(0, 32) + '...' : link}</p>
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
		max-width: 520px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
		box-sizing: border-box;
		width: 100%;
	}
	.left-section {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		max-width: 320px;
	}
	.pfp {
		width: 94px;
		height: 94px;
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
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
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
	.button {
		width: 172px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
	}
	.token-container {
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
		box-sizing: border-box;
	}
	.token-tabs {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.token-wrapper {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
	.tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12px;
	}
	.tag {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 8px 12px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.already-applied {
		width: 172px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 4px 8px;
		box-sizing: border-box;
	}
	.right-section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		flex-wrap: wrap;
	}
	@media (max-width: 600px) {
		.profile-bar {
			flex-direction: column;
		}
		.right-section {
			flex-direction: row;
		}
	}
</style>
