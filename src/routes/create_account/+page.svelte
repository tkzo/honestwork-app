<script lang="ts">
	import {
		chainID,
		networkSigner,
		userAddress,
		userConnected,
		connectWallet
	} from '$lib/stores/Network';
	import { onMount } from 'svelte';

	// const newPost = async () => {
	// 	const signature = await $networkSigner.signMessage('post');
	// 	const url = `http://localhost:3001/posts/new/${$userAddress}/${signature}`;

	// 	let response = await fetch(url, {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			address: '0xfB1C2FF46962B452C1731d44F0789bFb3607e63f',
	// 			title: "I'll convert your PNG into JPEG",
	// 			text: 'This is a nice text right here.',
	// 			formats: ['PNG', 'JPG'],
	// 			images: ['url.com/pic1.png', 'url.com/pic2.jpg']
	// 		})
	// 	});
	// 	if (response.ok) {
	// 		let json = await response.json();
	// 		console.log(json);
	// 	} else {
	// 		alert('HTTP-Error: ' + response.status);
	// 	}
	// };

	// const checkUserAvailable = async () => {
	// 	const url = `http://localhost:3002/users/${$userAddress}`;
	// 	let response = await fetch(url);
	// 	if (response.ok) {
	// 		let json = await response.json();
	// 		console.log(json);
	// 	} else {
	// 		alert('HTTP-Error: ' + response.status);
	// 	}
	// };
	// onMount(async () => {
	// 	await connectWallet();
	// });
	let myform: HTMLFormElement;
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
