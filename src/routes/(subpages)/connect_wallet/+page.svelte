<script>
	import {
		chainID,
		networkSigner,
		userAddress,
		userConnected,
		connectWallet,
		token_abi,
		userState
	} from '$lib/stores/Network';
	import { ethers } from 'ethers';
	import { goto } from '$app/navigation';

	let token_address = '0x2FF8bcE87314356276D5582Ebd204392B16f0941';
	let state, name, email;

	const newPost = async () => {
		const signature = await $networkSigner.signMessage('post');
		const url = `http://localhost:3001/posts/new/${$userAddress}/${signature}`;
		let response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				address: '0xfB1C2FF46962B452C1731d44F0789bFb3607e63f',
				title: "I'll convert your PNG into JPEG",
				text: 'This is a nice text right here.',
				formats: ['PNG', 'JPG'],
				images: ['url.com/pic1.png', 'url.com/pic2.jpg']
			})
		});
		if (response.ok) {
			let json = await response.json();
			console.log(json);
		} else {
			alert('HTTP-Error: ' + response.status);
		}
	};

	const soulboundApiCall = async () => {
		// const url = `/api?address=${$userAddress}&hash=${'0xcCcC'}&name=${name}&email=${email}`;
		// let response = await fetch(url);
		// if (response.ok) {
		// 	console.log(response.status);
		// } else {
		// 	alert('HTTP-Error: ' + response.status);
		// }
		const post_url = `http://localhost:3002/users/new/`;
		let response = await fetch(post_url, {
			method: 'POST',
			body: JSON.stringify({
				address: $userAddress,
				hash: '0xcCcC',
				name: name,
				email: email
			})
		});
		if (response.ok) {
			let json = await response.json();
			console.log(json);
		} else {
			alert('HTTP-Error: ' + response.status);
		}
	};

	const soulbound = async () => {
		try {
			const contract = new ethers.Contract(token_address, token_abi, $networkSigner);
			const tx = await contract.soulbound();
			const receipt = await tx.wait();
			soulboundApiCall(receipt);
		} catch (error) {
			console.log(error);
		}
	};

	const connectHandler = async () => {
		await connectWallet();
		goto('/');
	};
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

{#if !$userConnected}
	<section>
		<div class="gm">
			<div class="gm-inner">
				<img src="icons/heart.svg" alt="Heart" />
				<div style="width:8px" />
				<p>gm fren (<span class="yellow">1/2</span>)</p>
			</div>
		</div>
		<div class="gm">
			<p class="light-60">
				to be able to create a profile or create job listings; you need to connect your wallet.
			</p>
		</div>
		<div class="gm link" on:click={connectHandler} on:keydown>
			<p class="yellow">connect wallet</p>
		</div>
		<div class="gm">
			<p>skip for now</p>
		</div>
	</section>
{:else if userState == 1}
	<section>
		<div class="gm">
			<div class="gm-inner">
				<img src="icons/heart.svg" alt="Heart" />
				<div style="width:8px" />
				<p>gm fren (<span class="yellow">2/2</span>)</p>
			</div>
		</div>
		<div class="gm">
			<p class="light-40">just so we can call you by your preferred name;</p>
			<div style="height:8px" />
			<input type="text" placeholder="<enter name>(must)" bind:value={name} />
			<div style="height:16px" />
			<p class="light-40">or if you want to receive email notifications;</p>
			<div style="height:8px" />
			<input
				class="passive-input"
				type="text"
				placeholder="<enter email>(optional)"
				bind:value={email}
			/>
		</div>
		<button action="submit">
			<div class="gm">
				<p class="yellow" on:click={soulboundApiCall} on:keydown>create account</p>
			</div>
		</button>
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
