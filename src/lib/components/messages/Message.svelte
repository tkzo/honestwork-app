<svelte:options immutable={true} />

<script lang="ts">
	import { assets } from '$app/paths';
	import { userAddress, networkSigner } from '$lib/stores/Network';
	import { slide } from 'svelte/transition';
	import { ethers } from 'ethers';
	import { env } from '$env/dynamic/public';
	import { payment_abi, erc20_abi } from '$lib/stores/ABI';
	import { toast } from '@zerodevx/svelte-toast';
	import type { SignedMessage } from '$lib/stores/Types';

	export let message: any;
	export let index: number;
	export let array_length: number;

	let signed_message_struct: SignedMessage;
	let meta_message: any;
	let parsed = false;
	let ismeta = message.content.startsWith('Meta:');
	let show_meta_dropdown = false;

	$: if (ismeta) {
		parseMeta(message.content);
	}

	const parseDate = (d: string) => {
		let date = new Date(d);
		return date.toLocaleString();
	};
	const parseMeta = (m: string) => {
		let stringified = m.split(':').slice(1, m.length).join(':');
		try {
			meta_message = JSON.parse(stringified);
			parsed = true;
		} catch (e) {
			console.log('Error parsing meta message: ', e);
		}
	};
	const handleAccept = async () => {
		try {
			const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
			const Payment = new ethers.Contract(
				env.PUBLIC_PAYMENT_CONTRACT_ADDRESS,
				payment_abi,
				$networkSigner
			);
			signed_message_struct = {
				recruiter_address: message.conversation.peerAddress,
				creator_address: $userAddress,
				token_address: meta_message.token_address,
				total_amount: ethers.utils.parseEther(meta_message.total_amount),
				downpayment: ethers.utils.parseEther(meta_message.downpayment),
				deadline: deadline
			};
			const message_hash = await Payment.getMessageHash(
				signed_message_struct.recruiter_address,
				signed_message_struct.creator_address,
				signed_message_struct.token_address,
				signed_message_struct.total_amount,
				signed_message_struct.downpayment,
				signed_message_struct.deadline
			);

			let hash_array = ethers.utils.arrayify(message_hash);
			let signature = await $networkSigner.signMessage(hash_array);

			// todo: get values from store accordingly
			await message.conversation.send(
				`Meta:${JSON.stringify({
					type: 'job acceptance',
					network: meta_message.network,
					token: meta_message.token,
					token_address: meta_message.token_address,
					total_amount: meta_message.total_amount,
					downpayment: meta_message.downpayment,
					deadline: signed_message_struct.deadline,
					signature: signature!
				})}`
			);
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>accepted job offer.</p>`
			);
		} catch (error) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>failed to accept job offer.</p>`
			);
		}
	};
	const approve = async (amount: ethers.BigNumberish) => {
		try {
			const Token = new ethers.Contract(meta_message.token_address, erc20_abi, $networkSigner);
			const tx = await Token.approve(env.PUBLIC_PAYMENT_CONTRACT_ADDRESS, amount);
			let receipt = await tx.wait();
			if (receipt && receipt.status == 1) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>approved ${meta_message.token}.</p>`
				);
			}
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error.code}</p>`
			);
		}
	};
	const handleExecute = async () => {
		await approve(ethers.utils.parseEther(meta_message.total_amount));
		try {
			const Payment = new ethers.Contract(
				env.PUBLIC_PAYMENT_CONTRACT_ADDRESS,
				payment_abi,
				$networkSigner
			);

			const tx = await Payment.createDealSignature(
				$userAddress,
				message.conversation.peerAddress,
				meta_message.token_address,
				ethers.utils.parseEther(meta_message.total_amount),
				ethers.utils.parseEther(meta_message.downpayment),
				meta_message.deadline,
				meta_message.signature
			);
			await tx.wait();
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>executed agreement.</p>`
			);
		} catch (error: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error.code}</p>`
			);
		}
	};
	const handleInstallment = async () => {
		await approve(ethers.utils.parseEther(meta_message.installment_amount));
	};
</script>

<div style="height:12px" />
{#if ismeta && parsed}
	<div class="date ">
		<div class="body-text light-60">{parseDate(message.sent)}</div>
	</div>
	<div class="self-meta-message">
		<div class="date" />
		<div class="meta-message-contents">
			<div
				class="meta-message-header"
				on:click={() => (show_meta_dropdown = !show_meta_dropdown)}
				on:keydown
			>
				<p class="yellow">{meta_message.type}</p>
				<img
					src={`${assets}/icons/chevron_${show_meta_dropdown ? 'active' : 'passive'}.svg`}
					alt="arrow-right"
				/>
			</div>
			{#if show_meta_dropdown}
				{#if meta_message.type == 'job offer'}
					<div class="dropdown-container" transition:slide>
						<div class="dropdown-item">
							<p class="light-60">network:</p>
							<p>{meta_message.network}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">token:</p>
							<div class="token-link">
								<p>{meta_message.token}</p>
								<div style="width:4px" />
								<img src={`${assets}/icons/external.svg`} alt="arrow-right" />
							</div>
						</div>
						<div class="dropdown-item">
							<p class="light-60">total amount:</p>
							<p>${meta_message.total_amount}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${meta_message.downpayment}</p>
						</div>
						<div class="command-bar">
							<!-- <div class="command" style="width: 134px">
								<div class="placeholder"><p>rating</p></div>
								<div class="flex-input"><input type="text" placeholder="0.0/10" /></div>
							</div>
							<div style="width:4px;" />
							<div class="action-button yellow">
								<p>claim payment</p>
							</div> -->
							<div class="action-button yellow" on:click={handleAccept} on:keydown>
								<p>accept</p>
							</div>
						</div>
					</div>
				{:else if meta_message.type == 'job acceptance'}
					<div class="dropdown-container" transition:slide>
						<div class="dropdown-item">
							<p class="light-60">network:</p>
							<p>{meta_message.network}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">token:</p>
							<div class="token-link">
								<p>{meta_message.token}</p>
								<div style="width:4px" />
								<img src={`${assets}/icons/external.svg`} alt="arrow-right" />
							</div>
						</div>
						<div class="dropdown-item">
							<p class="light-60">total amount:</p>
							<p>${meta_message.total_amount}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${meta_message.downpayment}</p>
						</div>
						<div class="command-bar">
							<div class="action-button yellow" on:click={handleExecute} on:keydown>
								<p>execute</p>
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{:else if ismeta && !parsed}
	<div class="self-message">
		<div class="message-contents yellow-line">
			<p class="red">incompatible message format</p>
		</div>
	</div>
{:else if message.senderAddress == $userAddress}
	<div class="date ">
		<div class="body-text light-60">{parseDate(message.sent)}</div>
	</div>
	<div class="self-message">
		<div class="message-contents yellow-line">
			<div class="body-text light-80">{message.content}</div>
		</div>
	</div>
{:else}
	<div class="peer-message">
		<div class="date" />
		<div class="message-contents gray-line">
			<div class="body-text light-80">{message.content}</div>
		</div>
	</div>
{/if}

{#if index == array_length - 1}
	<div style="height:12px" />
{/if}

<style>
	.self-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.date {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 4px;
	}
	.peer-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.self-meta-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.meta-message-contents {
		width: 320px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.meta-message-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		box-sizing: border-box;
		border-style: solid;
		border-width: 1px 0px 1px 1px;
		border-color: var(--color-light-20);
		cursor: pointer;
	}
	.meta-message-header:hover {
		background-color: var(--color-light-2);
	}
	.message-contents {
		background-color: var(--color-light-2);
		padding: 12px 16px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-self: flex-end;
		width: max-content;
		max-width: 352px;
	}
	.yellow-line {
		border-style: solid;
		border-width: 0px 0px 0px 1px;
		border-color: var(--color-primary);
	}
	.gray-line {
		border-style: solid;
		border-width: 1px 1px 1px 0px;
		border-color: var(--color-light-10);
	}
	.dropdown-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		box-sizing: border-box;
		border-style: solid;
		border-width: 0px 0px 1px 1px;
		border-color: var(--color-light-20);
		padding: 8px;
	}
	.dropdown-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 4px;
	}
	.command-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 32px;
		padding: 4px;
		box-sizing: border-box;
		margin-top: 8px;
	}
	.command {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 164px;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
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
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-sizing: border-box;
		border: 1px solid var(--color-light-20);
	}
	.token-link {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.token-link:hover {
		background-color: var(--color-light-2);
		cursor: pointer;
	}
</style>
