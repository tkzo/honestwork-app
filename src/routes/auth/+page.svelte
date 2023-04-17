<script lang="ts">
	import {
		connectWallet,
		networkSigner,
		userAddress,
		userConnected,
		userState
	} from '$lib/stores/Network';
	import { user_signed_in } from '$lib/stores/State';
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	let myform: HTMLFormElement;
	let signature: string;
	let salt: string;

	const getSalt = async () => {
		const salt_res = await fetch(`${base}/api/auth/login/${$userAddress}`, {
			method: 'POST'
		});
		salt = await salt_res.json();
		let message =
			'HonestWork: Login\n' + `${salt}\n` + '\n' + 'For more info: https://docs.honestwork.app';
		myform.signature.value = await $networkSigner.signMessage(message);
		myform.submit();
	};
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

<div style="height: 16px;" />
<main>
	{#if ($userConnected && $userState > 0 && !$user_signed_in) || data.address != $userAddress}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<p>sign to login (<span class="yellow">2/2</span>)</p>
				</div>
			</div>
			<div class="gm body-text light-80">
				Hope you're enjoying your membership. Please sign the message below to login. Keep in mind,
				we occasionally will ask you to sign again to verify your identity.
			</div>
			<form method="POST" bind:this={myform} on:submit|preventDefault={getSalt}>
				<input type="hidden" name="address" bind:value={$userAddress} />
				<input type="hidden" name="salt" bind:value={salt} />
				<input type="hidden" name="signature" bind:value={signature} />
				<button>
					<div class="gm yellow link-frame">
						<p>login</p>
					</div>
				</button>
			</form>
		</section>
	{:else if $userConnected && $userState == 0}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<p>you need <span class="yellow">creator nft</span> to login to honestwork</p>
				</div>
			</div>
			<div class="gm body-text light-80">
				To be able to create a profile or create job listings; you need to mint your creator nft.
				There are many advantages to having a creator nft. You can read more about it here.
			</div>
			<div class="gm yellow link-frame" on:click={connectWallet} on:keydown>
				<p>mint for $100</p>
			</div>
		</section>
	{:else}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<p>connect wallet (<span class="yellow">1/2</span>)</p>
				</div>
			</div>
			<div class="gm body-text light-80">
				To be able to create a profile or create job listings; you need to bind your nft. Please
				note this is an irreversible process, and you won’t be able to transfer your nft afterwards.
			</div>
			<div class="gm yellow link-frame" on:click={connectWallet} on:keydown>
				<p>connect wallet</p>
			</div>
		</section>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100vh - 64px);
	}
	section {
		width: 400px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		border-width: 1px 1px 0px 1px;
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
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	input {
		width: 234px;
	}
	button {
		width: 100%;
	}
</style>
