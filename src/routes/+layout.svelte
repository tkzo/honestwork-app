<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { connecting, xmtpConnecting, userAddress } from '$lib/stores/Network';
	// import { onMount } from 'svelte';
	import { setLocalTheme, theme, themeLoaded } from '$lib/stores/Theme';
	import { Buffer } from 'buffer';
	import { Jumper } from 'svelte-loading-spinners';
	import { page } from '$app/stores';
	import LogRocket from 'logrocket';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	LogRocket.init('2wdgml/honestwork');
	$: if ($userAddress && $userAddress != '') {
		logrocketIdentify();
	}
	const logrocketIdentify = async () => {
		const res = await fetch(`/api/user/${$userAddress}`);
		const user = await res.json();
		if (user.username != '') {
			LogRocket.identify($userAddress, {
				name: user.username,
				email: user.email,
				tier: 3
			});
		}
	};

	globalThis.Buffer = Buffer;

	// $: onMount(async () => {
	// 	setLocalTheme();
	// });
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
	<!-- {#if $themeLoaded}
		<link rel="stylesheet" href={`/${$theme}.css`} />
	{/if} -->
	<link rel="stylesheet" href="/dark.css" />
</svelte:head>

<main>
	{#if $page.route.id !== '/'}
		<Navigation />
	{/if}
	<div style="height:32px;" />
	<Notification />
	<div class="toast-container">
		<SvelteToast options={{ duration: 8000, intro: { x: 20 } }} />
	</div>
	<div style="height:16px;" />
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
