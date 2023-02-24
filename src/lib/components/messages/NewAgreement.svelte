<script lang="ts">
	import { userAddress, networkSigner } from '$lib/stores/Network';
	import { assets, base } from '$app/paths';
	import { env } from '$env/dynamic/public';
	import { toast } from '@zerodevx/svelte-toast';
	import type { DealDB } from '$lib/stores/Types';
	import { ethers } from 'ethers';
	import { chains } from '$lib/stores/Constants';

	export let conversation: any;

	let total_amount: number;
	let downpayment: number;
	let show_network_dropdown = false;
	let show_token_dropdown = false;
	let show_recruitor_dropdown = false;

	// todo: fix these
	let chosen_network = 'choose network';
	let chosen_token = 'choose token';
	let chosen_token_address = '';
	let chosen_recruitor = $userAddress;

	const handleCreateAgreementOffer = async () => {
		if (chosen_recruitor === $userAddress) {
			try {
				const res = await fetch(`/api/auth/login/${$userAddress}`);
				const salt = await res.json();
				const signature = await $networkSigner.signMessage(salt);
				const url = `${base}/api/add_deal/${$userAddress}/${conversation.peerAddress}/${signature}`;
				const body: DealDB = {
					status: '',
					network: chosen_network,
					token_address: chosen_token_address,
					total_amount: ethers.utils.parseEther(total_amount.toString()).toString(),
					downpayment: ethers.utils.parseEther(downpayment.toString()).toString(),
					signature: ''
				};
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				});
				if (response.ok) {
					await conversation.send(
						`Meta:${JSON.stringify({
							type: 'job offer',
							network: chosen_network,
							token: chosen_token,
							token_address: chosen_token_address,
							total_amount: ethers.utils.parseEther(total_amount.toString()).toString(),
							downpayment: ethers.utils.parseEther(downpayment.toString()).toString()
						})}`
					);
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>new job offer sent.</p>`
					);
				}
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
				);
			}
		}
	};
</script>

<div class="dropdown-container">
	<div class="placeholder"><p>recruitor</p></div>
	<div class="dropdown">
		<div
			class="dropdown-chosen"
			on:click={() => (show_recruitor_dropdown = !show_recruitor_dropdown)}
			on:keydown
		>
			<p>
				{chosen_recruitor.substring(0, 6) +
					'...' +
					chosen_recruitor.substring(chosen_recruitor.length - 4)}
				<span class="light-60">({chosen_recruitor == $userAddress ? 'YOU' : 'PEER'})</span>
			</p>
			<img
				src={show_recruitor_dropdown
					? `${assets}/icons/chevron_active.svg`
					: `${assets}/icons/chevron_passive.svg`}
				alt="Dropdown"
				style="width:10px;"
			/>
		</div>
		{#if show_recruitor_dropdown}
			<div class="dropdown-menu">
				<div
					class="dropdown-item"
					on:click={() => (chosen_recruitor = conversation.peerAddress)}
					on:keydown
				>
					<p>
						{conversation.peerAddress.substring(0, 6) +
							'...' +
							conversation.peerAddress.substring(conversation.peerAddress.length - 4)}
						<span class="light-60">(PEER)</span>
					</p>
				</div>
				<div class="dropdown-item" on:click={() => (chosen_recruitor = $userAddress)} on:keydown>
					<p>
						{$userAddress.substring(0, 6) + '...' + $userAddress.substring($userAddress.length - 4)}
						<span class="light-60">(YOU)</span>
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>
<div style="height:8px" />
<div class="dropdown-container">
	<div class="placeholder"><p>network</p></div>
	<div class="dropdown">
		<div
			class="dropdown-chosen"
			on:click={() => (show_network_dropdown = !show_network_dropdown)}
			on:keydown
		>
			<p>{chosen_network}</p>
			<img
				src={show_network_dropdown
					? `${assets}/icons/chevron_active.svg`
					: `${assets}/icons/chevron_passive.svg`}
				alt="Dropdown"
				style="width:10px;"
			/>
		</div>
		{#if show_network_dropdown}
			<div class="dropdown-menu">
				{#each chains as chain}
					<div
						class="dropdown-item"
						on:click={() => {
							chosen_network = chain.name;
							show_network_dropdown = false;
						}}
						on:keydown
					>
						<p>{chain.name}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<div style="height:8px" />
<div class="dropdown-container">
	<div class="placeholder"><p>token</p></div>
	<div class="dropdown">
		<div
			class="dropdown-chosen"
			on:click={() => (show_token_dropdown = !show_token_dropdown)}
			on:keydown
		>
			<p>{chosen_token}</p>
			<img
				src={show_token_dropdown
					? `${assets}/icons/chevron_active.svg`
					: `${assets}/icons/chevron_passive.svg`}
				alt="Dropdown"
				style="width:10px;"
			/>
		</div>
		{#if show_token_dropdown}
			<div class="dropdown-menu">
				{#each chains as chain}
					{#each chain.tokens as token}
						<div
							class="dropdown-item"
							on:click={() => {
								chosen_token = token.symbol;
								chosen_token_address = token.address;
								show_token_dropdown = false;
							}}
							on:keydown
						>
							<p>{token.name}</p>
						</div>
					{/each}
				{/each}
			</div>
		{/if}
	</div>
</div>
<div style="height:8px" />
<div class="input-container">
	<div class="placeholder"><p>total amount</p></div>
	<input type="text" placeholder="($)" bind:value={total_amount} />
</div>
<div style="height:8px" />
<div class="input-container">
	<div class="placeholder"><p>downpayment</p></div>
	<input type="text" placeholder="($)" bind:value={downpayment} />
</div>
<div style="height:12px" />
<div class="action-button-full link yellow" on:click={handleCreateAgreementOffer} on:keydown>
	<p>send offer</p>
</div>

<style>
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
	.dropdown-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 32px;
	}
	.dropdown {
		flex: 1;
		width: 100%;
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
	}
	.dropdown-chosen {
		flex: 1;
		height: 32px;
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		cursor: pointer;
	}
	.dropdown-chosen:hover {
		background-color: var(--color-light-2);
	}
	.dropdown-menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 32px;
		background-color: var(--color-dark);
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		flex: 1;
		width: 100%;
		z-index: 9999;
	}
	.dropdown-item {
		padding: 8px;
		width: 100%;
		cursor: pointer;
		box-sizing: border-box;
	}
	.dropdown:hover .dropdown-menu {
		display: flex;
	}
	.dropdown-item:hover {
		background-color: var(--color-light-2);
	}
	.input-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 32px;
	}
	input {
		flex: 1;
	}
	.action-button-full {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--color-primary);
		cursor: pointer;
		padding: 8px 12px;
		box-sizing: border-box;
	}
</style>
