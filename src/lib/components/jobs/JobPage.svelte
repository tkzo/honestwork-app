<script lang="ts">
	import { Svrollbar } from 'svrollbar';
	import type { JobType } from '$lib/stores/Types';
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

	let feedHeight = 0;
	$: if (browser) feedHeight = window.innerHeight - 233;
	$: if (job && browser) {
		if (job.tokens_accepted) {
			chosen_network = job.tokens_accepted[0].id;
		}
	}

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
						address: job.user_address,
						slot: job.slot
					})
				});
				const data = await response.json();
				if (data == 'success') {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Added to watchlist!</p>`
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
				const url = `${base}/api/rating/${job.user_address}`;
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
			<img class="pfp" src={job.image_url ?? placeholder_image} alt="" />
			<div style="width:8px;" />
			<div class="info">
				<div class="info-username">
					<p>{job.username}</p>
				</div>
				<div style="height:4px;" />
				<p class="light-60">{job.title}</p>
				<div style="height:4px;" />
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
			</div>
		</div>
		<div class="right-section">
			{#if $page.route.id == '/jobs' && job.deal_id == null}
				<a class="button" href={`/job/${job.user_address}/${job.slot}`}>
					<p class="yellow">apply to this job</p>
				</a>
			{/if}
			<div style="height:8px" />
			<div class="button link" on:click={handleWatch} on:keydown>
				<p class="light-60">add to watchlist</p>
			</div>
			<div style="height:8px" />
			<Clipboard
				text={`https://honestwork.app/job/${job.user_address}/${job.slot}`}
				let:copy
				on:copy={() => {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>copied to clipboard!</p>`
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
														<p class={i % 2 == 0 ? '' : 'light-60'}>{token.address}</p>
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
		align-items: flex-start;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		cursor: pointer;
		padding: 12px;
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
	}
	.token-tabs {
		display: flex;
		flex-direction: row;
		align-items: center;
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
</style>
