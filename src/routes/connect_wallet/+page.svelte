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

	let token_address = '0x32058e2CCdAA0b4615994362d44cC64dFFd3340A';
	let state;

	$: if ($userConnected) {
		fetchUserState();
	}
	const fetchUserState = async () => {
		const contract = new ethers.Contract(token_address, token_abi, $networkSigner);
		state = parseFloat(await contract.getUserState($userAddress));
		userState.set(state);
		console.log(state);
		if (state == 2 || state == 0) {
			goto('/jobs');
		}
	};

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

	const checkUserAvailable = async () => {
		const url = `http://localhost:3002/users/${$userAddress}`;
		let response = await fetch(url);
		if (response.ok) {
			let json = await response.json();
			console.log(json);
		} else {
			alert('HTTP-Error: ' + response.status);
		}
	};

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

<section>
	{#if !$userConnected}
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
		<div class="gm link" on:click={connectWallet} on:keydown>
			<p class="yellow">connect wallet</p>
		</div>
		<div class="gm">
			<p>skip for now</p>
		</div>
	{:else if state == 1}
		<div class="gm">
			<div class="gm-inner">
				<img src="icons/heart.svg" alt="Heart" />
				<div style="width:8px" />
				<p>gm fren (<span class="yellow">2/2</span>)</p>
			</div>
		</div>
		<form method="POST">
			<div class="gm">
				<p class="light-40">just so we can call you by your preferred name;</p>
				<div style="height:8px" />
				<input type="text" placeholder="<enter name>(must)" />
				<div style="height:16px" />

				<p class="light-40">or if you want to receive email notifications;</p>
				<div style="height:8px" />
				<input class="passive-input" type="text" placeholder="<enter email>(optional)" />
			</div>
			<button>
				<div class="gm">
					<p class="yellow">create account</p>
				</div>
			</button>
		</form>
		<div class="gm"><p>skip for now</p></div>
	{/if}
</section>

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
