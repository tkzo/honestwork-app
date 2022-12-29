<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import {
		connectWallet,
		connecting,
		userConnected,
		xmtpConnected,
		xmtpConnecting
	} from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { setLocalTheme, theme, themeLoaded } from '$lib/stores/Theme';
	import { Buffer } from 'buffer';
	import { Jumper } from 'svelte-loading-spinners';
	import { page } from '$app/stores';
	import LogRocket from 'logrocket';
	LogRocket.init('2wdgml/honestwork');

	globalThis.Buffer = Buffer;

	$: onMount(async () => {
		setLocalTheme();
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
		{#if $page.route.id !== '/'}
			<Navigation />
		{/if}
		<div style="height:64px;" />
		<!-- <Notification /> -->
		{#if $connecting && $page.route.id !== '/'}
			<div class="spinster">
				<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
				<div style="height: 12px;" />
				<p class="light-60" style="animation: blinking 2s linear infinite;">connecting wallet...</p>
			</div>
		{:else if $xmtpConnecting && $page.route.id !== '/'}
			<div class="spinster">
				<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
				<div style="height: 12px;" />
				<p class="light-60" style="animation: blinking 2s linear infinite;">connecting xmtp...</p>
			</div>
		{:else}
			<slot />
		{/if}
		{#if $page.route.id !== '/'}
			<Footer />
		{/if}
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
	.spinster {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
	}
</style>
