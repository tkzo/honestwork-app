<script lang="ts">
	import { base, assets } from '$app/paths';
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

	let minting = false;
	let whitelist: string[];
	let proof: string[];
	let ambassador: string;

	onMount(async () => {
		await fetchWhitelist();
	});

	const generateProof = async () => {
		try {
			if (ambassador.length != 0 && whitelist.includes(ambassador)) {
				const leaves = whitelist.map((address: string) => keccak256(address));
				const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
				proof = tree.getHexProof(keccak256(ambassador));
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>proof generated</p>`
				);
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Unable to generate proof</p>`
				);
			}
		} catch (err) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>success: </span>${err}</p>`
			);
		}
	};

	const fetchWhitelist = async () => {
		const res = await fetch(`${base}/api/nft/ambassador-whitelist`);
		whitelist = await res.json();
	};

	const _mint = async () => {
		const starter = new ethers.Contract(
			env.PUBLIC_STARTER_NFT_ADDRESS,
			starter_abi,
			$networkSigner
		);
		const tx = await starter.mint();
		toast.push(
			`<p class="light-60"><span style='color:var(--color-primary)'>info: </span>mint transaction initiated</p>`
		);
		await tx.wait();
		toast.push(
			`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Starter NFT minted</p>`
		);
	};
	const _ambassador_mint = async () => {
		const starter = new ethers.Contract(
			env.PUBLIC_STARTER_NFT_ADDRESS,
			starter_abi,
			$networkSigner
		);
		const tx = await starter.ambassadorMint(ambassador, proof);
		toast.push(
			`<p class="light-60"><span style='color:var(--color-primary)'>info: </span>mint transaction initiated</p>`
		);
		await tx.wait();
		toast.push(
			`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Starter NFT minted</p>`
		);
	};

	const mint = async () => {
		minting = true;
		if (!$userConnected || !$userAddress) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-primary)'>info: </span>connecting wallet</p>`
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
			toast.push(
				`<p class="light-60"><span style='color:var(--color-primary)'>info: </span>approve transaction initiated</p>`
			);
			const allowance = parseFloat(
				ethers.utils.formatUnits(
					await token.allowance($userAddress, env.PUBLIC_STARTER_NFT_ADDRESS),
					decimals
				)
			);
			if (allowance < fee) {
				const approve = await token.approve(env.PUBLIC_STARTER_NFT_ADDRESS, fee);
				await approve.wait();
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>approved</p>`
				);
			}
			if (proof) {
				await _ambassador_mint();
			} else {
				await _mint();
			}
		} catch (err: any) {
			console.log(err);
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>transaction cancelled</p>`
			);
		}
		minting = false;
	};
</script>

<div class="calltoarms">
	<div class="tag">LIMITED TIME OFFER</div>
	<h2 class="yellow">try it out with starter nft</h2>
	<div style="height:4px" />
	<div class="body-text">
		Post a skill and see if there's any demand for it. Once you validate for yourself, go for the
		full membership.
	</div>
	<div style="height:36px" />
	<input
		bind:value={ambassador}
		class="ambassador"
		on:input={generateProof}
		placeholder="Enter ambassador address (optional)"
	/>
	<div style="height:24px" />
	<div class="buttons">
		<div class="mint" on:click={mint} on:keydown>
			{#if minting}
				<img src={`${assets}/icons/loader-dark.svg`} alt="loading" class="rotating" />
				<div style="width:12px" />
			{/if}
			Mint starter nft
		</div>
		<div style="width:12px" />
		<a
			href={`https://app.uniswap.org/#/swap?outputCurrency=${env.PUBLIC_ARBITRUM_USDC_ADDRESS}&chainId=42161`}
			target="_blank"
			rel="noopener noreferrer"
			class="buy-usdc"
		>
			buy usdc
			<div style="width:12px" />
			<img
				src={`${assets}/icons/external-link-passive.svg`}
				alt="External link"
				style="width:16px"
			/>
		</a>
	</div>
	<div style="height:36px" />
	<div class="tokens" id="tokens">
		<p class="light-40">chain:<span class="light-80">arbitrum</span></p>
		<div style="width:12px" />
		<p class="light-40">token:<span class="light-80">usdc</span></p>
		<div style="width:12px" />
		<p class="light-40">amount:<span class="light-80">$10</span></p>
	</div>
</div>
<div style="height:16px" />
<p class="light-60">
	Interested in becoming an ambassador? <span class="yellow link">fill the form</span>
</p>

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
		background-color: var(--color-dark);
	}
	.mint {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 8px 12px;
		background: var(--color-primary);
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		font-weight: 600;
		color: var(--color-dark);
		transition: border 0.2s ease-in 0s;
		flex: 1;
		align-items: center;
	}
	.mint:hover {
		border: 1px solid var(--color-primary);
	}
	.buy-usdc {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 8px 12px;
		background: #101112;
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		font-weight: 600;
		color: var(--color-primary);
		transition: border 0.2s ease-in 0s;
		flex: 1;
		align-items: center;
	}
	.buy-usdc:hover {
		border: 1px solid var(--color-primary);
	}
</style>
