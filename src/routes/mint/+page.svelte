<script lang="ts">
	import {
		userConnected,
		userState,
		userAddress,
		chainID,
		connectIfCached
	} from '$lib/stores/Network';
	import { base, assets } from '$app/paths';
	import { placeholder_image } from '$lib/stores/Constants';
	import { Svrollbar } from 'svrollbar';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import { networkSigner } from '$lib/stores/Network';
	import { nft_abi } from '$lib/stores/ABI';
	import { env } from '$env/dynamic/public';
	import { toast } from '@zerodevx/svelte-toast';

	type Membership = {
		skills: number;
		referrals: number;
		price: string;
		applications: number;
	};

	export let viewport: Element;
	export let contents: Element;

	let minting = false;
	let upgrading = false;
	let refreshing = false;
	let image_url: string;
	let next_id: number;
	let dai_balance: number;
	let tiers: Membership[] = [
		{
			skills: 3,
			referrals: 2,
			price: '$100',
			applications: 2
		},
		{
			skills: 6,
			referrals: 3,
			price: '$250',
			applications: 3
		},
		{
			skills: 8,
			referrals: 4,
			price: '$300',
			applications: 5
		}
	];

	$: if ($userConnected) {
		fetchNextToken();
		getUserBalance();
	}
	onMount(() => {
		connectIfCached();
		setInterval(() => {
			fetchNextToken();
			getUserBalance();
		}, 20000);
	});

	const fetchNextToken = async () => {
		refreshing = true;
		try {
			const response = await fetch(`${base}/api/nft/next-token-image`);
			const jason = await response.json();
			image_url = jason.image_url;
			next_id = jason.next_id;
		} catch (error) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
			);
		}
		refreshing = false;
	};

	const mint = async () => {
		minting = true;
		if ($userState == 0 && parseInt($chainID) == 1) {
			try {
				const contract = new ethers.Contract(
					env.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS,
					nft_abi,
					$networkSigner
				);
				const tx = await contract.publicMint(env.PUBLIC_DAI_ADDRESS);
				const receipt = await tx.wait();
				if (receipt.status == 1) {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>you have been minted a token</p>`
					);
				}
			} catch (error: any) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error.reason}</p>`
				);
			}
		} else if ($userState == 0 && parseInt($chainID) != 1) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>switch to ethereum mainnet to mint</p>`
			);
		} else if ($userState > 0) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>you already have a token</p>`
			);
		}
		minting = false;
	};

	const getUserBalance = async () => {
		if ($userConnected) {
			try {
				const response = await fetch(`${base}/api/nft/user-balance/${$userAddress}`);
				const jason = await response.json();
				dai_balance = parseFloat(ethers.utils.formatEther(jason.balance));
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
				);
			}
		}
	};
</script>

<svelte:head>
	<title>HW | Mint</title>
	<meta name="description" content="HonestWork Genesis Minting" />
</svelte:head>

{#if $userConnected}
	<div class="wrapper">
		<div bind:this={viewport} class="viewport">
			<div bind:this={contents} class="contents">
				<main>
					{#each tiers as tier, i}
						<section class="border-all">
							<div class="mint-header">
								<p class="yellow">
									genesis tier
									{#each new Array(i + 1) as _}
										i
									{/each}
								</p>
							</div>
							<div style="height:8px" />
							<div class="mint-feature">
								<p class="light-60">skills</p>
								<p>{tier.skills}</p>
							</div>
							<div style="height:8px" />
							<div class="mint-feature">
								<p class="light-60">referrals</p>
								<p>{tier.referrals}</p>
							</div>
							<div style="height:8px" />
							<div class="mint-feature">
								<p class="light-60">price</p>
								<p>{tier.price}</p>
							</div>
							<div style="height:8px" />
							<div class="mint-feature">
								<p class="light-60">applications/day</p>
								<p>{tier.applications}</p>
							</div>
							<div style="height:28px" />
							<div class="divider" />
							<div style="height:28px" />
							<div class="mint-feature">
								<p class="light-60">payment token</p>
								<p>dai</p>
							</div>
							<div style="height:8px" />
							<div class="mint-feature">
								<p class="light-60">your balance</p>
								<p>
									{dai_balance?.toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD'
									})}
								</p>
							</div>
							<div style="height:28px" />
							<div class="button link" on:click={mint} on:keydown>
								{#if i == 0}
									{#if minting}
										<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
									{/if}
									<div style="width:4px" />
									<p class="yellow">mint</p>
								{:else}
									<p class="yellow">mint & upgrade</p>
								{/if}
							</div>
						</section>
					{/each}
				</main>
				<div style="height:12px" />
				<div class="buy-tokens">
					<a href="https://app.uniswap.org/#/swap" target="_blank" rel="noreferrer"
						><p>
							we current accept payments with <span class="yellow">dai</span> only. you can
							<span class=" yellow link" style="text-decoration:underline">buy some here</span>
						</p></a
					>
				</div>
				<div style="height: 24px" />
				<div class="image-header">
					<p class="yellow">next mint</p>
					<p>genesis #{next_id}</p>
				</div>
				<img src={refreshing ? placeholder_image : image_url} alt="Next NFT" />
				<div style="height: 120px" />
			</div>
		</div>
		<Svrollbar {viewport} {contents} />
	</div>
{/if}

<style>
	main {
		width: 760px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	section {
		width: 240px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		box-sizing: border-box;
		padding: 12px;
	}
	.image-header {
		width: 760px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		background-color: var(--color-dark);
	}
	.mint-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.mint-feature {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	img {
		width: 760px;
		height: 760px;
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
		width: 100%;
	}
	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;
		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}
	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.divider {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.buy-tokens {
		width: 760px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		background-color: var(--color-dark);
	}
	.rotating {
		height: 16px;
	}
	.button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
