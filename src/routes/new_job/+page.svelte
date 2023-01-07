<script lang="ts">
	import { userConnected, connectWallet, xmtpConnected, userAddress } from '$lib/stores/Network';
	import { JobInput } from '$lib/stores/Validation';
	import type { JobType, Network } from '$lib/types/Types';

	//todo: validate max_allowed

	type TokenSelection = {
		chain_id: number;
		token_address: string;
	};

	let networks = [
		{
			name: 'ethereum',
			id: 1,
			tokens: [
				{
					name: 'ether',
					symbol: 'eth',
					address: '0x0000000000000000000000000000000000000000',
					max_allowed: 10000
				},
				{
					name: 'usdc',
					symbol: 'usdc',
					address: '0x0000000000000000000000000000000000000000',
					max_allowed: 10000
				}
			]
		},
		{
			name: 'polygon',
			id: 137,
			tokens: [
				{
					name: 'matic',
					symbol: 'matic',
					address: '0x0000000000000000000000000000000000000000',
					max_allowed: 10000
				},
				{
					name: 'usdc',
					symbol: 'usdc',
					address: '0x0000000000000000000000000000000000000000',
					max_allowed: 10000
				}
			]
		}
	];
	let jobForm: HTMLFormElement;
	let tokens_selected: TokenSelection[] = [];

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target! as HTMLFormElement);
		let formObj: JobType = {} as JobType;
		formObj = Object.fromEntries(formData.entries()) as unknown as JobType;
		formObj.tokens_accepted = [{}] as Network[];

		for (let i = 0; i < tokens_selected.length; i++) {
			let chain_id = tokens_selected[i].chain_id;
			let existing = formObj.tokens_accepted?.find((n) => n.id == chain_id);
			if (existing) {
				existing.tokens.push({ address: tokens_selected[i].token_address });
			} else {
				formObj.tokens_accepted.push({
					id: chain_id,
					tokens: [{ address: tokens_selected[i].token_address }]
				});
			}
		}

		//todo: consume errors and show them to the user
		let parsed = JobInput.safeParse(formObj);
		if (!parsed.success) {
			return;
		} else {
			jobForm.tokens_accepted = JSON.stringify(formObj.tokens_accepted);
			let stringified = JSON.stringify(formObj);
			const url = '/api/job_submit';
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: stringified
			};
			let res = await fetch(url, options);
			let data = await res.json();
			console.log(data);
		}
	};

	const handleTokenAdd = (e: any, chain_id: number, token_address: string) => {
		if (e.target?.checked) {
			tokens_selected.push({
				chain_id: chain_id,
				token_address: token_address
			});
		} else {
			tokens_selected = tokens_selected.filter(
				(token) => token.chain_id !== chain_id && token.token_address !== token_address
			);
		}
	};
</script>

{#if $userConnected && $xmtpConnected}
	<form on:submit|preventDefault={handleSubmit} bind:this={jobForm}>
		<input type="text" name="user_address" value={$userAddress} />
		<input type="text" name="title" placeholder="Enter title" />
		<input type="text" name="description" placeholder="Enter description" />
		<input
			type="text"
			name="token_paid"
			placeholder="Enter token paid"
			value="0x6bf83F1af0350407c6766Af32818603E9c08E182"
		/>
		<input type="number" name="budget" placeholder="Enter budget" value={0} />
		<input type="number" name="installments" placeholder="Enter installments" />
		<input type="number" name="sticky_duration" placeholder="Enter sticky duration" />
		<input type="number" name="highlight" placeholder="Enter highlit" />
		<button>lets go</button>
	</form>

	{#each networks as network}
		<div class="tab">{network.name}</div>
		{#each network.tokens as token}
			<input
				type="checkbox"
				id={`token_name[${token.name}]`}
				on:change={(e) => handleTokenAdd(e, network.id, token.address)}
			/>
			<label for={`token_name[${token.name}]`}>{token.name}</label>
		{/each}
	{/each}
	<div class="payment_module" />
{:else}
	<section>
		<div class="gm">
			<div class="gm-inner">
				<img src="icons/heart.svg" alt="Heart" />
				<div style="width:8px" />
				<p>gm fren</p>
			</div>
		</div>
		<div class="gm">
			<div class="body-text light-80">
				To be able to create a profile or create job listings; you need to connect your wallet.
			</div>
		</div>
		<div class="gm link yellow" on:click={connectWallet} on:keydown>
			<p>connect wallet</p>
		</div>
	</section>
{/if}

<style>
	section {
		width: 256px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.gm {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
