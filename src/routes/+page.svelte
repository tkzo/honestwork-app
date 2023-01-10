<script>
	import { goto } from '$app/navigation';
	import { connectWallet } from '$lib/stores/Network';
	import { userConnected, xmtpConnected, userState } from '$lib/stores/Network';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	import Faq from '$lib/components/landing/faq.svelte';

	const track = async () => {
		if (typeof window !== 'undefined' && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('event', 'push_me', {
				event_category: 'test_event',
				event_label: 'push_me'
			});
		}
	};
	const handleConnect = async () => {
		await connectWallet();
		goto('/skills');
	};
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>
{#if !$xmtpConnected || !$userConnected}
	<div on:click={track} on:keydown>THIS IS THE LANDING PAGE</div>
	<div on:click={handleConnect} on:keydown>CONNECT WALLET</div>
	<div on:click={() => goto('/skills')} on:keydown>START EXPLORING</div>
	<div class="container">
		<!-- <BenefitsCards /> -->
		<Faq />

	</div>
{:else}
	<Skeleton width="200px" borderRadius="0px" />
{/if}

<style>
	.container {
		max-width: 1000px;
		padding: 0 20px;
	}
</style>