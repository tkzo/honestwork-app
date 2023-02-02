<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import NotificationHandler from '$lib/components/common/NotificationHandler.svelte';
	import { userAddress } from '$lib/stores/Network';
	import { Buffer } from 'buffer';
	import { page } from '$app/stores';
	import LogRocket from 'logrocket';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import ToastHandler from '$lib/components/common/ToastHandler.svelte';
	import type { LayoutServerData } from './$types';
	import { user_signed_in } from '$lib/stores/State';

	export let data: LayoutServerData;
	user_signed_in.set(data.signed!);

	// trackers
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
</svelte:head>

<main>
	<div class="toast-container">
		<SvelteToast options={{ duration: 5000, intro: { y: -20 } }} />
	</div>
	{#if $page.route.id !== '/'}
		<Navigation />
		<div style="height:32px;" />
		<!-- {:else}
		<ToastHandler /> -->
	{/if}
	<NotificationHandler />
	<slot />
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
</style>
