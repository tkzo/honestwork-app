<script lang="ts">
	import { assets } from '$app/paths';
	import { userAddress } from '$lib/stores/Network';
	import { toast } from '@zerodevx/svelte-toast';

	export let show_new_agreement: boolean = false;
	export let conversation: any = {};

	const average = (array: any) => array.reduce((a: any, b: any) => a + b) / array.length;

	let deal = {
		network: 'bsc',
		token: 'busd',
		'creator Rating': average([4.5, 4.2, 4.1]).toFixed(2),
		'total amount': 10000,
		'total paid': 2500
	};

	let total_amount: number;
	let downpayment: number;
	let show_network_dropdown = false;
	let show_token_dropdown = false;
	let show_recruitor_dropdown = false;
	let chosen_network = 'binance smart chain';
	let chosen_token = 'busd';
	let chosen_recruitor = $userAddress;

	$: progress = (deal['total paid'] / deal['total amount']) * 100;

	const handleCreateAgreementOffer = async () => {
		if (chosen_recruitor === $userAddress) {
			try {
				// todo: get values from store accordingly
				await conversation.send(
					`Meta:${JSON.stringify({
						type: 'job offer',
						network: chosen_network,
						token: chosen_token,
						token_address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
						total_amount: total_amount,
						downpayment: downpayment
					})}`
				);
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>new job offer sent.</p>`
				);
			} catch (error) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${error}</p>`
				);
			}
		}
	};
</script>

{#if show_new_agreement}
	<div class="dropdown-container">
		<div class="placeholder"><p>recruitor</p></div>
		<div class="dropdown">
			<div
				class="dropdown-chosen"
				on:click={() => (show_recruitor_dropdown = !show_recruitor_dropdown)}
				on:keydown
			>
				<p>{chosen_recruitor}</p>
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
						<p>{conversation.peerAddress}</p>
					</div>
					<div class="dropdown-item" on:click={() => (chosen_recruitor = $userAddress)} on:keydown>
						<p>{$userAddress}</p>
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
					<div
						class="dropdown-item"
						on:click={() => (chosen_network = 'binance smart chain')}
						on:keydown
					>
						<p>binance smart chain</p>
					</div>
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
					<div class="dropdown-item" on:click={() => (chosen_token = 'busd')} on:keydown>
						<p>busd</p>
					</div>
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
		<p>pay & create agreement</p>
	</div>
{:else}
	<section>
		{#each Object.entries(deal) as [key, value]}
			<div class="info">
				<p class="light-60">{key}</p>
				{#if key === 'token'}
					<a href="https://bscscan.com/" target="_blank" rel="noreferrer" class="info-value">
						<p class="link">{value}</p>
						<div style="width:4px" />
						<img src={assets + '/icons/external.svg'} alt="Token address" /></a
					>
				{:else}
					<p class={`${key == 'total paid' ? 'green' : ''}`}>{value}</p>
				{/if}
			</div>
		{/each}
		<div class="outstanding-container">
			<div style="height:8px" />
			<div class="line" />
			<div style="height:8px" />
			<div class="outstanding-row">
				<p class="light-60">outstanding payment</p>
				<p class="red">${deal['total amount'] - deal['total paid']}</p>
			</div>
		</div>
	</section>
	<div
		class="progress-line"
		style={`width:${progress}%; ${progress == 100 ? 'border-color: var(--color-success)' : ''}`}
	/>
	{#if progress != 100}
		<div style="height:8px" />
		<div class="command-bar">
			<div class="command">
				<div class="placeholder"><p>amount($)</p></div>
				<div class="flex-input"><input type="text" placeholder="0" /></div>
			</div>
			<div class="command" style="width: 134px">
				<div class="placeholder"><p>rating</p></div>
				<div class="flex-input"><input type="text" placeholder="0.0/10" /></div>
			</div>
			<div class="action-button yellow link">
				<p>unlock payment</p>
			</div>
		</div>
	{/if}
{/if}

<style>
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
	.command-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 32px;
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
	.flex-input {
		height: 32px;
		flex: 1;
		align-items: center;
	}
	input {
		width: 100%;
		height: 32px;
	}
	.action-button {
		height: 32px;
		width: 166px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-sizing: border-box;
		border: 1px solid var(--color-primary);
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
	.action-button {
		width: 166px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--color-primary);
		cursor: pointer;
		padding: 8px 12px;
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
