<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { connectWallet, connecting } from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { setLocalTheme, theme, themeLoaded } from '$lib/stores/Theme';
	import { Buffer } from 'buffer';
	globalThis.Buffer = Buffer;

	$: onMount(async () => {
		setLocalTheme();
		connecting.set(true);
		await connectWallet();
		connecting.set(false);
	});
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-3X3Y5X23HN"></script>
	<script>
		if (typeof window !== 'undefined' && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-3X3Y5X23HN');
		}
	</script>
	<link rel="stylesheet" href="/styles.css" />
	{#if $themeLoaded}
		<link rel="stylesheet" href={`/${$theme}.css`} />
	{/if}
</svelte:head>

<main>
	{#if $themeLoaded}
		<Navigation />
		<div style="height:64px;" />
		<!-- <Notification /> -->
		<slot />
		<!-- <div style="height: 64px;" /> -->
		<Footer />
	{/if}
</main>

<style>
	main {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--color-dark);
	}
</style>
