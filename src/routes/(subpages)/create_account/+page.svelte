<script lang="ts">
	import { networkSigner, userAddress, userConnected } from '$lib/stores/Network';

	let myform: HTMLFormElement;
	//todo: salt generation on browser
	const salt = 'post';
	let signature: string;
	const signUp = async () => {
		signature = await $networkSigner.signMessage(salt);
		myform.signature.value = signature;
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
				<img src="icons/heart.svg" alt="Heart" />
				<div style="width:8px" />
				<p>gm fren (<span class="yellow">2/2</span>)</p>
			</div>
		</div>
		<form method="POST" bind:this={myform} on:submit|preventDefault={signUp}>
			<input type="hidden" name="address" value={$userAddress} />
			<input type="hidden" name="salt" value={salt} />
			<input type="hidden" name="signature" value={signature} />
			<button>
				<div class="gm">
					<p class="yellow">create account</p>
				</div>
			</button>
		</form>
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
