<script lang="ts">
	import { goto } from '$app/navigation';
	import { connectWallet } from '$lib/stores/Network';
	import { Svrollbar } from 'svrollbar';
	// import { userConnected, xmtpConnected, userState } from '$lib/stores/Network';
	// import FeaturesCards from '$lib/components/landing/FeaturesCards.svelte';
	// import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	// import Faq from '$lib/components/landing/Faq.svelte';

	let viewport: Element;
	let contents: Element;

	const handleConnect = async () => {
		await connectWallet();
		goto('/skills');
	};


</script>

<svelte:head>
	<title>HonestWorkDAO</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

<div class="wrapper">
	<div class="viewport" bind:this={viewport}>
		<div class="contents" bind:this={contents}>
			<div on:click={handleConnect} on:keydown>LOGIN</div>
			<div on:click={() => goto('/skills')} on:keydown>EXPLORE</div>
			<!-- <FeaturesCards />
			<div style="height: 120px;"></div>
			<BenefitsCards />
			<div style="height: 120px;"></div>
			<Faq />
			<div style="height: 120px;"></div> -->
		</div>
	</div>
	<Svrollbar alwaysVisible {viewport} {contents} />
</div>

<style>
	.wrapper {
		width: 80vw;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
		width: 100%;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	/* .contents {
		width: 520px;
	} */
</style>
