<script>
	import { goto } from '$app/navigation';
	import { connectWallet } from '$lib/stores/Network';
	// import { userConnected, xmtpConnected, userState } from '$lib/stores/Network';
	import FeaturesCards from '$lib/components/landing/FeaturesCards.svelte';
	import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	import Faq from '$lib/components/landing/Faq.svelte';

	const handleConnect = async () => {
		await connectWallet();
		goto('/skills');
	};


</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>
<div on:click={handleConnect} on:keydown>LOGIN</div>
<div on:click={() => goto('/skills')} on:keydown>EXPLORE</div>
<div class="container">
	<div style="height: 120px;"></div>
	<FeaturesCards />
	<div style="height: 120px;"></div>
	<!-- <BenefitsCards />
	<div style="height: 120px;"></div>
	<Faq />
	<div style="height: 120px;"></div> -->
</div>

<style>
	.container {
		width: 80vw;
	}
</style>
