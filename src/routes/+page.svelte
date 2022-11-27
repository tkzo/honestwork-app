<script>
	import {
		chainID,
		networkSigner,
		userAddress,
		userConnected,
		connectWallet
	} from '$lib/stores/Network';

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
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

<section>
	{#if !$userConnected}
		<div on:click={connectWallet} on:keydown>Connect</div>
	{:else}
		{$userAddress}
		chainid:{$chainID}
		<div on:click={newPost} on:keydown>Post</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
