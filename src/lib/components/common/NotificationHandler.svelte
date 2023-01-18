<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { userAddress, xmtpConnected, connectXmtp } from '$lib/stores/Network';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $xmtpConnected}
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
	<div on:click={connectXmtp} on:keydown>
		<Notification notification={notifications.xmtp} />
		<div style="height:16px;" />
	</div>
{/if}
