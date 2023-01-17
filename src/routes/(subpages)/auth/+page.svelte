<script lang="ts">
	import {
		connectWallet,
		connectXmtp,
		networkSigner,
		userAddress,
		userConnected,
		xmtpConnected
	} from '$lib/stores/Network';

	let myform: HTMLFormElement;
	let signature: string;
	let salt: string;

	const getSalt = async () => {
		const res = await fetch(`/api/auth/login/${$userAddress}`);
		salt = await res.json();
		myform.signature.value = await $networkSigner.signMessage(salt);
		myform.submit();
	};
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

{#if $userConnected}
	<section>
		<div class="gm">
			<div class="gm-inner">
				<p>login to honestwork (<span class="yellow">3/3</span>)</p>
			</div>
		</div>
		<form method="POST" bind:this={myform} on:submit|preventDefault={getSalt}>
			<input type="hidden" name="address" bind:value={$userAddress} />
			<input type="hidden" name="salt" bind:value={salt} />
			<input type="hidden" name="signature" bind:value={signature} />
			<button>
				<div class="gm">
					<p class="yellow">login</p>
				</div>
			</button>
		</form>
		<div class="gm"><p>skip for now</p></div>
	</section>
{:else}
	<section>
		<div class="gm">
			<div class="gm-inner">
				<p>connect wallet (<span class="yellow">1/3</span>)</p>
			</div>
		</div>

		<div class="gm" on:click={connectWallet} on:keydown>
			<p class="yellow">connect wallet</p>
		</div>
		<div class="gm"><p>skip for now</p></div>
	</section>
{/if}

<style>
	section {
		width: 258px;
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
	input {
		width: 234px;
	}
	button {
		width: 100%;
	}
</style>
