<script lang="ts">
	import {
		userConnected,
		token_abi,
		networkSigner,
		userState,
		token_address
	} from '$lib/stores/Network';
	import { redirect } from '@sveltejs/kit';
	import { ethers } from 'ethers';

	const mint = async () => {
		if ($userState == 0) {
			try {
				const contract = new ethers.Contract(token_address, token_abi, $networkSigner);
				const tx = await contract.mint();
				const receipt = await tx.wait();
				if (receipt.status == 1) {
					console.log(receipt.status);
					redirect(300, '/create_account');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	$: console.log($userState);
</script>

<svelte:head>
	<title>Mint</title>
	<meta name="description" content="HonestWork Minting Page" />
</svelte:head>

{#if $userConnected}
	{#if $userState == 0}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<img src="icons/heart.svg" alt="Heart" />
					<div style="width:8px" />
					<p>gm fren</p>
				</div>
			</div>
			<div class="gm" on:click={mint} on:keydown>
				<p class="yellow link">mint your nft</p>
			</div>
		</section>
	{:else}
		<p>thanks for minting</p>{/if}
{/if}

<style>
	section {
		width: 258px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
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
		cursor: pointer;
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
