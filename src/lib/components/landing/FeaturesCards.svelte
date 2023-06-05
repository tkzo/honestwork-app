<script lang="ts">
	import { featureCards } from '$lib/stores/Constants';
	import { base, assets } from '$app/paths';
	import FeatureCard from './FeatureCard.svelte';
	import { env } from '$env/dynamic/public';
	import { starter_abi, erc20_abi } from '$lib/stores/ABI';
	import {
		userConnected,
		userAddress,
		networkSigner,
		chainID,
		connectWallet
	} from '$lib/stores/Network';
	import { ethers } from 'ethers';
	import { toast } from '@zerodevx/svelte-toast';
	import { MerkleTree } from 'merkletreejs';
	import { keccak256 } from 'ethers/lib/utils';
	import { onMount } from 'svelte';

	// todo: add dropdown to choose ambassador when minting
	// todo: generate proof to send along

	let chosen_tab: 'employers' | 'freelancers' = 'employers';
	let minting = false;
	let whitelist: string[];
	let proof: string[];
	let ambassador: string;

	onMount(async () => {
		await fetchWhitelist();
	});

	const generateProof = async () => {
		const leaves = whitelist.map((address: string) => keccak256(address));
		const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
		proof = tree.getHexProof(keccak256(ambassador));
		console.log('Proof:', proof);
	};

	const fetchWhitelist = async () => {
		const res = await fetch(`${base}/api/nft/ambassador-whitelist`);
		whitelist = await res.json();
		console.log('Whitelist:', whitelist);
	};

	const mint = async () => {
		minting = true;
		if (!$userConnected || !$userAddress) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>please connect wallet</p>`
			);
			await connectWallet();
		}
		if ($chainID != 42161) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>please switch to Arbitrum</p>`
			);
			return;
		}
		try {
			const starter = new ethers.Contract(
				env.PUBLIC_STARTER_NFT_ADDRESS,
				starter_abi,
				$networkSigner
			);
			const token = new ethers.Contract(
				env.PUBLIC_ARBITRUM_USDC_ADDRESS,
				erc20_abi,
				$networkSigner
			);
			const decimals = await token.decimals();
			const payment = await starter.payment();
			const fee = parseFloat(ethers.utils.formatUnits(payment.amount, decimals));
			const balance = parseFloat(
				ethers.utils.formatUnits(await token.balanceOf($userAddress), decimals)
			);
			if (balance < fee) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>not enough balance</p>`
				);
				return;
			}
			const approve = await token.approve(env.PUBLIC_STARTER_NFT_ADDRESS, fee);
			toast.push(
				`<p class="light-60"><span style='color:var(--color-primary)'>warning: </span>approve transaction initiated</p>`
			);
			await approve.wait();
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>approved</p>`
			);
			const tx = await starter.mint($userAddress);
			toast.push(
				`<p class="light-60"><span style='color:var(--color-primary)'>warning: </span>mint transaction initiated</p>`
			);
			await tx.wait();
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Starter NFT minted</p>`
			);
		} catch (err: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${err}</p>`
			);
		}
		minting = false;
	};
</script>

<div class="buttons-container">
	<div class="line" />
	<button
		on:click={() => (chosen_tab = 'employers')}
		class={chosen_tab == 'employers' ? 'selected button' : 'button'}>Employers</button
	>
	<button
		on:click={() => (chosen_tab = 'freelancers')}
		class={chosen_tab != 'employers' ? 'selected button' : 'button'}>Freelancers</button
	>
	<div class="line" />
</div>
<div style="height: 100px;" />
<div class="container" style={`background-image:url(${base}/assets/gridlock.webp)`}>
	{#each featureCards as card, index}
		{#if chosen_tab == card.type}
			<FeatureCard {card} {index} />
		{/if}
	{/each}
	<div style="height:20px" />
	<!-- <div class="calltoarms"> -->
	<!-- 	<div class="tag">LIMITED TIME OFFER</div> -->
	<!-- 	<h2 class="yellow">try it out with starter nft</h2> -->
	<!-- 	<div style="height:4px" /> -->
	<!-- 	<div class="body-text"> -->
	<!-- 		Post a skill for free and see if there's any demand for it. Once you validate for yourself, go -->
	<!-- 		for the full membership. -->
	<!-- 	</div> -->
	<!-- 	<div style="height:36px" /> -->
	<!-- 	<input -->
	<!-- 		bind:value={ambassador} -->
	<!-- 		class="ambassador" -->
	<!-- 		on:change={generateProof} -->
	<!-- 		placeholder="Enter ambassador address (optional)" -->
	<!-- 	/> -->
	<!-- 	<div style="height:24px" /> -->
	<!-- 	<div class="buttons"> -->
	<!-- 		<div class="cta" on:click={mint} on:keydown>Mint starter nft</div> -->
	<!-- 		<div style="width:12px" /> -->
	<!-- 		<a -->
	<!-- 			href="https://app.uniswap.org/#/swap" -->
	<!-- 			target="_blank" -->
	<!-- 			rel="noopener noreferrer" -->
	<!-- 			class="cta" -->
	<!-- 			on:click={mint} -->
	<!-- 			on:keydown -->
	<!-- 		> -->
	<!-- 			buy usdc -->
	<!-- 			<img src={`${assets}/icons/external.svg`} alt="External link" /> -->
	<!-- 		</a> -->
	<!-- 	</div> -->
	<!-- 	<div style="height:36px" /> -->
	<!-- 	<div class="tokens" id="tokens"> -->
	<!-- 		<p>chain:<span class="yellow">arbitrum</span></p> -->
	<!-- 		<div style="width:12px" /> -->
	<!-- 		<p>token:<span class="yellow">usdc</span></p> -->
	<!-- 		<div style="width:12px" /> -->
	<!-- 		<p>amount:<span class="yellow">$10</span></p> -->
	<!-- 	</div> -->
	<!-- </div> -->
</div>

<style>
	.ambassador {
		width: 480px;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 480px;
	}
	.buttons > a {
		flex: 1;
	}
	.tokens {
		display: flex;
		flex-direction: row;
	}
	.tag {
		position: absolute;
		top: -16px;
		border: 1px solid var(--color-primary);
		background-color: var(--color-dark);
		color: var(--color-primary);
		padding: 4px 8px;
	}
	.calltoarms .body-text,
	h2 {
		width: 480px;
		max-width: 90%;
	}
	.cta:hover {
		border: 1px solid var(--color-primary);
	}
	.cta {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 8px 20px;
		gap: 10px;
		border: 1px solid var(--color-light-20);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.1);
		cursor: pointer;
		color: var(--color-primary);
		transition: border 0.2s ease-in 0s;
		flex: 1;
	}
	.calltoarms {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		max-width: 600px;
		text-align: center;
		padding: 48px;
		border: 1px solid var(--color-primary);
		box-shadow: 0px 0px 250px rgba(255, 211, 105, 0.18);
	}
	.buttons-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 80vw;
		max-width: 960px;
	}
	.line {
		height: 1px;
		background-color: var(--color-light-20);
		width: 100%;
		max-width: 371px;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 120px;
		width: 80vw;
		max-width: 960px;
		padding-bottom: 120px;
		background-size: cover;
		background-repeat: none;
	}
	.button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
		border: 1px solid #ffd369;
		color: var(--color-primary);
		font-weight: 600;
		font-size: 12px;
		line-height: 12px;
	}
	.button:hover,
	.selected {
		background-color: var(--color-primary);
		color: var(--color-dark);
	}
</style>
