<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { connectWallet } from '$lib/stores/Network';
	import { onMount } from 'svelte';

	onMount(async () => {
		await connectWallet();
	});
</script>

<main>
	<Navigation />
	<Notification />
	<div class="content">
		<slot />
	</div>
	<Footer />
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
