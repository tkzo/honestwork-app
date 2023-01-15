<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { userAddress } from '$lib/stores/Network';
	import { Buffer } from 'buffer';
	import { page } from '$app/stores';
	import LogRocket from 'logrocket';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { notifications } from '$lib/stores/Constants';

	//todo: move notification logic out of here

	// trackers
	LogRocket.init('2wdgml/honestwork');
	$: trimmedRoute = $page.route.id?.split('/')[1];
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
		<SvelteToast options={{ duration: 8000, intro: { y: -20 } }} />
	</div>
	{#if $page.route.id !== '/'}
		<Navigation />
	{/if}
	<div style="height:32px;" />
	{#if $page.route.id == '/jobs' || $page.route.id == '/skills' || $page.route.id == '/listings'}
		<Notification notification={notifications.postjob} />
		<div style="height:16px;" />
	{:else if $page.route.id == '/new_job'}
		<Notification notification={notifications.mint} />
		<div style="height:16px;" />
	{:else if $page.route.id == '/profile'}
		<Notification notification={notifications.upgrade} />
		<div style="height:16px;" />
	{/if}
	{#if trimmedRoute == 'job'}
		<Notification notification={notifications.mint} />
		<div style="height:16px;" />
	{:else if trimmedRoute == 'creator'}
		<Notification notification={notifications.mint} />
		<div style="height:16px;" />
	{/if}

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
