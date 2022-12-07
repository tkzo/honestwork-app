<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notification from '$lib/components/common/Notification.svelte';
	import { connectWallet, connecting } from '$lib/stores/Network';
	import { onMount } from 'svelte';

	onMount(async () => {
		connecting.set(true);
		await connectWallet();
		connecting.set(false);
	});
</script>

<Navigation />
<Notification />
<slot />
<div style="min-height: 32px; flex:1;" />
<Footer />
