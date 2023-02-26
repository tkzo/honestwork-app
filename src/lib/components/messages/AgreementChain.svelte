<script lang="ts">
	import { ethers } from 'ethers';
	import { env } from '$env/dynamic/public';
	import { escrow_abi, erc20_abi } from '$lib/stores/ABI';
	import { userAddress, networkSigner, chainID, userToken } from '$lib/stores/Network';
	import { findTokenName, findChainName } from '$lib/stores/Constants';
	import type { Deal } from '$lib/stores/Types';
	import { toast } from '@zerodevx/svelte-toast';
	import { assets } from '$app/paths';

	export let conversation: any;
	export let deal: Deal;
	export let id: string;

	let rating: number;
	let amount: number;

	$: progress =
		((parseFloat(ethers.utils.formatEther(deal.claimableAmount)) +
			parseFloat(ethers.utils.formatEther(deal.claimedAmount))) /
			parseFloat(ethers.utils.formatEther(deal.totalPayment))) *
		100;

	const claimable = () => {
		return parseFloat(ethers.utils.formatEther(deal.claimableAmount).toString());
	};
	const average = (array: any) => {
		return array.length > 0
			? array.reduce((a: any, b: any) => parseFloat(a) + parseFloat(b)) / array.length
			: 0;
	};
	const approve = async (amount: ethers.BigNumberish) => {
		try {
			const Token = new ethers.Contract(deal.paymentToken, erc20_abi, $networkSigner);
			const tx = await Token.approve(
				env.PUBLIC_ESCROW_ADDRESS,
				ethers.utils.parseEther(amount.toString())
			);
			let receipt = await tx.wait();
			if (receipt && receipt.status == 1) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>approved ${findTokenName(
						findChainName($chainID),
						deal.paymentToken
					)}.</p>`
				);
			}
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error.code}</p>`
			);
		}
	};
	const handleInstallment = async () => {
		await approve(ethers.utils.parseEther(amount.toString()));
		try {
			const Payment = new ethers.Contract(env.PUBLIC_ESCROW_ADDRESS!, escrow_abi, $networkSigner);
			const tx = await Payment.unlockPayment(
				id,
				ethers.utils.parseEther(amount.toString()),
				rating,
				$userToken
			);
			let receipt = await tx.wait();
			if (receipt && receipt.status == 1) {
				await conversation.send(
					`Meta:${JSON.stringify({
						type: 'new payment',
						deal: id,
						network: findChainName($chainID),
						token: findTokenName(findChainName($chainID), deal.paymentToken),
						token_address: deal.paymentToken,
						total_amount: deal.totalPayment,
						installment: ethers.utils.parseEther(amount.toString())
					})}`
				);
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>payment unlocked</p>`
				);
			}
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error.code}</p>`
			);
		}
	};
	const handleClaim = async () => {
		try {
			const Payment = new ethers.Contract(env.PUBLIC_ESCROW_ADDRESS, escrow_abi, $networkSigner);
			const tx = await Payment.claimPayment(
				id,
				ethers.utils.parseEther(claimable().toString()),
				rating,
				$userToken
			);
			const receipt = await tx.wait();
			if (receipt && receipt.status == 1) {
				await conversation.send(
					`Meta:${JSON.stringify({
						type: 'payment claimed',
						deal: id,
						network: findChainName($chainID),
						token: findTokenName(findChainName($chainID), deal.paymentToken),
						token_address: deal.paymentToken,
						total_amount: deal.totalPayment,
						installment: ethers.utils.parseEther(amount.toString())
					})}`
				);
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>claimed payment</p>`
				);
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>failed to claim payment</p>`
				);
			}
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
			);
		}
	};
	const handleWithdraw = async () => {
		try {
			const Payment = new ethers.Contract(env.PUBLIC_ESCROW_ADDRESS, escrow_abi, $networkSigner);
			const tx = await Payment.withdrawPayment(id);
			const receipt = await tx.wait();
			if (receipt && receipt.status == 1) {
				await conversation.send(
					`Meta:${JSON.stringify({
						type: 'job cancelled',
						deal: id,
						network: findChainName($chainID),
						token: findTokenName(findChainName($chainID), deal.paymentToken),
						token_address: deal.paymentToken,
						total_amount: deal.totalPayment,
						withdrawn_amount:
							parseFloat(ethers.utils.formatEther(deal.totalPayment)) -
							parseFloat(ethers.utils.formatEther(deal.claimableAmount)) -
							parseFloat(ethers.utils.formatEther(deal.claimedAmount))
					})}`
				);
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>claimed payment</p>`
				);
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>failed to claim payment</p>`
				);
			}
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
			);
		}
	};
</script>

<main>
	<section>
		<div class="info">
			<p class="light-60">network</p>
			<p>{findChainName($chainID)}</p>
		</div>
		<div class="info">
			<p class="light-60">token</p>
			<a
				href={`https://bscscan.com/address/${deal.paymentToken}`}
				target="_blank"
				rel="noreferrer"
				class="info-value"
			>
				<p class="link">{findTokenName(findChainName($chainID), deal.paymentToken)}</p>
				<div style="width:4px" />
				<img src={assets + '/icons/external.svg'} alt="Token address" /></a
			>
		</div>
		<div class="info">
			<p class="light-60">recruiter rating</p>
			{#if average(deal.recruiterRating) > 0}
				<p>{(average(deal.recruiterRating) / 100).toFixed(2)}/10</p>
			{:else}
				<p>n/a</p>
			{/if}
		</div>
		<div class="info">
			<p class="light-60">creator rating</p>
			{#if average(deal.creatorRating) > 0}
				<p>{average(deal.creatorRating) / 100}/10</p>
			{:else}
				<p>n/a</p>
			{/if}
		</div>
		<div class="info">
			<p class="light-60">total amount</p>
			<p>${parseFloat(ethers.utils.formatEther(deal.totalPayment)).toLocaleString()}</p>
		</div>
		<div class="info">
			<p class="light-60">claimable amount</p>
			<p>${parseFloat(ethers.utils.formatEther(deal.claimableAmount)).toLocaleString()}</p>
		</div>
		<div class="outstanding-container">
			<div style="height:8px" />
			<div class="line" />
			<div style="height:8px" />
			<div class="outstanding-row">
				<p class="light-60">outstanding payment</p>
				<p class="red">
					${parseFloat(ethers.utils.formatEther(deal.totalPayment)) -
						parseFloat(ethers.utils.formatEther(deal.claimableAmount)) -
						parseFloat(ethers.utils.formatEther(deal.claimedAmount))}
				</p>
			</div>
		</div>
	</section>
	<div
		class="progress-line"
		style={`width:${progress}%; ${progress == 100 ? 'border-color: var(--color-success)' : ''}`}
	/>
	{#if progress != 100 && $userAddress == deal.recruiter}
		<div class="command-bar">
			<div class="command" style="width: 164px">
				<div class="placeholder"><p>amount($)</p></div>
				<div class="flex-input"><input type="text" placeholder="0" bind:value={amount} /></div>
			</div>
			<div class="command" style="width: 134px">
				<div class="placeholder"><p>rating</p></div>
				<div class="flex-input"><input type="text" placeholder="0.0/10" bind:value={rating} /></div>
			</div>
			<div class="action-button yellow link" on:click={handleInstallment} on:keydown>
				<p>unlock payment</p>
			</div>
		</div>
		<div class="command-bar">
			<div class="action-button light-60 link" on:click={handleWithdraw} on:keydown>
				<p>cancel and withdraw remaining</p>
			</div>
		</div>
	{:else if $userAddress == deal.creator && claimable() > 0}
		<div class="command-bar">
			<div class="command" style="width: 134px">
				<div class="placeholder"><p>rating</p></div>
				<div class="flex-input"><input type="text" placeholder="0.0/10" bind:value={rating} /></div>
			</div>
			<div class="action-button yellow link" on:click={handleClaim} on:keydown>
				<p>claim payment</p>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		width: 480px;
	}
	.command-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 32px;
		box-sizing: border-box;
		margin-top: 8px;
		gap: 12px;
	}
	.command {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
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
		color: var(--color-light-40);
	}
	input {
		width: 100%;
		height: 32px;
	}
	.action-button {
		height: 32px;
		width: 166px;
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-sizing: border-box;
		border: 1px solid var(--color-light-20);
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
	.info {
		width: 100%;
		height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info:hover {
		background-color: var(--color-light-2);
	}
	.info-value {
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
	}
	.outstanding-container {
		width: 100%;
	}
	.outstanding-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.line {
		width: 100%;
		border-width: 1px 0 0 0;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.progress-line {
		height: 1px;
		border-width: 1px 0 0 0;
		border-style: solid;
		border-color: var(--color-primary);
	}
</style>
