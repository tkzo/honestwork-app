<svelte:options immutable={true} />

<script lang="ts">
	import { assets } from '$app/paths';
	import { userAddress } from '$lib/stores/Network';
	import { slide } from 'svelte/transition';
	import { ethers } from 'ethers';

	export let message: any;
	export let index: number;
	export let array_length: number;

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
			// todo: propagate error to user
			console.log('Error parsing meta message: ', e);
		}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${ethers.utils.formatEther(meta_message.downpayment)}</p>
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${ethers.utils.formatEther(meta_message.downpayment)}</p>
						</div>
					</div>
				{:else if meta_message.type == 'job execution'}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${ethers.utils.formatEther(meta_message.downpayment)}</p>
						</div>
					</div>
				{:else if meta_message.type == 'installment'}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">downpayment:</p>
							<p>${ethers.utils.formatEther(meta_message.downpayment)}</p>
						</div>
					</div>
				{:else if meta_message.type == 'new payment'}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">installment:</p>
							<p>${ethers.utils.formatEther(meta_message.installment)}</p>
						</div>
					</div>
				{:else if meta_message.type == 'payment claimed'}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">installment:</p>
							<p>${meta_message.installment}</p>
						</div>
					</div>
				{:else if meta_message.type == 'job cancelled'}
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
							<p>${ethers.utils.formatEther(meta_message.total_amount)}</p>
						</div>
						<div class="dropdown-item">
							<p class="light-60">withdrawn amount:</p>
							<p>${meta_message.withdrawn_amount}</p>
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
		border-color: var(--color-light-20);
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
