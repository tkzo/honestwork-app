<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { userAddress, xmtpConnected, connectXmtp } from '$lib/stores/Network';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $page.route.id == '/'}
	<Notification notification={notifications.mint} />
{:else if $xmtpConnected}
	{#if $page.route.id == '/jobs' || $page.route.id == '/skills' || $page.route.id == '/listings'}
		<Notification notification={notifications.postjob} />
		<div style="height:16px;" />
	{:else if $page.route.id == '/new_job'}
		<Notification notification={notifications.mint} />
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
{:else}
	<Notification notification={notifications.xmtp} on:click={connectXmtp} />
	<div style="height:16px;" />
{/if}
