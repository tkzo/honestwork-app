<script lang="ts">
	import { userConnected, connectWallet, xmtpConnected } from '$lib/stores/Network';
	import { JobInput } from '$lib/stores/Validation';

	let jobForm: HTMLFormElement;
	let ethereumForm: HTMLFormElement;
	let polygonForm: HTMLFormElement;

	const handleSubmit = (e: Event) => {
		const formData = new FormData(e.target! as HTMLFormElement);
		const formObj = Object.fromEntries(formData.entries());
		let parsed = JobInput.safeParse(formObj);
		// consume errors and show them to the user
		if (!parsed.success) {
			console.log(parsed.error);
			return;
		} else {
			jobForm.submit();
		}
	};

	let networks = [
		{
			name: 'ethereum',
			id: 1
		},
		{
			name: 'polygon',
			id: 137
		}
	];
</script>

{#if $userConnected && $xmtpConnected}
	<form on:submit|preventDefault={handleSubmit} bind:this={jobForm}>
		<input type="text" name="user_address" placeholder="Enter name" />
		<input type="text" name="title" placeholder="Enter title" />
		<input type="text" name="description" placeholder="Enter description" />
		<input type="text" name="token_paid" placeholder="Enter token paid" />
		<input type="text" name="tags[]" placeholder="Enter tag" />
		<input type="text" name="links" placeholder="Enter link" />
		<input type="number" name="budget" placeholder="Enter budget" />
		<input type="number" name="installments" placeholder="Enter installments" />
		<input type="number" name="sticky_duration" placeholder="Enter sticky duration" />
		<input type="number" name="highlight" placeholder="Enter highlit" />
		<button>lets go</button>
	</form>
	{#each networks as network}
		<input type="text" name={`network_name[${network.name}]`} />
		<input type="number" name={`network_id[${network.id}]`} />
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
