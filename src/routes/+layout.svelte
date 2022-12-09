<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { connectWallet, connecting, networkProvider } from '$lib/stores/Network';
	import { onMount } from 'svelte';

	onMount(async () => {
		connecting.set(true);
		await connectWallet();
		connecting.set(false);
	});
</script>

<svelte:head>
	<link href="/fonts/ProtoMono-Light.otf" rel="stylesheet" />
	<link href="/fonts/ProtoMono-Medium.otf" rel="stylesheet" />
	<link href="/fonts/ProtoMono-Regular.otf" rel="stylesheet" />
	<link href="/fonts/ProtoMono-SemiBold.otf" rel="stylesheet" />
</svelte:head>

<main>
	<Navigation />
	<div style="height: 32px;" />
	<Notification />
	<slot />
	<div style="height: 64px;" />
	<Footer />
</main>

<style>
	main {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
