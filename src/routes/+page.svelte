<script>
	import { goto } from '$app/navigation';
	import { connectWallet } from '$lib/stores/Network';
	import { userConnected, xmtpConnected, userState } from '$lib/stores/Network';
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
	<!-- <BenefitsCards /> -->
	<!-- <div style="height: 120px;"></div>
	<Faq />
	<div style="height: 120px;"></div> -->
</div>

<style>
	.container {
		width: 80vw;
	}
</style>
